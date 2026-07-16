"use client";

import { useEffect, useState } from "react";

/**
 * true somente em desktop (lg+) com ponteiro fino e sem reduced-motion —
 * o gate que decide se o three.js é sequer baixado. Mobile: zero WebGL.
 */
export function useEnhanced() {
  const [enhanced, setEnhanced] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => setEnhanced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return enhanced;
}
