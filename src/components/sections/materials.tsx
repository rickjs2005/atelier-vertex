"use client";

import { useEffect, useRef } from "react";
import { FadeIn } from "@/components/reveal";

/**
 * Materiais com texturas 100% procedurais (CSS) — zero download.
 * Hover: o cartão inclina seguindo o ponteiro e a textura ganha
 * profundidade (camada interna desloca na direção oposta).
 */

const MATERIALS = [
  {
    name: "Concreto",
    note: "Aparente, pigmentado na massa",
    used: "Estruturas e planos monolíticos",
    texture: {
      background: `
        radial-gradient(120% 90% at 20% 10%, rgba(255,255,255,0.16), transparent 60%),
        radial-gradient(80% 70% at 80% 85%, rgba(0,0,0,0.14), transparent 55%),
        linear-gradient(168deg, #b9b4a9 0%, #a8a397 42%, #b1aca0 68%, #9d988c 100%)`,
    },
  },
  {
    name: "Madeira",
    note: "Cumaru e freijó certificados",
    used: "Pisos, brises e forros",
    texture: {
      background: `
        repeating-linear-gradient(94deg,
          #8f7355 0px, #85694c 7px, #94785a 13px, #7e6247 22px, #8f7355 31px),
        linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.12))`,
      backgroundBlendMode: "overlay, normal",
    },
  },
  {
    name: "Vidro",
    note: "Laminado extraclaro",
    used: "Fechamentos e guarda-corpos",
    texture: {
      background: `
        linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.5) 42%, transparent 54%),
        linear-gradient(160deg, #cfdce0 0%, #a9bfc7 45%, #8fa9b4 100%)`,
    },
  },
  {
    name: "Aço",
    note: "Corten e inox escovado",
    used: "Estruturas leves e serralheria",
    texture: {
      background: `
        repeating-linear-gradient(90deg,
          rgba(255,255,255,0.09) 0px, transparent 1px, transparent 3px),
        linear-gradient(135deg, #6d6f72 0%, #8e9094 38%, #77797d 62%, #5f6165 100%)`,
    },
  },
  {
    name: "Pedra natural",
    note: "Travertino, basalto e são tomé",
    used: "Revestimentos e paisagismo",
    texture: {
      background: `
        radial-gradient(38% 30% at 30% 25%, rgba(255,255,255,0.2), transparent 70%),
        radial-gradient(30% 26% at 72% 60%, rgba(0,0,0,0.14), transparent 65%),
        radial-gradient(26% 22% at 45% 85%, rgba(255,255,255,0.12), transparent 60%),
        linear-gradient(150deg, #cfc5b2 0%, #bfb49f 50%, #c8bda9 100%)`,
    },
  },
];

export default function Materials() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-tilt]"));
    const cleanups = cards.map((card) => {
      const layer = card.querySelector<HTMLElement>("[data-tilt-layer]");
      let raf = 0;
      let targetRX = 0;
      let targetRY = 0;
      let rx = 0;
      let ry = 0;
      let hovering = false;

      const loop = () => {
        rx += (targetRX - rx) * 0.09;
        ry += (targetRY - ry) * 0.09;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        if (layer)
          layer.style.transform = `translate(${-ry * 1.6}px, ${rx * 1.6}px) scale(1.12)`;
        if (hovering || Math.abs(rx) > 0.05 || Math.abs(ry) > 0.05) {
          raf = requestAnimationFrame(loop);
        } else {
          card.style.transform = "";
          if (layer) layer.style.transform = "scale(1.12)";
          raf = 0;
        }
      };

      const onMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        targetRX = -ny * 9;
        targetRY = nx * 9;
        if (!raf) raf = requestAnimationFrame(loop);
      };
      const onEnter = () => {
        hovering = true;
      };
      const onLeave = () => {
        hovering = false;
        targetRX = 0;
        targetRY = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      };

      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return () => {
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
        cancelAnimationFrame(raf);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section ref={root} id="materiais" className="bg-ice">
      <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-44">
        <FadeIn className="mb-20 md:mb-28">
          <p data-fade className="eyebrow mb-6">
            Matéria-prima
          </p>
          <h2 data-fade className="display max-w-3xl text-[clamp(2.2rem,5vw,4.6rem)] text-graphite">
            Materiais honestos, envelhecendo com dignidade.
          </h2>
          <p data-fade className="lead mt-8 max-w-xl text-sm">
            Escolhemos cada material pelo que ele será em vinte anos — não pelo
            que aparenta no dia da entrega.
          </p>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {MATERIALS.map((m) => (
            <div
              key={m.name}
              data-tilt
              className="group relative overflow-hidden transition-shadow duration-700 hover:shadow-[0_30px_60px_-20px_rgba(27,28,30,0.35)]"
              style={{ willChange: "transform" }}
            >
              <div className="frame relative aspect-[3/4] overflow-hidden">
                <div
                  data-tilt-layer
                  className="absolute inset-[-10%] transition-transform duration-200"
                  style={{ ...m.texture, transform: "scale(1.12)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon/55 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="display text-2xl text-ice">{m.name}</h3>
                  <p className="mt-1 text-[0.7rem] font-light text-ice/70">{m.note}</p>
                  <p className="mt-3 max-h-0 overflow-hidden text-[0.62rem] uppercase tracking-[0.2em] text-brass-soft opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:opacity-100">
                    {m.used}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
