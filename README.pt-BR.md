[English](README.md) | **Português**

# ATELIER VERTEX

Site-conceito de um escritório de arquitetura de alto padrão. A marca é fictícia: projetos, depoimentos, endereço e contatos do site são ilustrativos (o e-mail usa um domínio reservado `.example`). Projeto de portfólio da [MilWeb](https://milweb.com.br).

> **Tipo:** conceito (marca fictícia, projeto de portfólio)

Esta é a primeira versão. A versão refeita está em [atelier-vertex-v2](https://github.com/rickjs2005/atelier-vertex-v2).

![Página inicial do Atelier Vertex com a residência 3D procedural no hero](docs/screenshots/home.webp)

## Funcionalidades

- Hero com uma residência 3D procedural (React Three Fiber), sem modelos 3D externos.
- Seções de manifesto, projetos, processo, materiais, diferenciais, depoimentos e contato, com animações no scroll (GSAP e Framer Motion) e rolagem suave (Lenis).
- Página de detalhe para cada um dos seis projetos em `/projetos/[slug]`, gerada estaticamente a partir de `src/lib/projects.ts`.
- `sitemap.xml` e `robots.txt` gerados pelo App Router.

## Stack

Next.js 15.5 (App Router, Turbopack), React 19.1, TypeScript 5, Tailwind CSS 4, Three.js 0.185 com React Three Fiber 9 e drei 10, GSAP 3, Lenis, Framer Motion 12. Fontes Cormorant Garamond e Manrope via `next/font/google`.

## Como rodar

Pré-requisitos: Node.js 20 ou superior e npm.

```bash
npm ci
npm run dev      # servidor de desenvolvimento (http://localhost:3000)
```

### Scripts

| Script | O que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento com Turbopack |
| `npm run build` | build de produção |
| `npm run start` | serve o build |
| `npm run lint` | ESLint |

Não há variáveis de ambiente. Os dados da marca (nome, URL, e-mail) ficam em `src/lib/site.ts`. A URL configurada ali (`atelier-vertex.vercel.app`) é usada em metadados, `sitemap` e `robots`; não há demo publicada confirmada desta versão.

## Estrutura

```
src/
  app/                 layout, página inicial, /projetos/[slug], sitemap, robots
  components/          nav, footer, cursor, loader, rolagem suave
    sections/          seções da página inicial
    three/             cena 3D do hero
  hooks/               regra que decide se a cena 3D é carregada
  lib/                 dados da marca, projetos e configuração do GSAP
```

## Limitações

- A cena 3D (e o próprio three.js) só é carregada em desktop: viewport a partir de 1024px, ponteiro fino e sem preferência por movimento reduzido. Em celulares não há WebGL.
- Conteúdo estático e fictício; não há back-end nem formulário: o botão de contato abre um `mailto:` para um endereço `.example`.
- As fotos dos projetos são carregadas em tempo real de `images.unsplash.com` (liberado em `next.config.ts`); sem acesso à internet elas não aparecem.
- Sem testes automatizados; a CI roda lint, checagem de tipos e build.

## Créditos

- Fotos dos projetos: [Unsplash](https://unsplash.com) (carregadas por ID; autores individuais não documentados no projeto).
- Residência 3D do hero: geometria procedural feita no código.

## Segurança

Veja [SECURITY.md](SECURITY.md).

## Licença

Ainda não há licença definida; todos os direitos reservados ao autor.
