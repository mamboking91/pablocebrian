/**
 * Contenido estructurado de la página "Sobre mí" (diseño 5A), editable
 * desde /admin/bio. Se guarda como JSON en site_content (key: "bio_structured").
 * Los párrafos se guardan como HTML (editados con TipTap en el admin).
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
  /** HTML (negrita, cursiva, listas, enlaces) producido por el editor TipTap. */
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
      text: "<p>Mi primer trabajo profesional llegó a los 19 años, cuando <strong>Kike Perdomo</strong> me dio la oportunidad de colaborar como guitarrista y autor. El camino siguió en los estudios Multitrack de <strong>Paco Chinea</strong>: técnico de sonido, guitarrista, programador y productor, en plena revolución de la informática musical.</p>",
    },
    {
      id: "p2",
      text: "<p>Poco después me trasladé a Madrid con <strong>Iván Mur</strong> para perseguir nuestro sueño con <strong>Fábula</strong>: dos álbumes en Warner Music, más de 80 conciertos y una gira por España como teloneros de R.E.M. En 2008 dejé el escenario para componer y producir.</p>",
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

/**
 * Los párrafos guardados antes de introducir TipTap usaban texto plano con
 * `**negrita**`. Si el texto no parece ya HTML, lo convierte para que el
 * contenido antiguo se siga viendo (y edite) correctamente.
 */
function legacyTextToHtml(text: string): string {
  if (/<[a-z][\s\S]*>/i.test(text)) return text;

  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  return `<p>${escaped}</p>`;
}

export function parseBioContent(raw: string | null): BioContent {
  if (!raw) return DEFAULT_BIO_CONTENT;

  try {
    const parsed = JSON.parse(raw) as Partial<BioContent>;
    return {
      photoUrl: parsed.photoUrl || DEFAULT_BIO_CONTENT.photoUrl,
      headline: parsed.headline ?? DEFAULT_BIO_CONTENT.headline,
      subheadline: parsed.subheadline ?? DEFAULT_BIO_CONTENT.subheadline,
      paragraphs: parsed.paragraphs?.length
        ? parsed.paragraphs.map((p) => ({ ...p, text: legacyTextToHtml(p.text) }))
        : DEFAULT_BIO_CONTENT.paragraphs,
      awards: parsed.awards ?? DEFAULT_BIO_CONTENT.awards,
      highlights: parsed.highlights ?? DEFAULT_BIO_CONTENT.highlights,
      quote: parsed.quote ?? DEFAULT_BIO_CONTENT.quote,
    };
  } catch {
    return DEFAULT_BIO_CONTENT;
  }
}
