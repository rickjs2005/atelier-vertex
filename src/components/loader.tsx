"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Intro: uma linha desenha a planta baixa de uma residência; a planta
 * tomba em perspectiva (rotateX) e as paredes sobem — wireframe 3D.
 * Com o tilt apenas em X, linhas verticais do SVG permanecem verticais
 * na tela, então a extrusão funciona sem projeção real.
 */

// planta 400×300 — casa 320×200 com pátio
const PLAN_WALLS = [
  // perímetro (com vãos de porta)
  "M 40 40 H 226 M 250 40 H 360",
  "M 360 40 V 240",
  "M 360 240 H 40",
  "M 40 240 V 40",
  // ala social / cozinha
  "M 40 130 H 118 M 142 130 H 210",
  "M 210 40 V 96 M 210 120 V 130",
  // suítes
  "M 250 130 H 360",
  "M 288 130 V 186 M 288 210 V 240",
  // banho + circulação
  "M 250 40 V 78 M 250 102 V 130",
  "M 118 186 H 176",
];

const PLAN_DETAILS = [
  // arcos de porta
  "M 226 40 A 24 24 0 0 1 250 64",
  "M 118 130 A 24 24 0 0 0 142 154",
  "M 250 78 A 24 24 0 0 1 226 102",
  // piscina
  "M 262 156 H 344 V 226 H 262 Z",
  // mobiliário sugerido
  "M 60 60 H 130 V 92 H 60 Z",
  "M 300 58 H 344 V 106 H 300 Z",
  "M 64 150 H 100 V 216 H 64 Z",
];

// cantos que ganham parede vertical (x, y na planta)
const CORNERS: [number, number][] = [
  [40, 40],
  [360, 40],
  [360, 240],
  [40, 240],
  [210, 40],
  [210, 130],
  [40, 130],
  [250, 130],
  [360, 130],
];

const WALL_H = 88;

export default function Loader() {
  const [gone, setGone] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const word = useRef<HTMLParagraphElement>(null);
  const tag = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let ready = false;
    let minDone = false;
    let finished = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tryFinish = () => {
      if (finished || !ready || !minDone) return;
      finished = true;
      gsap.to(overlay.current, {
        yPercent: -100,
        duration: reduced ? 0.01 : 1.05,
        ease: "power4.inOut",
        onComplete: () => {
          window.dispatchEvent(new CustomEvent("av:intro-done"));
          setGone(true);
        },
      });
    };

    const onReady = () => {
      ready = true;
      tryFinish();
    };
    window.addEventListener("av:ready", onReady);
    const fallback = window.setTimeout(onReady, 3600);

    const plan = svg.current?.querySelectorAll<SVGElement>("[data-plan]");
    const details = svg.current?.querySelectorAll<SVGElement>("[data-detail]");
    const walls = svg.current?.querySelectorAll<SVGElement>("[data-wall]");
    const top = svg.current?.querySelectorAll<SVGElement>("[data-top]");

    const tl = gsap.timeline();

    if (reduced) {
      minDone = true;
      tryFinish();
    } else {
      tl.fromTo(
        word.current,
        { opacity: 0, letterSpacing: "0.7em" },
        { opacity: 1, letterSpacing: "0.42em", duration: 1.0, ease: "power3.out" },
        0.1
      )
        .fromTo(
          tag.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          0.55
        )
        // 1) a linha desenha a planta
        .fromTo(
          plan ?? [],
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", stagger: 0.055 },
          0.4
        )
        .fromTo(
          details ?? [],
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.75, ease: "power2.out", stagger: 0.04 },
          "-=0.6"
        )
        // 2) a planta tomba em perspectiva
        .to(
          stage.current,
          { rotateX: 57, scale: 1.12, y: 26, duration: 1.1, ease: "power3.inOut" },
          "+=0.1"
        )
        // 3) as paredes sobem + contorno superior
        .fromTo(
          walls ?? [],
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.5, ease: "power2.out", stagger: 0.04 },
          "-=0.35"
        )
        .fromTo(
          top ?? [],
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" },
          "-=0.25"
        )
        .call(() => {
          minDone = true;
          tryFinish();
        }, [], "+=0.25");
    }

    return () => {
      window.removeEventListener("av:ready", onReady);
      window.clearTimeout(fallback);
      tl.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-ice"
      aria-hidden
    >
      <p
        ref={word}
        className="display text-[clamp(1.1rem,3vw,1.8rem)] tracking-[0.42em] text-graphite"
        style={{ opacity: 0 }}
      >
        ATELIER&nbsp;VERTEX
      </p>
      <p ref={tag} className="eyebrow mt-3" style={{ opacity: 0 }}>
        Arquitetura &amp; Interiores
      </p>

      <div className="mt-12" style={{ perspective: "1400px" }}>
        <div ref={stage} style={{ transformStyle: "preserve-3d" }}>
          <svg
            ref={svg}
            viewBox="0 -110 400 420"
            className="w-[min(74vw,460px)]"
            fill="none"
            strokeLinecap="round"
          >
            {/* contorno superior (cópia do perímetro, elevada) */}
            <g data-top-group>
              <path
                data-top
                d={`M 40 ${40 - WALL_H} H 360 V ${240 - WALL_H} H 40 Z`}
                stroke="#ab9660"
                strokeWidth="1.4"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
            </g>

            {/* paredes verticais */}
            {CORNERS.map(([x, y], i) => (
              <path
                key={i}
                data-wall
                d={`M ${x} ${y} V ${y - WALL_H}`}
                stroke="rgba(27,28,30,0.55)"
                strokeWidth="1.2"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
            ))}

            {/* planta — paredes */}
            {PLAN_WALLS.map((d, i) => (
              <path
                key={i}
                data-plan
                d={d}
                stroke="#1b1c1e"
                strokeWidth="2.2"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
            ))}

            {/* planta — detalhes finos */}
            {PLAN_DETAILS.map((d, i) => (
              <path
                key={i}
                data-detail
                d={d}
                stroke={i === 3 ? "#ab9660" : "rgba(27,28,30,0.35)"}
                strokeWidth={i === 3 ? 1.6 : 1.1}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-3">
        <p className="eyebrow">Desenhando o projeto</p>
        <span className="block h-px w-10 animate-pulse bg-brass" aria-hidden />
      </div>
    </div>
  );
}
