"use client";

import { useEffect } from "react";

export function ConfirmDeleteDialog({
  title,
  onCancel,
  onConfirm,
}: {
  title: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    if (!title) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [title, onCancel]);

  if (!title) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md bg-background-elevated border border-border p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-2xl mb-3">¿Eliminar disco?</h2>
        <p className="text-muted text-sm mb-8">
          Vas a eliminar <span className="text-foreground">“{title}”</span>.
          Esta acción no se puede deshacer.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs uppercase tracking-wide border border-border px-6 py-3 hover:border-muted transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="text-xs uppercase tracking-wide bg-red-500/90 text-white px-6 py-3 hover:bg-red-500 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
