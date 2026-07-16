"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { CTA_IMAGE } from "@/lib/projects";
import { RevealTitle, FadeIn } from "@/components/reveal";
import { SITE } from "@/lib/site";

export default function Cta() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const img = el.querySelector<HTMLElement>("[data-parallax]");
    if (!img) return;

    const anim = gsap.fromTo(
      img,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <section ref={root} id="contato" className="relative overflow-hidden">
      {/* aérea ao pôr do sol, com parallax */}
      <div className="absolute inset-0" aria-hidden>
        <div data-parallax className="absolute inset-[-12%_0]">
          <Image
            src={CTA_IMAGE}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            quality={80}
          />
        </div>
        <div className="absolute inset-0 bg-carbon/45" />
        <div className="scrim-warm absolute inset-x-0 bottom-0 h-[55%]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1200px] flex-col items-center justify-center px-6 py-32 text-center">
        <RevealTitle
          lines={["Seu próximo projeto", "começa com uma conversa."]}
          className="display text-[clamp(2.4rem,6vw,5.4rem)] text-ice"
        />

        <FadeIn className="mt-10 flex flex-col items-center gap-10">
          <p data-fade className="max-w-lg text-base font-light leading-relaxed text-ice/75">
            Conte-nos sobre o seu terreno, o seu tempo e o que você espera viver.
            Respondemos pessoalmente, em até dois dias úteis.
          </p>
          <a
            data-fade
            href={`mailto:${SITE.email}?subject=Novo%20projeto%20—%20Atelier%20Vertex`}
            className="btn btn-light"
            data-cursor="conversar"
          >
            <span>Solicitar um projeto</span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
