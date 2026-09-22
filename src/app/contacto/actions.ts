"use server";

import { Resend } from "resend";

const FROM_EMAIL = "Pablo Cebrián (web) <formulario@pablocebrian.es>";

export type SendContactMessageResult = { ok: true } | { ok: false; error: string };

export async function sendContactMessage(
  formData: FormData,
): Promise<SendContactMessageResult> {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const asunto = String(formData.get("asunto") ?? "").trim();
  const mensaje = String(formData.get("mensaje") ?? "").trim();

  if (!nombre || !email) {
    return { ok: false, error: "Falta el nombre o el email." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error("Faltan variables de entorno RESEND_API_KEY/CONTACT_TO_EMAIL");
    return { ok: false, error: "El formulario no está disponible ahora mismo." };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    replyTo: email,
    subject: asunto ? `[Contacto web] ${asunto}` : `[Contacto web] Nuevo mensaje de ${nombre}`,
    text: [
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      asunto ? `Asunto: ${asunto}` : null,
      "",
      mensaje || "(sin mensaje)",
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });

  if (error) {
    console.error("Error enviando el mensaje de contacto", error);
    return { ok: false, error: "No se pudo enviar el mensaje. Inténtalo de nuevo." };
  }

  return { ok: true };
}
