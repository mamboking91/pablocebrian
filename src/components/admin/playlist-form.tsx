"use client";

import { useState } from "react";
import type { PlaylistContent, PlaylistProvider } from "@/lib/playlist-content";

const providers: { value: PlaylistProvider; label: string }[] = [
  { value: "spotify", label: "Spotify" },
  { value: "apple_music", label: "Apple Music" },
];

export function PlaylistForm({
  initialContent,
  action,
}: {
  initialContent: PlaylistContent;
  action: (formData: FormData) => Promise<void>;
}) {
  const [provider, setProvider] = useState<PlaylistProvider>(initialContent.provider);
  const [spotifyUrl, setSpotifyUrl] = useState(initialContent.spotifyUrl);
  const [appleMusicUrl, setAppleMusicUrl] = useState(initialContent.appleMusicUrl);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <form
      action={async (formData: FormData) => {
        setSaving(true);
        await action(formData);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }}
      className="flex flex-col gap-6 max-w-lg"
    >
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wide text-muted block">
          Enlace de Spotify
        </label>
        <input
          name="spotifyUrl"
          autoComplete="off"
          className="input"
          placeholder="https://open.spotify.com/playlist/..."
          value={spotifyUrl}
          onChange={(e) => setSpotifyUrl(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wide text-muted block">
          Enlace de Apple Music
        </label>
        <input
          name="appleMusicUrl"
          autoComplete="off"
          className="input"
          placeholder="https://music.apple.com/es/playlist/..."
          value={appleMusicUrl}
          onChange={(e) => setAppleMusicUrl(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wide text-muted block">
          Reproductor activo en la web
        </label>
        <div className="flex gap-2">
          {providers.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setProvider(p.value)}
              className={`flex-1 text-xs uppercase tracking-wide px-4 py-2.5 border transition-colors ${
                provider === p.value
                  ? "border-accent text-accent bg-accent/10"
                  : "border-border text-muted hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <input type="hidden" name="provider" value={provider} />
        <p className="text-xs text-muted/70">
          Puedes guardar los dos enlaces a la vez; este selector decide cuál se
          muestra y reproduce en la web. Cambiarlo no borra el otro enlace.
        </p>
      </div>

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
