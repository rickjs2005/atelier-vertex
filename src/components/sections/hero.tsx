"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useEnhanced } from "@/hooks/use-enhanced";
import { HERO_FALLBACK } from "@/lib/projects";

// three.js só é baixado quando o gate desktop permite
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const enhanced = useEnhanced();
  // o canvas só monta depois que a thread respira (TBT) — o loader
  // segura a cortina até o aviso av:ready, então ninguém percebe
  const [mount3d, setMount3d] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setMount3d(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lines = el.querySelectorAll<HTMLElement>(".reveal-line > span");
    const rest = el.querySelectorAll<HTMLElement>("[data-hero-rest]");

    const play = () => {
      if (reduced) {
        gsap.set(lines, { y: 0 });
        gsap.set(rest, { opacity: 1, y: 0 });
        return;
      }
      gsap
        .timeline()
        .to(lines, { y: 0, duration: 1.25, ease: "power4.out", stagger: 0.12 }, 0.1)
        .to(
          rest,
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.14 },
          "-=0.7"
        );
    };

    let played = false;
    const onDone = () => {
      if (played) return;
      played = true;
      play();
    };
    window.addEventListener("av:intro-done", onDone);
    // fallback: se o loader já saiu de cena antes deste mount
    const t = window.setTimeout(onDone, 6000);

    // conteúdo recua suavemente ao iniciar o scroll
    let st: ScrollTrigger | undefined;
    if (!reduced && content.current) {
      const anim = gsap.to(content.current, {
        opacity: 0,
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "80% top",
          scrub: true,
        },
      });
      st = anim.scrollTrigger;
    }

    return () => {
      window.removeEventListener("av:intro-done", onDone);
      window.clearTimeout(t);
      st?.kill();
    };
  }, []);

  const scrollTo = (target: string) => {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden">
      {/* fundo: cena 3D no desktop, Ken Burns no mobile */}
      <div className="absolute inset-0" aria-hidden>
        {enhanced && mount3d ? (
          <HeroScene />
        ) : enhanced ? null : (
          <div className="frame h-full w-full">
            <Image
              src={HERO_FALLBACK}
              alt=""
              fill
              priority
              sizes="100vw"
              className="animate-[kenburns_26s_ease-in-out_infinite_alternate] object-cover"
            />
            {/* véu de gelo: garante contraste do texto grafite sobre a foto */}
            <div className="absolute inset-0 bg-gradient-to-b from-ice/90 via-ice/60 to-ice/30" />
          </div>
        )}
      </div>

      <div
        ref={content}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col items-center justify-center px-6 text-center lg:items-start lg:px-12 lg:text-left"
      >
        <p data-hero-rest className="eyebrow mb-7 translate-y-4 opacity-0">
          Atelier Vertex · Arquitetura de alto padrão
        </p>

        <h1 className="display max-w-4xl text-[clamp(2.5rem,5.4vw,5rem)] text-graphite">
          <span className="reveal-line">
            <span>Arquitetura que transforma</span>
          </span>
          <span className="reveal-line">
            <span>
              espaços em <em className="display-italic text-wood-deep">experiências</em>.
            </span>
          </span>
        </h1>

        <p
          data-hero-rest
          className="lead mt-8 max-w-lg translate-y-4 text-base opacity-0 md:text-lg"
        >
          Projetos exclusivos para clientes que valorizam design, conforto e sofisticação.
        </p>

        <div data-hero-rest className="mt-12 translate-y-4 opacity-0">
          <button
            onClick={() => scrollTo("#projetos")}
            className="btn btn-dark"
            data-cursor="ver"
          >
            <span>Conheça nossos projetos</span>
          </button>
        </div>
      </div>

      {/* indicador de scroll */}
      <div
        data-hero-rest
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 translate-y-4 flex-col items-center gap-3 opacity-0"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-graphite/50">
          Explore
        </span>
        <span className="block h-10 w-px animate-pulse bg-graphite/30" />
      </div>
    </section>
  );
}
