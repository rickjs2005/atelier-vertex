"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "@/components/reveal";

const TESTIMONIALS = [
  {
    quote:
      "O Vertex não desenhou uma casa para nós — desenhou a nossa rotina. Três anos depois, ainda descobrimos gestos de projeto que só se revelam com o tempo.",
    name: "Família Camargo",
    role: "Casa Horizonte, Serra da Mantiqueira",
  },
  {
    quote:
      "A obra terminou no prazo, no orçamento e sem uma única surpresa. Em construção de alto padrão, isso vale mais do que qualquer prêmio.",
    name: "R. Steinberg",
    role: "Pavilhão Luz, São Paulo",
  },
  {
    quote:
      "Pedimos uma casa que não competisse com a mata. Recebemos uma casa que parece ter crescido junto com ela.",
    name: "Ana & Pedro L.",
    role: "Refúgio Mata, Campos do Jordão",
  },
  {
    quote:
      "Do primeiro encontro à entrega das chaves, fomos atendidos pela mesma equipe. Essa continuidade se sente em cada canto da casa.",
    name: "M. Duarte",
    role: "Vila Serena, Punta del Este",
  },
];

const AUTO_MS = 7000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, next]);

  const t = TESTIMONIALS[index];

  return (
    <section
      className="bg-ivory"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1200px] px-6 py-28 text-center md:px-12 md:py-44">
        <FadeIn>
          <p data-fade className="eyebrow mb-14">
            Quem vive nossos projetos
          </p>
        </FadeIn>

        <div className="relative flex min-h-[280px] flex-col items-center justify-center md:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="display mx-auto max-w-3xl text-[clamp(1.4rem,2.8vw,2.2rem)] leading-snug text-graphite">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-10">
                <p className="text-sm font-semibold tracking-wide text-graphite">{t.name}</p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.24em] text-graphite/65">
                  {t.role}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-14 flex items-center justify-center gap-8">
          <button
            onClick={prev}
            aria-label="Depoimento anterior"
            className="group flex h-11 w-11 items-center justify-center border border-graphite/20 transition-colors duration-500 hover:border-graphite"
          >
            <span className="block h-px w-4 bg-graphite transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>

          <div className="flex gap-1">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir ao depoimento ${i + 1}`}
                className="group/dot flex h-11 items-center px-1.5"
              >
                <span
                  className={`block h-1 transition-all duration-500 ${
                    i === index
                      ? "w-8 bg-brass"
                      : "w-3 bg-graphite/20 group-hover/dot:bg-graphite/40"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Próximo depoimento"
            className="group flex h-11 w-11 items-center justify-center border border-graphite/20 transition-colors duration-500 hover:border-graphite"
          >
            <span className="block h-px w-4 bg-graphite transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
