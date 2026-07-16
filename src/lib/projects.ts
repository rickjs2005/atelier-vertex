/**
 * Portfólio fictício do Atelier Vertex.
 * Fotos: Unsplash (arquitetura residencial de alto padrão), IDs fixos e estáveis.
 */

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  year: number;
  area: string;
  cover: string;
  photos: string[];
  materials: string[];
  concept: string;
  /** proporções da planta procedural (módulos [x, y, w, h] numa grade 100×70) */
  plan: [number, number, number, number][];
}

const img = (id: string, w = 2000, q = 80) =>
  `https://images.unsplash.com/${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export const PROJECTS: Project[] = [
  {
    slug: "casa-horizonte",
    title: "Casa Horizonte",
    subtitle: "Residência sobre o vale",
    location: "Serra da Mantiqueira, SP",
    year: 2025,
    area: "780 m²",
    cover: img("photo-1600585154340-be6161a56a0c"),
    photos: [
      img("photo-1600607687939-ce8a6c25118c"),
      img("photo-1600210492486-724fe5c67fb0"),
      img("photo-1616486338812-3dadae4b4ace"),
    ],
    materials: ["Concreto aparente", "Vidro laminado", "Madeira cumaru", "Pedra mineira"],
    concept:
      "Um volume horizontal suspenso sobre o vale, onde a linha do horizonte atravessa a casa. A sala de estar em balanço de 12 metros dissolve o limite entre interior e paisagem — o morador vive dentro da vista, não diante dela.",
    plan: [
      [4, 8, 58, 26],
      [62, 8, 34, 40],
      [4, 38, 30, 26],
      [38, 40, 20, 22],
      [62, 52, 34, 12],
    ],
  },
  {
    slug: "pavilhao-luz",
    title: "Pavilhão Luz",
    subtitle: "Casa-pátio urbana",
    location: "Jardins, São Paulo",
    year: 2024,
    area: "540 m²",
    cover: img("photo-1600566753190-17f0baa2a6c3"),
    photos: [
      img("photo-1600607687920-4e2a09cf159d"),
      img("photo-1600566753190-17f0baa2a6c3"),
      img("photo-1600585154340-be6161a56a0c"),
    ],
    materials: ["Concreto pigmentado", "Vidro extraclaro", "Latão escovado", "Freijó"],
    concept:
      "No coração do lote, um pátio de luz organiza toda a casa. Os ambientes giram ao redor desse vazio central, e o sol percorre as paredes de concreto pigmentado como um relógio silencioso.",
    plan: [
      [8, 6, 84, 18],
      [8, 28, 26, 36],
      [38, 28, 24, 20],
      [66, 28, 26, 36],
      [38, 52, 24, 12],
    ],
  },
  {
    slug: "refugio-mata",
    title: "Refúgio Mata",
    subtitle: "Casa entre araucárias",
    location: "Campos do Jordão, SP",
    year: 2024,
    area: "420 m²",
    cover: img("photo-1512917774080-9991f1c4c750"),
    photos: [
      img("photo-1600210492486-724fe5c67fb0"),
      img("photo-1616594039964-ae9021a400a0"),
      img("photo-1600607687939-ce8a6c25118c"),
    ],
    materials: ["Madeira laminada colada", "Pedra são tomé", "Vidro duplo", "Aço corten"],
    concept:
      "Nenhuma araucária foi removida: a casa se desenha entre os troncos existentes, tocando o solo em apenas seis pontos. A estrutura de madeira laminada envelhece junto com a mata.",
    plan: [
      [10, 10, 44, 24],
      [58, 10, 32, 50],
      [10, 38, 28, 22],
      [42, 42, 12, 18],
    ],
  },
  {
    slug: "casa-monolito",
    title: "Casa Monólito",
    subtitle: "Peso e leveza à beira-mar",
    location: "Guarujá, SP",
    year: 2023,
    area: "920 m²",
    cover: img("photo-1613490493576-7fde63acd811"),
    photos: [
      img("photo-1600596542815-ffad4c1539a9"),
      img("photo-1616486338812-3dadae4b4ace"),
      img("photo-1600047509807-ba8f99d2cdde"),
    ],
    materials: ["Concreto protendido", "Travertino romano", "Vidro insulado", "Ipê"],
    concept:
      "Um bloco mineral repousa sobre uma lâmina de vidro. À noite, o térreo desaparece e o volume superior parece flutuar sobre a piscina de borda infinita, espelhando o mar.",
    plan: [
      [6, 8, 62, 30],
      [72, 8, 24, 56],
      [6, 42, 40, 22],
      [50, 46, 18, 18],
    ],
  },
  {
    slug: "casa-patio-norte",
    title: "Casa Pátio Norte",
    subtitle: "Geometria da sombra",
    location: "Brasília, DF",
    year: 2023,
    area: "610 m²",
    cover: img("photo-1600047509807-ba8f99d2cdde"),
    photos: [
      img("photo-1580587771525-78b9dba3b914"),
      img("photo-1600607687920-4e2a09cf159d"),
      img("photo-1600121848594-d8644e57abab"),
    ],
    materials: ["Concreto branco", "Cobogó cerâmico", "Aço patinável", "Peroba rosa"],
    concept:
      "No cerrado, a sombra é o verdadeiro luxo. Uma grande cobertura plana projeta-se além das paredes, e os cobogós desenham no piso um padrão de luz que muda a cada hora do dia.",
    plan: [
      [4, 12, 92, 16],
      [4, 32, 30, 30],
      [38, 32, 26, 22],
      [68, 32, 28, 30],
    ],
  },
  {
    slug: "vila-serena",
    title: "Vila Serena",
    subtitle: "Casa de encontros",
    location: "Punta del Este, Uruguai",
    year: 2022,
    area: "1.150 m²",
    cover: img("photo-1600596542815-ffad4c1539a9"),
    photos: [
      img("photo-1613490493576-7fde63acd811"),
      img("photo-1523217582562-09d0def993a6"),
      img("photo-1600573472592-401b489a3cdc"),
    ],
    materials: ["Pedra basalto", "Concreto aparente", "Carvalho europeu", "Bronze"],
    concept:
      "Três pavilhões — social, íntimo e de hóspedes — conectados por percursos abertos entre jardins de gramíneas. A casa foi pensada para reunir três gerações sem que ninguém abra mão do silêncio.",
    plan: [
      [4, 8, 40, 28],
      [50, 8, 46, 22],
      [4, 42, 28, 22],
      [38, 36, 24, 28],
      [68, 36, 28, 28],
    ],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export const CTA_IMAGE = img("photo-1613490493576-7fde63acd811", 2400);
export const HERO_FALLBACK = img("photo-1600585154340-be6161a56a0c", 1600);
