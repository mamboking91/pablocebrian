"use client";

import { useState } from "react";
import type {
  BioAward,
  BioAwardIcon,
  BioContent,
  BioHighlight,
} from "@/lib/bio-content";

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function move<T>(list: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

const iconOptions: { value: BioAwardIcon; label: string }[] = [
  { value: "star", label: "Estrella (premio)" },
  { value: "ring", label: "Aro (nominación)" },
  { value: "dot", label: "Punto (certificación)" },
];

function SectionHeading({
  title,
  onAdd,
  addLabel,
}: {
  title: string;
  onAdd?: () => void;
  addLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-sm uppercase tracking-wide text-muted">{title}</h2>
      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="text-xs uppercase tracking-wide text-accent hover:text-accent-soft transition-colors"
        >
          + {addLabel}
        </button>
      )}
    </div>
  );
}

function RowControls({
  index,
  length,
  onMoveUp,
  onMoveDown,
  onDelete,
}: {
  index: number;
  length: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        disabled={index === 0}
        onClick={onMoveUp}
        aria-label="Subir"
        className="text-xs text-muted hover:text-foreground disabled:opacity-30 disabled:hover:text-muted"
      >
        ↑
      </button>
      <button
        type="button"
        disabled={index === length - 1}
        onClick={onMoveDown}
        aria-label="Bajar"
        className="text-xs text-muted hover:text-foreground disabled:opacity-30 disabled:hover:text-muted"
      >
        ↓
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="text-xs text-red-400 hover:text-red-300 ml-auto"
      >
        Eliminar
      </button>
    </div>
  );
}

export function BioContentEditor({
  initialContent,
  action,
}: {
  initialContent: BioContent;
  action: (formData: FormData) => Promise<void>;
}) {
  const [content, setContent] = useState<BioContent>(initialContent);
  const [photoPreview, setPhotoPreview] = useState(initialContent.photoUrl);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(file ? URL.createObjectURL(file) : content.photoUrl);
  }

  function updateParagraph(index: number, text: string) {
    const paragraphs = [...content.paragraphs];
    paragraphs[index] = { ...paragraphs[index], text };
    setContent({ ...content, paragraphs });
  }

  function updateAward(index: number, patch: Partial<BioAward>) {
    const awards = [...content.awards];
    awards[index] = { ...awards[index], ...patch };
    setContent({ ...content, awards });
  }

  function updateHighlight(index: number, patch: Partial<BioHighlight>) {
    const highlights = [...content.highlights];
    highlights[index] = { ...highlights[index], ...patch };
    setContent({ ...content, highlights });
  }

  return (
    <form
      action={async (formData: FormData) => {
        setSaving(true);
        formData.set("content", JSON.stringify(content));
        await action(formData);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }}
      className="flex flex-col gap-10"
    >
      {/* Foto */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm uppercase tracking-wide text-muted">Foto</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24 shrink-0 bg-background-elevated border border-border overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoPreview}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <input
            name="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="text-sm text-muted"
          />
        </div>
      </section>

      {/* Titular */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm uppercase tracking-wide text-muted">
          Titular
        </h2>
        <textarea
          className="input"
          rows={2}
          value={content.headline}
          onChange={(e) =>
            setContent({ ...content, headline: e.target.value })
          }
        />
        <label className="text-xs text-muted">Subtítulo</label>
        <textarea
          className="input"
          rows={2}
          value={content.subheadline}
          onChange={(e) =>
            setContent({ ...content, subheadline: e.target.value })
          }
        />
      </section>

      {/* Párrafos */}
      <section className="flex flex-col gap-3">
        <SectionHeading
          title="Párrafos"
          addLabel="Añadir párrafo"
          onAdd={() =>
            setContent({
              ...content,
              paragraphs: [
                ...content.paragraphs,
                { id: newId(), text: "" },
              ],
            })
          }
        />
        {content.paragraphs.length === 0 && (
          <p className="text-xs text-muted">No hay párrafos todavía.</p>
        )}
        {content.paragraphs.map((p, i) => (
          <div key={p.id} className="flex flex-col gap-2 border border-border p-3">
            <textarea
              className="input"
              rows={3}
              value={p.text}
              onChange={(e) => updateParagraph(i, e.target.value)}
              placeholder="Usa **texto** para resaltar nombres o palabras clave."
            />
            <RowControls
              index={i}
              length={content.paragraphs.length}
              onMoveUp={() =>
                setContent({
                  ...content,
                  paragraphs: move(content.paragraphs, i, -1),
                })
              }
              onMoveDown={() =>
                setContent({
                  ...content,
                  paragraphs: move(content.paragraphs, i, 1),
                })
              }
              onDelete={() =>
                setContent({
                  ...content,
                  paragraphs: content.paragraphs.filter((_, idx) => idx !== i),
                })
              }
            />
          </div>
        ))}
      </section>

      {/* Premios */}
      <section className="flex flex-col gap-3">
        <SectionHeading
          title="Premios y reconocimientos"
          addLabel="Añadir premio"
          onAdd={() =>
            setContent({
              ...content,
              awards: [
                ...content.awards,
                { id: newId(), label: "", sub: "", icon: "star" },
              ],
            })
          }
        />
        {content.awards.length === 0 && (
          <p className="text-xs text-muted">No hay premios todavía.</p>
        )}
        {content.awards.map((award, i) => (
          <div
            key={award.id}
            className="flex flex-col gap-2 border border-border p-3"
          >
            <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-2">
              <input
                className="input"
                placeholder="Nombre (p. ej. Latin Grammy)"
                value={award.label}
                onChange={(e) => updateAward(i, { label: e.target.value })}
              />
              <input
                className="input"
                placeholder="Estado (p. ej. GANADOR)"
                value={award.sub}
                onChange={(e) => updateAward(i, { sub: e.target.value })}
              />
              <select
                className="input"
                value={award.icon}
                onChange={(e) =>
                  updateAward(i, { icon: e.target.value as BioAwardIcon })
                }
              >
                {iconOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <RowControls
              index={i}
              length={content.awards.length}
              onMoveUp={() =>
                setContent({ ...content, awards: move(content.awards, i, -1) })
              }
              onMoveDown={() =>
                setContent({ ...content, awards: move(content.awards, i, 1) })
              }
              onDelete={() =>
                setContent({
                  ...content,
                  awards: content.awards.filter((_, idx) => idx !== i),
                })
              }
            />
          </div>
        ))}
      </section>

      {/* Columnas destacadas */}
      <section className="flex flex-col gap-3">
        <SectionHeading
          title="Columnas destacadas"
          addLabel="Añadir columna"
          onAdd={() =>
            setContent({
              ...content,
              highlights: [
                ...content.highlights,
                { id: newId(), title: "", body: "" },
              ],
            })
          }
        />
        {content.highlights.length === 0 && (
          <p className="text-xs text-muted">No hay columnas todavía.</p>
        )}
        {content.highlights.map((h, i) => (
          <div key={h.id} className="flex flex-col gap-2 border border-border p-3">
            <input
              className="input"
              placeholder="Título (p. ej. Producción)"
              value={h.title}
              onChange={(e) => updateHighlight(i, { title: e.target.value })}
            />
            <textarea
              className="input"
              rows={3}
              placeholder="Descripción"
              value={h.body}
              onChange={(e) => updateHighlight(i, { body: e.target.value })}
            />
            <RowControls
              index={i}
              length={content.highlights.length}
              onMoveUp={() =>
                setContent({
                  ...content,
                  highlights: move(content.highlights, i, -1),
                })
              }
              onMoveDown={() =>
                setContent({
                  ...content,
                  highlights: move(content.highlights, i, 1),
                })
              }
              onDelete={() =>
                setContent({
                  ...content,
                  highlights: content.highlights.filter((_, idx) => idx !== i),
                })
              }
            />
          </div>
        ))}
      </section>

      {/* Cita final */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm uppercase tracking-wide text-muted">
          Cita final
        </h2>
        <textarea
          className="input"
          rows={2}
          value={content.quote}
          onChange={(e) => setContent({ ...content, quote: e.target.value })}
        />
      </section>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="text-xs uppercase tracking-wide bg-accent text-background px-6 py-2 hover:bg-accent-soft transition-colors disabled:opacity-60"
        >
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
        {saved && (
          <span className="text-xs text-accent">Guardado correctamente.</span>
        )}
      </div>
    </form>
  );
}
