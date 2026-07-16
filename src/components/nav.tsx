"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { href: "/#projetos", label: "Projetos" },
  { href: "/#processo", label: "Processo" },
  { href: "/#materiais", label: "Materiais" },
  { href: "/#estudio", label: "Estúdio" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onIntro = () => setShown(true);
    window.addEventListener("av:intro-done", onIntro);
    // se o loader já passou (navegação interna), mostra direto
    const t = window.setTimeout(() => setShown(true), 5200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("av:intro-done", onIntro);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-700 ${
          shown ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        } ${scrolled ? "bg-ice/85 backdrop-blur-md shadow-[0_1px_0_rgba(27,28,30,0.08)]" : ""}`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
          <Link href="/" className="display text-[1.05rem] tracking-[0.32em] text-graphite">
            ATELIER<span className="text-brass">&nbsp;VERTEX</span>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative text-[0.68rem] font-medium uppercase tracking-[0.26em] text-graphite/70 transition-colors duration-300 hover:text-graphite"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-brass transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            ))}
            <Link href="/#contato" className="btn btn-ghost !px-6 !py-3 !text-[0.6rem]">
              <span>Solicitar projeto</span>
            </Link>
          </nav>

          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-[7px] lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            <span
              className={`block h-px w-7 bg-graphite transition-transform duration-500 ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-7 bg-graphite transition-transform duration-500 ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[75] flex flex-col justify-center bg-ice px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display block py-3 text-5xl text-graphite"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.6 }}
                className="mt-10"
              >
                <Link
                  href="/#contato"
                  onClick={() => setOpen(false)}
                  className="btn btn-dark"
                >
                  <span>Solicitar projeto</span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
