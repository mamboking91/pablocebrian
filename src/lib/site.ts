// TODO: cuando se migre el DNS de pablocebrian.es a este proyecto, cambiar
// este valor por defecto a "https://pablocebrian.es" (o definir
// NEXT_PUBLIC_SITE_URL=https://pablocebrian.es en Vercel).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pablocebrian.vercel.app";

export const SITE_NAME = "Pablo Cebrián";

export const SITE_DESCRIPTION =
  "Pablo Cebrián, productor musical español. Discografía, biografía y contacto.";
