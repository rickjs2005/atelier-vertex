import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Script from "next/script";
import { SITE } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Arquitetura de alto padrão`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "arquitetura de alto padrão",
    "escritório de arquitetura",
    "projetos residenciais exclusivos",
    "arquitetura contemporânea",
    "design autoral",
    "Atelier Vertex",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
    title: `${SITE.name} — Arquitetura de alto padrão`,
    description: SITE.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Arquitetura de alto padrão`,
    description: SITE.tagline,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#org`,
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  email: SITE.email,
  foundingDate: String(SITE.founded),
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressCountry: "BR",
  },
  knowsAbout: [
    "Arquitetura residencial de alto padrão",
    "Arquitetura contemporânea",
    "Design de interiores",
    "Visualização 3D",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`js ${cormorant.variable} ${manrope.variable}`}>
      <body className="grain antialiased">
        {children}
        <Script
          id="jsonld-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
