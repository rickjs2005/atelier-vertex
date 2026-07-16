"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { gsap, ScrollTrigger, Flip } from "@/lib/gsap";
import { PROJECTS } from "@/lib/projects";
import { FadeIn } from "@/components/reveal";

/**
 * Galeria premium: cada projeto ocupa quase a tela inteira.
 * Hover = zoom lentíssimo (CSS na img). Scroll = parallax (GSAP no wrapper).
 * Clique = a imagem expande até fullscreen via GSAP Flip antes de navegar —
 * transição de elemento compartilhado com o hero da página de detalhe.
 */
export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const router = useRouter();
  const navigating = useRef(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const triggers: ScrollTrigger[] = [];

    // parallax vertical no wrapper interno de cada frame
    el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((wrap) => {
      const anim = gsap.fromTo(
        wrap,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const open = (slug: string, frame: HTMLElement) => {
    if (navigating.current) return;
    navigating.current = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      router.push(`/projetos/${slug}`);
      return;
    }

    // Flip: o frame clicado expande até cobrir a viewport
    const state = Flip.getState(frame);
    frame.classList.add("is-expanding");
    Flip.from(state, {
      duration: 0.85,
      ease: "power3.inOut",
      onComplete: () => router.push(`/projetos/${slug}`),
    });
  };

  return (
    <section ref={root} id="projetos" className="bg-ivory">
      <div className="mx-auto max-w-[1600px] px-6 pb-10 pt-28 md:px-12 md:pt-40">
        <FadeIn className="mb-20 flex flex-col gap-6 md:mb-28 md:flex-row md:items-end md:justify-between">
          <div>
            <p data-fade className="eyebrow mb-6">
              Portfólio selecionado
            </p>
            <h2 data-fade className="display text-[clamp(2.2rem,5vw,4.6rem)] text-graphite">
              Projetos
            </h2>
          </div>
          <p data-fade className="lead max-w-sm text-sm">
            Seis residências, seis paisagens, uma mesma obsessão: a medida exata entre
            silêncio e presença.
          </p>
        </FadeIn>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-24 px-6 pb-32 md:gap-40 md:px-12">
        {PROJECTS.map((p, i) => (
          <article key={p.slug} className="group">
            <button
              className="frame frame-zoom relative block h-[72vh] w-full overflow-hidden text-left md:h-[86vh]"
              data-cursor="abrir"
              onClick={(e) => open(p.slug, e.currentTarget)}
              aria-label={`Abrir projeto ${p.title}`}
            >
              <div data-parallax className="absolute inset-[-8%_0]">
                <Image
                  src={p.cover}
                  alt={`${p.title} — ${p.subtitle}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 92vw"
                  className="object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  quality={82}
                />
              </div>
              <div className="scrim-b absolute inset-x-0 bottom-0 h-[40%] opacity-80" />

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-7 md:p-12">
                <div>
                  <p className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-brass-soft">
                    {String(i + 1).padStart(2, "0")} — {p.location}
                  </p>
                  <h3 className="display text-3xl text-ice md:text-5xl">{p.title}</h3>
                  <p className="mt-2 text-sm font-light text-ice/70">{p.subtitle}</p>
                </div>
                <div className="hidden items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-ice/80 md:flex">
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    Ver projeto
                  </span>
                  <span className="block h-px w-10 bg-brass-soft transition-all duration-500 group-hover:w-16" />
                </div>
              </div>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
