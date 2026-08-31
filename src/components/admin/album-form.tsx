import { Album } from "@/lib/types";
import { CoverPicker } from "@/components/admin/cover-picker";

export function AlbumForm({
  album,
  action,
  deleteAction,
}: {
  album?: Album;
  action: (formData: FormData) => void;
  deleteAction?: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-6 max-w-xl">
      <Field label="Título">
        <input
          name="title"
          defaultValue={album?.title}
          required
          className="input"
        />
      </Field>

      <Field label="Artista(s)" hint="Separados por comas">
        <input
          name="artist_names"
          defaultValue={album?.artist_names.join(", ")}
          required
          className="input"
        />
      </Field>

      <Field label="Rol de Pablo" hint="Producción, mezcla, composición…">
        <input name="role" defaultValue={album?.role ?? ""} className="input" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Año">
          <input
            name="release_year"
            type="number"
            defaultValue={album?.release_year ?? ""}
            className="input"
          />
        </Field>
        <Field label="Sello">
          <input name="label" defaultValue={album?.label ?? ""} className="input" />
        </Field>
      </div>

      <Field label="Portada" hint={album?.cover_url ? "Sube una imagen para reemplazar la actual" : "Imagen cuadrada recomendada"}>
        <CoverPicker currentUrl={album?.cover_url ?? null} />
      </Field>

      <Field
        label="Enlace de Spotify"
        hint="Si lo rellenas y activas el reproductor abajo, se muestra embebido en la ficha del disco"
      >
        <input name="spotify_url" defaultValue={album?.spotify_url ?? ""} className="input mb-2" />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="show_spotify"
            defaultChecked={album?.show_spotify ?? true}
          />
          Mostrar reproductor de Spotify
        </label>
      </Field>
      <Field
        label="Enlace de Apple Music"
        hint="Si lo rellenas y activas el reproductor abajo, se muestra embebido en la ficha del disco"
      >
        <input
          name="apple_music_url"
          defaultValue={album?.apple_music_url ?? ""}
          className="input mb-2"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="show_apple_music"
            defaultChecked={album?.show_apple_music ?? true}
          />
          Mostrar reproductor de Apple Music
        </label>
      </Field>
      <Field label="Enlace de YouTube">
        <input name="youtube_url" defaultValue={album?.youtube_url ?? ""} className="input" />
      </Field>

      <Field label="Orden" hint="Menor número aparece antes">
        <input
          name="sort_order"
          type="number"
          defaultValue={album?.sort_order ?? 0}
          className="input"
        />
      </Field>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={album?.featured}
          />
          Destacado (aparece en Selección)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={album?.published ?? true}
          />
          Publicado
        </label>
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          type="submit"
          className="text-xs uppercase tracking-wide bg-accent text-background px-6 py-2 hover:bg-accent-soft transition-colors"
        >
          Guardar
        </button>

        {deleteAction && (
          <button
            formAction={deleteAction}
            className="text-xs uppercase tracking-wide text-red-400 hover:text-red-300 transition-colors"
          >
            Eliminar disco
          </button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-wide text-muted block">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted/70">{hint}</p>}
    </div>
  );
}
