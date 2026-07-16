"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FadeIn } from "@/components/reveal";

const STEPS = [
  {
    n: "01",
    title: "Briefing",
    copy: "Uma conversa longa, sem pressa. Entendemos rotina, desejos e o que a família espera viver na casa — antes de qualquer traço.",
  },
  {
    n: "02",
    title: "Conceito",
    copy: "O partido arquitetônico nasce do terreno: insolação, ventos, vistas e topografia definem a primeira geometria.",
  },
  {
    n: "03",
    title: "Projeto",
    copy: "Plantas, cortes e detalhamento executivo completo — cada marcenaria, cada junta de dilatação, resolvida em desenho.",
  },
  {
    n: "04",
    title: "Visualização 3D",
    copy: "Você caminha pela casa antes da primeira fundação: imagens fotorrealistas e tour imersivo para validar cada decisão.",
  },
  {
    n: "05",
    title: "Execução",
    copy: "Acompanhamento de obra semanal com relatório fotográfico. O desenho sai do papel sob os nossos olhos.",
  },
  {
    n: "06",
    title: "Entrega",
    copy: "A casa pronta, testada e afinada — com manual da residência e acompanhamento pós-ocupação de 12 meses.",
  },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !line.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const triggers: ScrollTrigger[] = [];

    // linha central desenha com o scroll
    const lineAnim = gsap.fromTo(
      line.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 65%",
          end: "bottom 80%",
          scrub: true,
        },
      }
    );
    if (lineAnim.scrollTrigger) triggers.push(lineAnim.scrollTrigger);

    // cada etapa entra conforme chega
    el.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => {
      const anim = gsap.fromTo(
        step,
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 82%", once: true },
        }
      );
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
      lineAnim.kill();
    };
  }, []);

  return (
    <section ref={root} id="processo" className="bg-graphite text-ice">
      <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-44">
        <FadeIn className="mb-24 md:mb-32">
          <p data-fade className="eyebrow mb-6 !text-brass-soft">
            Como trabalhamos
          </p>
          <h2 data-fade className="display max-w-3xl text-[clamp(2.2rem,5vw,4.6rem)]">
            Um método preciso para um resultado sem pressa.
          </h2>
        </FadeIn>

        <div className="relative">
          {/* trilho + linha que desenha */}
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-ice/10 md:left-1/2" />
          <div
            ref={line}
            className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-brass md:left-1/2"
            style={{ transform: "scaleY(0)" }}
          />

          <ol className="flex flex-col gap-20 md:gap-28">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                data-step
                className={`relative flex flex-col gap-4 pl-16 md:w-1/2 md:pl-0 ${
                  i % 2
                    ? "md:ml-auto md:pl-20"
                    : "md:mr-auto md:pr-20 md:text-right"
                }`}
                style={{ opacity: 0 }}
              >
                {/* nó na linha */}
                <span
                  className={`absolute top-1 flex h-10 w-10 items-center justify-center border border-brass/60 bg-graphite text-[0.6rem] font-semibold tracking-[0.18em] text-brass-soft ${
                    i % 2
                      ? "left-0 md:-translate-x-1/2"
                      : "left-0 md:left-auto md:right-0 md:translate-x-1/2"
                  }`}
                >
                  {s.n}
                </span>

                <h3 className="display text-3xl md:text-4xl">{s.title}</h3>
                <p
                  className={`max-w-md text-sm font-light leading-relaxed text-ice/60 ${
                    i % 2 ? "" : "md:ml-auto"
                  }`}
                >
                  {s.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
