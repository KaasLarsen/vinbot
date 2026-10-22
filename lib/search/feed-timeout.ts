/** Per-feed budget i multi-feed søgning — én langsom Daisycon må ikke holde hele svaret. */
export const SEARCH_FEED_TIMEOUT_MS = 3_800;

export async function withSearchFeedTimeout<T>(
  promise: Promise<T>,
  fallback: T,
  ms: number = SEARCH_FEED_TIMEOUT_MS,
): Promise<T> {
  let settled = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise.then((value) => {
        settled = true;
        return value;
      }),
      new Promise<T>((resolve) => {
        timer = setTimeout(() => {
          if (!settled) resolve(fallback);
        }, ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
