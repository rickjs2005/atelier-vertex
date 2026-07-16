"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Planta baixa procedural: os módulos [x,y,w,h] do projeto viram
 * retângulos numa grade 100×70, desenhados por linha quando a seção
 * entra na viewport — mesmo gesto do loader, agora por projeto.
 */
export default function PlanDrawing({
  modules,
  title,
}: {
  modules: [number, number, number, number][];
  title: string;
}) {
  const root = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paths = el.querySelectorAll<SVGElement>("[data-draw]");
    if (reduced || !paths.length) return;

    const anim = gsap.fromTo(
      paths,
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        stagger: 0.12,
        paused: true,
      }
    );
    const st = gsap.to({}, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => anim.play(),
      },
    });

    return () => {
      st.scrollTrigger?.kill();
      st.kill();
      anim.kill();
    };
  }, []);

  return (
    <figure className="w-full">
      <svg
        ref={root}
        viewBox="-6 -6 112 82"
        className="w-full"
        fill="none"
        role="img"
        aria-label={`Planta baixa esquemática — ${title}`}
      >
        {modules.map(([x, y, w, h], i) => (
          <path
            key={i}
            data-draw
            d={`M ${x} ${y} h ${w} v ${h} h ${-w} Z`}
            stroke={i === 0 ? "#1b1c1e" : "rgba(27,28,30,0.55)"}
            strokeWidth={i === 0 ? 0.9 : 0.6}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
          />
        ))}
        {/* cota inferior */}
        <path
          data-draw
          d="M 0 76 H 100"
          stroke="#ab9660"
          strokeWidth="0.35"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
        />
        <path data-draw d="M 0 74 V 78 M 100 74 V 78" stroke="#ab9660" strokeWidth="0.35" pathLength={1} strokeDasharray={1} strokeDashoffset={1} />
      </svg>
      <figcaption className="mt-4 text-[0.62rem] uppercase tracking-[0.26em] text-ash">
        Planta esquemática — pavimento principal
      </figcaption>
    </figure>
  );
}
