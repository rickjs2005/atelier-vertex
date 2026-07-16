import { FadeIn } from "@/components/reveal";

const ITEMS = [
  {
    n: "01",
    title: "Projetos exclusivos",
    copy: "Nenhum desenho se repete. Cada casa nasce do seu terreno e da sua história — e morre ali, única.",
  },
  {
    n: "02",
    title: "Arquitetura contemporânea",
    copy: "Linguagem atual sem modismos: o que projetamos hoje continuará pertinente daqui a trinta anos.",
  },
  {
    n: "03",
    title: "Design autoral",
    copy: "Do volume à maçaneta, tudo passa pela mesma mão. Coerência é o verdadeiro acabamento.",
  },
  {
    n: "04",
    title: "Alto padrão",
    copy: "Especificação rigorosa, fornecedores selecionados e tolerância zero com improviso em obra.",
  },
  {
    n: "05",
    title: "Sustentabilidade",
    copy: "Conforto passivo antes de máquina: orientação solar, ventilação cruzada, água de reuso e energia limpa.",
  },
  {
    n: "06",
    title: "Acompanhamento completo",
    copy: "Um único interlocutor do briefing à entrega das chaves — e ainda 12 meses depois dela.",
  },
  {
    n: "07",
    title: "Visualização em 3D",
    copy: "Você aprova a casa caminhando por ela em imagens fotorrealistas, antes do primeiro tijolo.",
  },
];

export default function Differentials() {
  return (
    <section className="bg-concrete">
      <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-44">
        <FadeIn className="mb-20 md:mb-28">
          <p data-fade className="eyebrow mb-6">
            Por que o Vertex
          </p>
          <h2 data-fade className="display max-w-3xl text-[clamp(2.2rem,5vw,4.6rem)] text-graphite">
            O que sustenta cada projeto.
          </h2>
        </FadeIn>

        <FadeIn className="grid gap-px overflow-hidden bg-graphite/10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {ITEMS.map((d) => (
            <article
              key={d.n}
              data-fade
              className="group relative bg-concrete p-9 transition-colors duration-700 hover:bg-ice md:p-12"
            >
              <p className="text-[0.62rem] font-semibold tracking-[0.3em] text-brass">{d.n}</p>
              <h3 className="display mt-6 text-2xl text-graphite md:text-3xl">{d.title}</h3>
              <p className="lead mt-4 text-sm">{d.copy}</p>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-brass transition-all duration-700 group-hover:w-full" />
            </article>
          ))}
          {/* célula fantasma pra fechar a grade 3×3 com elegância */}
          <div
            data-fade
            className="hidden items-end bg-graphite p-12 lg:col-span-2 lg:flex"
          >
            <p className="display-italic text-2xl text-ice/80">
              &ldquo;Deus está nos detalhes.&rdquo;
              <span className="mt-3 block text-[0.6rem] font-sans not-italic uppercase tracking-[0.28em] text-brass-soft">
                Mies van der Rohe
              </span>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
