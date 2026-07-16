import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-carbon text-ice">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
        <p className="display text-[clamp(2.4rem,8vw,7rem)] leading-none tracking-[0.08em]">
          ATELIER<span className="text-brass-soft">&nbsp;VERTEX</span>
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          <div>
            <p className="eyebrow mb-5 !text-brass-soft">Estúdio</p>
            <p className="text-sm font-light leading-relaxed text-ice/60">
              Av. Europa 812, Jardim Europa
              <br />
              São Paulo — SP
              <br />
              {SITE.email}
            </p>
          </div>
          <div>
            <p className="eyebrow mb-5 !text-brass-soft">Navegação</p>
            <nav className="flex flex-col gap-3 text-sm font-light text-ice/60">
              <Link href="/#projetos" className="w-fit transition-colors hover:text-ice">
                Projetos
              </Link>
              <Link href="/#processo" className="w-fit transition-colors hover:text-ice">
                Processo
              </Link>
              <Link href="/#materiais" className="w-fit transition-colors hover:text-ice">
                Materiais
              </Link>
              <Link href="/#contato" className="w-fit transition-colors hover:text-ice">
                Contato
              </Link>
            </nav>
          </div>
          <div>
            <p className="eyebrow mb-5 !text-brass-soft">Reconhecimento</p>
            <p className="text-sm font-light leading-relaxed text-ice/60">
              Prêmio Nacional de Arquitetura 2024
              <br />
              Bienal Ibero-Americana — Menção Honrosa
              <br />
              Archello Best Projects 2023
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-ice/10 pt-8 text-[0.65rem] uppercase tracking-[0.22em] text-ice/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Atelier Vertex — Todos os direitos reservados</p>
          <p>Escritório fictício — estudo de design cinematográfico</p>
        </div>
      </div>
    </footer>
  );
}
