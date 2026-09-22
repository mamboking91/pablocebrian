"use server";

import nodemailer from "nodemailer";

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

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    console.error("Faltan variables de entorno SMTP_HOST/SMTP_USER/SMTP_PASSWORD");
    return { ok: false, error: "El formulario no está disponible ahora mismo." };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"${nombre} (vía pablocebrian.es)" <${user}>`,
      to: user,
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
  } catch (error) {
    console.error("Error enviando el mensaje de contacto", error);
    return { ok: false, error: "No se pudo enviar el mensaje. Inténtalo de nuevo." };
  }

  return { ok: true };
}
