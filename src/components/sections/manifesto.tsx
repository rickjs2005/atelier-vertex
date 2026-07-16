"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { RevealTitle, FadeIn } from "@/components/reveal";

export default function Manifesto() {
  const rule = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rule.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const anim = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.6,
        ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <section id="estudio" className="bg-ice">
      <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-44">
        <FadeIn>
          <p data-fade className="eyebrow mb-10">
            O estúdio
          </p>
        </FadeIn>

        <RevealTitle
          lines={[
            "Não projetamos casas.",
            "Projetamos a forma como",
            "a vida acontece dentro delas.",
          ]}
          className="display max-w-5xl text-[clamp(2rem,5vw,4.4rem)] text-graphite"
        />

        <div
          ref={rule}
          className="mt-16 h-px w-full max-w-md origin-left bg-brass"
          style={{ transform: "scaleX(0)" }}
        />

        <FadeIn className="mt-16 grid gap-10 md:grid-cols-2 lg:max-w-4xl">
          <p data-fade className="lead text-base">
            Desde 2009, o Atelier Vertex desenha residências onde proporção, luz e
            matéria são tratadas com o mesmo rigor de uma obra de arte. Cada projeto
            nasce de uma escuta longa — do terreno, do clima e, sobretudo, de quem vai
            habitar.
          </p>
          <p data-fade className="lead text-base">
            Trabalhamos em poucos projetos por ano, por escolha. É o que permite
            acompanhar cada detalhe, do primeiro traço à entrega da chave — com a
            discrição que nossos clientes esperam.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
