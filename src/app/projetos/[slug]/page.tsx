import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/lib/projects";
import SmoothScroll from "@/components/smooth-scroll";
import Cursor from "@/components/cursor";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PlanDrawing from "@/components/plan-drawing";
import { RevealTitle, FadeIn } from "@/components/reveal";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.subtitle} — ${p.location}. ${p.concept}`,
    openGraph: { images: [p.cover] },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Nav />

      <main>
        {/* hero cinematográfico — a capa em movimento lento contínuo */}
        <section className="relative h-[100svh] overflow-hidden">
          <div className="frame absolute inset-0" aria-hidden>
            <Image
              src={p.cover}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={85}
              className="animate-[kenburns_24s_ease-in-out_infinite_alternate] object-cover"
            />
          </div>
          <div className="scrim-b absolute inset-x-0 bottom-0 h-[55%]" />

          <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
            <p className="eyebrow mb-5 !text-brass-soft">
              {String(idx + 1).padStart(2, "0")} / {p.location} · {p.year}
            </p>
            <RevealTitle
              as="h1"
              lines={[p.title]}
              className="display text-[clamp(3rem,9vw,8rem)] text-ice"
              delay={0.25}
            />
            <p className="mt-4 max-w-md text-base font-light text-ice/70">{p.subtitle}</p>
          </div>
        </section>

        {/* ficha técnica */}
        <section className="border-b border-graphite/10 bg-ice">
          <FadeIn className="mx-auto grid max-w-[1600px] gap-10 px-6 py-14 sm:grid-cols-2 md:px-12 lg:grid-cols-4">
            {[
              ["Localização", p.location],
              ["Ano", String(p.year)],
              ["Área construída", p.area],
              ["Materiais", p.materials.join(" · ")],
            ].map(([k, v]) => (
              <div key={k} data-fade>
                <p className="eyebrow mb-3">{k}</p>
                <p className="text-sm font-light leading-relaxed text-graphite">{v}</p>
              </div>
            ))}
          </FadeIn>
        </section>

        {/* conceito + planta */}
        <section className="bg-ice">
          <div className="mx-auto grid max-w-[1600px] gap-16 px-6 py-24 md:grid-cols-2 md:gap-24 md:px-12 md:py-36">
            <FadeIn>
              <p data-fade className="eyebrow mb-8">
                O conceito
              </p>
              <p data-fade className="display text-[clamp(1.5rem,2.6vw,2.3rem)] leading-snug text-graphite">
                {p.concept}
              </p>
            </FadeIn>
            <div className="md:pt-16">
              <PlanDrawing modules={p.plan} title={p.title} />
            </div>
          </div>
        </section>

        {/* galeria */}
        <section className="bg-ivory">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-24 md:px-12 md:py-36">
            <div className="frame frame-zoom relative h-[70vh] w-full md:h-[88vh]">
              <Image
                src={p.photos[0]}
                alt={`${p.title} — ambiente principal`}
                fill
                sizes="92vw"
                quality={82}
                className="object-cover"
              />
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {p.photos.slice(1).map((src, i) => (
                <div key={i} className="frame frame-zoom relative aspect-[4/5]">
                  <Image
                    src={src}
                    alt={`${p.title} — detalhe ${i + 2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 46vw"
                    quality={80}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* navegação entre projetos */}
        <section className="bg-graphite text-ice">
          <div className="mx-auto grid max-w-[1600px] md:grid-cols-2">
            <Link
              href={`/projetos/${prev.slug}`}
              data-cursor="anterior"
              className="group border-b border-ice/10 p-10 transition-colors duration-500 hover:bg-carbon md:border-b-0 md:border-r md:p-16"
            >
              <p className="eyebrow mb-4 !text-brass-soft">← Projeto anterior</p>
              <p className="display text-3xl transition-transform duration-500 group-hover:-translate-x-1 md:text-4xl">
                {prev.title}
              </p>
            </Link>
            <Link
              href={`/projetos/${next.slug}`}
              data-cursor="próximo"
              className="group p-10 text-right transition-colors duration-500 hover:bg-carbon md:p-16"
            >
              <p className="eyebrow mb-4 !text-brass-soft">Próximo projeto →</p>
              <p className="display text-3xl transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
                {next.title}
              </p>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
