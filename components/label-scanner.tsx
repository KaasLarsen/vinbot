"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { LabelScanErrorBody, LabelScanSuccess } from "@/lib/label-scan/types";

export type LabelScannerErrorKind = "permission_denied" | "unsupported" | "other";

type Props = {
  onClose: () => void;
  onError?: (kind: LabelScannerErrorKind) => void;
};

type Phase = "camera" | "preview" | "analyzing" | "error";

function stopStream(stream: MediaStream | null) {
  if (!stream) return;
  for (const track of stream.getTracks()) track.stop();
}

function trackLabelScan(status: string, detail?: Record<string, string | number | undefined>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", "wine_label_scan", { status, ...detail });
  } catch {
    // no-op
  }
}

/** Komprimer video-frame til JPEG data-URL (max ~1280px). */
function captureFrame(video: HTMLVideoElement): string {
  const maxW = 1280;
  const vw = video.videoWidth || 1280;
  const vh = video.videoHeight || 720;
  const scale = Math.min(1, maxW / vw);
  const w = Math.round(vw * scale);
  const h = Math.round(vh * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.drawImage(video, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", 0.72);
}

async function ocrImage(dataUrl: string): Promise<string> {
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker("eng");
  try {
    const {
      data: { text },
    } = await worker.recognize(dataUrl);
    return (text || "").trim();
  } finally {
    await worker.terminate();
  }
}

async function postLabelScan(body: {
  image?: string;
  text?: string;
}): Promise<LabelScanSuccess | LabelScanErrorBody> {
  const res = await fetch("/api/label-scan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return (await res.json()) as LabelScanSuccess | LabelScanErrorBody;
}

/** Fuldskærms etiket-kamera. Montér kun når scanneren er åben (unmount = cleanup). */
export function LabelScanner({ onClose, onError }: Props) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [phase, setPhase] = useState<Phase>("camera");
  const [status, setStatus] = useState<"starting" | "ready" | "error">("starting");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzeHint, setAnalyzeHint] = useState("Aflæser etiket…");

  const emitError = useCallback(
    (kind: LabelScannerErrorKind, message: string) => {
      setStatus("error");
      setPhase("error");
      setErrorMessage(message);
      onError?.(kind);
    },
    [onError],
  );

  const cleanup = useCallback(() => {
    stopStream(streamRef.current);
    streamRef.current = null;
    const video = videoRef.current;
    if (video) video.srcObject = null;
  }, []);

  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        emitError(
          "unsupported",
          "Din browser understøtter ikke kamera. Brug søgefeltet, eller prøv Chrome/Safari.",
        );
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        if (cancelled) {
          stopStream(stream);
          return;
        }
        streamRef.current = stream;
        const video = videoRef.current;
        if (!video) {
          stopStream(stream);
          emitError("other", "Kunne ikke starte kameraet. Prøv igen.");
          return;
        }
        video.srcObject = stream;
        await video.play();
        if (cancelled) return;
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        const name = err instanceof DOMException ? err.name : "";
        if (name === "NotAllowedError" || name === "PermissionDeniedError") {
          emitError(
            "permission_denied",
            "Kameraadgang blev afvist. Tillad kamera i browseren, og prøv igen.",
          );
        } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
          emitError("unsupported", "Ingen kamera fundet. Søg efter vinen manuelt i stedet.");
        } else {
          emitError("other", "Kunne ikke starte kameraet. Prøv igen.");
        }
      }
    };

    void start();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [cleanup, emitError]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const takePhoto = useCallback(() => {
    const video = videoRef.current;
    if (!video || status !== "ready") return;
    try {
      const dataUrl = captureFrame(video);
      setPreviewUrl(dataUrl);
      setPhase("preview");
      cleanup();
    } catch {
      setErrorMessage("Kunne ikke tage billedet. Prøv igen.");
      setPhase("error");
    }
  }, [status, cleanup]);

  const retake = useCallback(async () => {
    setPreviewUrl(null);
    setErrorMessage(null);
    setPhase("camera");
    setStatus("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      streamRef.current = stream;
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        await video.play();
        setStatus("ready");
      }
    } catch {
      emitError("other", "Kunne ikke genstarte kameraet.");
    }
  }, [emitError]);

  const analyze = useCallback(async () => {
    if (!previewUrl) return;
    setPhase("analyzing");
    setAnalyzeHint("Genkender flasken…");
    trackLabelScan("start");

    try {
      let result = await postLabelScan({ image: previewUrl });

      if (!result.ok && result.code === "need_ocr") {
        setAnalyzeHint("Læser etiketten på din telefon…");
        const ocrText = await ocrImage(previewUrl);
        if (!ocrText || ocrText.length < 4) {
          trackLabelScan("no_text");
          setErrorMessage(
            "Kunne ikke læse etiketten. Prøv skarpere lys og hold telefonen stabilt — eller søg manuelt.",
          );
          setPhase("error");
          return;
        }
        setAnalyzeHint("Matcher mod vin-kataloget…");
        result = await postLabelScan({ text: ocrText });
      }

      if (!result.ok) {
        trackLabelScan("error", { code: result.code });
        setErrorMessage(result.error);
        setPhase("error");
        return;
      }

      if (result.match?.slug) {
        trackLabelScan("matched", {
          method: result.method,
          slug: result.match.slug,
          score: result.match.score,
        });
        onClose();
        router.push(`/vine/${result.match.slug}`);
        return;
      }

      if (result.query.trim()) {
        trackLabelScan("search_fallback", { method: result.method, query: result.query });
        onClose();
        router.push(`/?q=${encodeURIComponent(result.query)}`);
        return;
      }

      trackLabelScan("no_match");
      setErrorMessage("Vi kunne ikke genkende flasken. Prøv et skarpere foto, eller søg manuelt.");
      setPhase("error");
    } catch {
      trackLabelScan("error", { code: "network" });
      setErrorMessage("Netværksfejl under genkendelse. Tjek forbindelsen og prøv igen.");
      setPhase("error");
    }
  }, [previewUrl, onClose, router]);

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-stone-950/95 text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Scan vin-etiket"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div>
          <p className="text-sm font-semibold">Scan etiket</p>
          <p className="text-xs text-stone-300">Tag et billede af vinens forside-etiket</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-stone-600 bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800"
        >
          Luk
        </button>
      </div>

      <div className="relative mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pb-8 sm:px-6">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-white/10">
          {phase === "preview" || phase === "analyzing" || (phase === "error" && previewUrl) ? (
            // eslint-disable-next-line @next/next/no-img-element -- lokal data-URL fra kamera
            <img src={previewUrl ?? undefined} alt="Etiket-foto" className="h-full w-full object-cover" />
          ) : (
            <video ref={videoRef} className="h-full w-full object-cover" playsInline muted autoPlay />
          )}

          {phase === "camera" && status === "ready" ? (
            <div
              className="pointer-events-none absolute inset-[12%] rounded-xl border-2 border-amber-300/90 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]"
              aria-hidden
            />
          ) : null}

          {phase === "camera" && status === "starting" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-950/60 text-sm text-stone-200">
              Starter kamera…
            </div>
          ) : null}

          {phase === "analyzing" ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-stone-950/75 p-6 text-center">
              <span
                className="h-10 w-10 animate-spin rounded-full border-2 border-amber-200/30 border-t-amber-300"
                aria-hidden
              />
              <p className="text-sm text-stone-100">{analyzeHint}</p>
            </div>
          ) : null}

          {phase === "error" && errorMessage ? (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-950/85 p-6 text-center">
              <p className="text-sm text-stone-100">{errorMessage}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-col items-center gap-3">
          {phase === "camera" && status === "ready" ? (
            <>
              <button
                type="button"
                onClick={takePhoto}
                className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-rose-900 shadow-lg transition hover:bg-rose-800 active:scale-95"
                aria-label="Tag billede af etiket"
              >
                <span className="h-12 w-12 rounded-full bg-white/95" aria-hidden />
              </button>
              <p className="text-center text-xs text-stone-400">Udfyld ramme med etiketten, og tryk</p>
            </>
          ) : null}

          {phase === "preview" ? (
            <div className="flex w-full gap-3">
              <button
                type="button"
                onClick={() => void retake()}
                className="flex-1 rounded-xl border border-stone-600 bg-stone-900 px-4 py-3 text-sm font-medium hover:bg-stone-800"
              >
                Tag igen
              </button>
              <button
                type="button"
                onClick={() => void analyze()}
                className="flex-1 rounded-xl bg-rose-900 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-800"
              >
                Genkend vin
              </button>
            </div>
          ) : null}

          {phase === "error" ? (
            <div className="flex w-full gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-stone-600 bg-stone-900 px-4 py-3 text-sm font-medium hover:bg-stone-800"
              >
                Luk
              </button>
              <button
                type="button"
                onClick={() => void retake()}
                className="flex-1 rounded-xl bg-rose-900 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-800"
              >
                Prøv igen
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
