/**
 * Contenido estructurado de la página "Sobre mí" (diseño 5A), editable
 * desde /admin/bio. Se guarda como JSON en site_content (key: "bio_structured").
 */

export type BioAwardIcon = "star" | "ring" | "dot";

export interface BioAward {
  id: string;
  label: string;
  sub: string;
  icon: BioAwardIcon;
}

export interface BioHighlight {
  id: string;
  title: string;
  body: string;
}

export interface BioParagraph {
  id: string;
  text: string;
}

export interface BioContent {
  photoUrl: string;
  headline: string;
  subheadline: string;
  paragraphs: BioParagraph[];
  awards: BioAward[];
  highlights: BioHighlight[];
  quote: string;
}

export const DEFAULT_BIO_CONTENT: BioContent = {
  photoUrl: "/pablo-cebrian-sobre-mi.jpg",
  headline: "Veinticinco años buscando lo mismo: belleza y autenticidad.",
  subheadline:
    "Músico, compositor y productor canario afincado en Madrid desde 2001. Fundador de Halley Music.",
  paragraphs: [
    {
      id: "p1",
      text: "Mi primer trabajo profesional llegó a los 19 años, cuando **Kike Perdomo** me dio la oportunidad de colaborar como guitarrista y autor. El camino siguió en los estudios Multitrack de **Paco Chinea**: técnico de sonido, guitarrista, programador y productor, en plena revolución de la informática musical.",
    },
    {
      id: "p2",
      text: "Poco después me trasladé a Madrid con **Iván Mur** para perseguir nuestro sueño con **Fábula**: dos álbumes en Warner Music, más de 80 conciertos y una gira por España como teloneros de R.E.M. En 2008 dejé el escenario para componer y producir.",
    },
  ],
  awards: [
    { id: "a1", label: "Latin Grammy", sub: "NOMINADO ×5", icon: "ring" },
    { id: "a2", label: "Premios Ondas", sub: "PREMIADO", icon: "star" },
    { id: "a3", label: "40 Principales", sub: "GANADOR", icon: "star" },
    { id: "a4", label: "Premio Apolo", sub: "GANADOR", icon: "star" },
    { id: "a5", label: "Click & Roll", sub: "GANADOR", icon: "star" },
    { id: "a6", label: "Platino", sub: "CERTIFICADO", icon: "dot" },
  ],
  highlights: [
    {
      id: "h1",
      title: "Producción",
      body: "Composición y producción para artistas del panorama nacional e internacional, con múltiples discos de platino.",
    },
    {
      id: "h2",
      title: "Dirección artística",
      body: "Visita del Papa León XIV a España y el himno «Alza la Mirada» · Gala Latin Grammy de Andalucía · 30.º aniversario de Cadena 100 · Por Ellas · Academia de la Música 2026.",
    },
    {
      id: "h3",
      title: "Halley Music",
      body: "Nueve estudios en Madrid, fundados en 2022 como punto de encuentro para compositores, productores e intérpretes.",
    },
  ],
  quote:
    "Sigo afrontando cada proyecto con la misma ilusión que aquel joven de 19 años que entró por primera vez en un estudio de grabación.",
};

export function parseBioContent(raw: string | null): BioContent {
  if (!raw) return DEFAULT_BIO_CONTENT;

  try {
    const parsed = JSON.parse(raw) as Partial<BioContent>;
    return {
      photoUrl: parsed.photoUrl || DEFAULT_BIO_CONTENT.photoUrl,
      headline: parsed.headline ?? DEFAULT_BIO_CONTENT.headline,
      subheadline: parsed.subheadline ?? DEFAULT_BIO_CONTENT.subheadline,
      paragraphs: parsed.paragraphs?.length
        ? parsed.paragraphs
        : DEFAULT_BIO_CONTENT.paragraphs,
      awards: parsed.awards ?? DEFAULT_BIO_CONTENT.awards,
      highlights: parsed.highlights ?? DEFAULT_BIO_CONTENT.highlights,
      quote: parsed.quote ?? DEFAULT_BIO_CONTENT.quote,
    };
  } catch {
    return DEFAULT_BIO_CONTENT;
  }
}
