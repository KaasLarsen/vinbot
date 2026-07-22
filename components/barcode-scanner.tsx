"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { normalizeBarcodeDigits } from "@/lib/search/helpers";

const BARCODE_FORMATS = ["ean_13", "ean_8", "upc_a", "upc_e"] as const;

type BarcodeDetectorInstance = {
  detect: (source: ImageBitmapSource) => Promise<Array<{ rawValue: string }>>;
};

type BarcodeDetectorCtor = new (options?: { formats?: string[] }) => BarcodeDetectorInstance;

function getBarcodeDetectorCtor(): BarcodeDetectorCtor | null {
  if (typeof window === "undefined") return null;
  const ctor = (window as unknown as { BarcodeDetector?: BarcodeDetectorCtor }).BarcodeDetector;
  return typeof ctor === "function" ? ctor : null;
}

export type BarcodeScannerErrorKind = "permission_denied" | "unsupported" | "other";

type Props = {
  open: boolean;
  onClose: () => void;
  onDetected: (code: string) => void;
  onError?: (kind: BarcodeScannerErrorKind) => void;
};

function stopStream(stream: MediaStream | null) {
  if (!stream) return;
  for (const track of stream.getTracks()) track.stop();
}

export function BarcodeScanner({ open, onClose, onDetected, onError }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const zxingControlsRef = useRef<{ stop: () => void } | null>(null);
  const detectedRef = useRef(false);
  const [status, setStatus] = useState<"starting" | "ready" | "error">("starting");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const emitError = useCallback(
    (kind: BarcodeScannerErrorKind, message: string) => {
      setStatus("error");
      setErrorMessage(message);
      onError?.(kind);
    },
    [onError],
  );

  const handleCode = useCallback(
    (raw: string) => {
      if (detectedRef.current) return;
      const digits = normalizeBarcodeDigits(raw);
      if (!digits) return;
      detectedRef.current = true;
      onDetected(digits);
    },
    [onDetected],
  );

  const cleanup = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    try {
      zxingControlsRef.current?.stop();
    } catch {
      // no-op
    }
    zxingControlsRef.current = null;
    stopStream(streamRef.current);
    streamRef.current = null;
    const video = videoRef.current;
    if (video) {
      video.srcObject = null;
    }
  }, []);

  useEffect(() => {
    if (!open) {
      cleanup();
      detectedRef.current = false;
      setStatus("starting");
      setErrorMessage(null);
      return;
    }

    let cancelled = false;
    detectedRef.current = false;
    setStatus("starting");
    setErrorMessage(null);

    const start = async () => {
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        emitError("unsupported", "Din browser understøtter ikke kamera-scanning. Indtast EAN-koden i søgefeltet i stedet.");
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

        const Detector = getBarcodeDetectorCtor();
        if (Detector) {
          let detector: BarcodeDetectorInstance;
          try {
            detector = new Detector({ formats: [...BARCODE_FORMATS] });
          } catch {
            detector = new Detector();
          }
          const tick = async () => {
            if (cancelled || detectedRef.current) return;
            try {
              if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
                const codes = await detector.detect(video);
                const raw = codes[0]?.rawValue;
                if (raw) handleCode(raw);
              }
            } catch {
              // frame-fejl er normale — fortsæt scanning
            }
            if (!cancelled && !detectedRef.current) {
              rafRef.current = requestAnimationFrame(() => {
                void tick();
              });
            }
          };
          rafRef.current = requestAnimationFrame(() => {
            void tick();
          });
          return;
        }

        // Fallback: ZXing for browsere uden BarcodeDetector (fx ældre iOS Safari).
        const { BrowserMultiFormatReader } = await import("@zxing/browser");
        if (cancelled) return;
        const reader = new BrowserMultiFormatReader();
        const controls = await reader.decodeFromStream(stream, video, (result, err) => {
          if (result) handleCode(result.getText());
          // NotFoundException osv. er forventet mellem scanninger
          void err;
        });
        zxingControlsRef.current = controls;
      } catch (err) {
        if (cancelled) return;
        const name = err instanceof DOMException ? err.name : "";
        if (name === "NotAllowedError" || name === "PermissionDeniedError") {
          emitError(
            "permission_denied",
            "Kameraadgang blev afvist. Tillad kamera i browseren, eller indtast EAN-koden manuelt i søgefeltet.",
          );
        } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
          emitError("unsupported", "Ingen kamera fundet. Indtast EAN-koden i søgefeltet i stedet.");
        } else {
          emitError("other", "Kunne ikke starte kameraet. Prøv igen, eller indtast EAN-koden manuelt.");
        }
      }
    };

    void start();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [open, cleanup, emitError, handleCode]);

  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-stone-950/95 text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Scan stregkode"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div>
          <p className="text-sm font-semibold">Scan stregkode</p>
          <p className="text-xs text-stone-300">Peg kameraet mod EAN-koden på flasken</p>
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
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            playsInline
            muted
            autoPlay
          />
          {status === "ready" ? (
            <div
              className="pointer-events-none absolute inset-[18%] rounded-xl border-2 border-rose-400/90 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]"
              aria-hidden
            />
          ) : null}
          {status === "starting" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-950/60 text-sm text-stone-200">
              Starter kamera…
            </div>
          ) : null}
          {status === "error" && errorMessage ? (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-950/85 p-6 text-center">
              <p className="text-sm text-stone-100">{errorMessage}</p>
            </div>
          ) : null}
        </div>
        <p className="mt-4 text-center text-xs text-stone-400">
          Virker ikke? Luk og indtast EAN-nummeret i søgefeltet.
        </p>
      </div>
    </div>
  );
}
