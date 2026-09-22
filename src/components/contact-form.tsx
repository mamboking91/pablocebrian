"use client";

import { useState } from "react";
import { sendContactMessage } from "@/app/contacto/actions";

function Field({
  id,
  label,
  icon,
  full,
  ...props
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  full?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`space-y-2 ${full ? "sm:col-span-2" : ""}`}>
      <label
        htmlFor={id}
        className="text-xs tracking-[0.16em] uppercase text-muted"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          className="peer input"
          style={{ paddingLeft: "2.75rem" }}
          {...props}
        />
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted/70 peer-focus:text-accent">
          {icon}
        </span>
      </div>
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (sent) {
    return (
      <div className="border border-border bg-background-elevated px-8 py-16 text-center">
        <p className="text-foreground">Gracias por contactarme.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSending(true);
        setError(null);
        const result = await sendContactMessage(new FormData(e.currentTarget));
        setSending(false);
        if (result.ok) {
          setSent(true);
        } else {
          setError(result.error);
        }
      }}
      className="relative w-full border border-border px-6 py-10 sm:px-12 sm:py-12"
    >
      <span className="absolute -top-px left-1/2 h-0.5 w-16 -translate-x-1/2 bg-accent" />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="nombre"
          label="Nombre *"
          placeholder="Tu nombre"
          type="text"
          required
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        />
        <Field
          id="email"
          label="Email *"
          placeholder="tu@email.com"
          type="email"
          required
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 5L2 7" />
            </svg>
          }
        />
        <Field
          id="asunto"
          label="Asunto"
          placeholder="Sobre qué quieres hablar"
          type="text"
          full
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a2 2 0 0 1-.59 1.42l-7.5 7.5a2 2 0 0 1-2.82 0l-7.5-7.5A2 2 0 0 1 2 11.5V4a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.42.59l7.5 7.5A2 2 0 0 1 21 11.5Z" />
              <circle cx="7.5" cy="7.5" r="1.5" />
            </svg>
          }
        />

        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="mensaje"
            className="text-xs tracking-[0.16em] uppercase text-muted"
          >
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            placeholder="Cuéntame más..."
            className="input"
          />
        </div>
      </div>

      {error && (
        <p className="mt-6 text-center text-sm text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-8 inline-flex items-center gap-2.5 bg-accent px-9 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-background transition-opacity hover:opacity-85 disabled:opacity-60 mx-auto flex"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
        {sending ? "Enviando…" : "Enviar"}
      </button>
    </form>
  );
}
