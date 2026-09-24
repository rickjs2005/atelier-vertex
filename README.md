# ATELIER VERTEX

Site conceito de um escritório de arquitetura de alto padrão. A marca é fictícia: projetos, depoimentos, endereço e contatos do site são ilustrativos. Projeto de portfólio da [MilWeb](https://milweb.com.br).

Esta é a primeira versão. A versão refeita está em [atelier-vertex-v2](https://github.com/rickjs2005/atelier-vertex-v2).

## O que tem

- Hero com uma residência 3D procedural (React Three Fiber), sem modelos 3D externos.
- Seções de manifesto, projetos, processo, materiais, diferenciais, depoimentos e contato, com animações no scroll (GSAP e Framer Motion) e rolagem suave (Lenis).
- Página de detalhe para cada projeto em `/projetos/[slug]`, com dados em `src/lib/projects.ts`.
- Fotos dos projetos carregadas do Unsplash (`images.unsplash.com`, liberado em `next.config.ts`).
- `sitemap` e `robots` gerados pelo App Router.

## Stack

Next.js 15 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, Three.js com React Three Fiber e drei, GSAP, Lenis, Framer Motion.

## Como rodar

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm run start    # serve o build
npm run lint
```

Não há variáveis de ambiente. Os dados da marca (nome, URL, e-mail) ficam em `src/lib/site.ts`.
