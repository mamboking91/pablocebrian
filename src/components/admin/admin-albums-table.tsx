"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Album } from "@/lib/types";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function GripIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="9" cy="6" r="1.4" />
      <circle cx="9" cy="12" r="1.4" />
      <circle cx="9" cy="18" r="1.4" />
      <circle cx="15" cy="6" r="1.4" />
      <circle cx="15" cy="12" r="1.4" />
      <circle cx="15" cy="18" r="1.4" />
    </svg>
  );
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function AlbumRow({
  album,
  canReorder,
  onDelete,
}: {
  album: Album;
  canReorder: boolean;
  onDelete: (album: Album) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: album.id, disabled: !canReorder });

  return (
    <tr
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        position: "relative",
        zIndex: isDragging ? 1 : undefined,
        background: isDragging ? "var(--background-elevated)" : undefined,
      }}
      className="border-b border-border/60"
    >
      <td className="py-2 pr-1 w-7">
        {canReorder && (
          <button
            type="button"
            {...attributes}
            {...listeners}
            aria-label={`Reordenar ${album.title}`}
            className="touch-none cursor-grab active:cursor-grabbing text-muted hover:text-foreground transition-colors p-1 -ml-1"
          >
            <GripIcon className="w-4 h-4" />
          </button>
        )}
      </td>
      <td className="py-2 pr-4">
        <div className="relative w-11 h-11 bg-background-elevated border border-border overflow-hidden shrink-0">
          {album.cover_url ? (
            <Image
              src={album.cover_url}
              alt=""
              fill
              sizes="44px"
              className="object-cover"
            />
          ) : null}
        </div>
      </td>
      <td className="py-2 pr-4">
        <div className="break-words">{album.title}</div>
        <div className="text-muted text-xs break-words sm:hidden">
          {album.artist_names.join(", ")}
        </div>
      </td>
      <td className="py-2 pr-4 text-muted hidden sm:table-cell">
        {album.artist_names.join(", ")}
      </td>
      <td className="py-2 pr-4 hidden sm:table-cell">
        {album.featured ? "Sí" : "—"}
      </td>
      <td className="py-2 pr-4 hidden sm:table-cell">
        {album.published ? "Sí" : "—"}
      </td>
      <td className="py-2 pr-4">
        <div className="flex items-center justify-end gap-3 sm:gap-4">
          <Link
            href={`/admin/discos/${album.id}`}
            aria-label={`Editar ${album.title}`}
            className="flex items-center gap-1.5 text-accent hover:text-accent-soft transition-colors"
          >
            <PencilIcon className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Editar</span>
          </Link>
          <button
            type="button"
            onClick={() => onDelete(album)}
            aria-label={`Eliminar ${album.title}`}
            className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors"
          >
            <TrashIcon className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Eliminar</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export function AdminAlbumsTable({
  albums,
  deleteAlbum,
  reorderAlbums,
}: {
  albums: Album[];
  deleteAlbum: (id: string) => Promise<void>;
  reorderAlbums: (orderedIds: string[]) => Promise<void>;
}) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(albums);
  const [pendingDelete, setPendingDelete] = useState<Album | null>(null);
  const [mounted, setMounted] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setItems(albums);
  }, [albums]);

  // El drag & drop de @dnd-kit añade atributos (ids de accesibilidad) que
  // difieren entre el render de servidor y el del cliente, así que se
  // activa solo tras montar para evitar un hydration mismatch.
  useEffect(() => {
    setMounted(true);
  }, []);

  const canReorder = mounted && query.trim() === "";

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return items;
    return items.filter(
      (album) =>
        normalize(album.title).includes(q) ||
        album.artist_names.some((artist) => normalize(artist).includes(q)),
    );
  }, [items, query]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((a) => a.id === active.id);
    const newIndex = items.findIndex((a) => a.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const next = arrayMove(items, oldIndex, newIndex);
    setItems(next);

    startTransition(() => {
      reorderAlbums(next.map((a) => a.id)).then(
        () => toast.success("Orden actualizado"),
        () => toast.error("No se pudo guardar el orden"),
      );
    });
  }

  return (
    <div>
      <div className="relative w-full sm:w-72 mb-6">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título o artista…"
          className="input rounded-full"
          style={{ paddingLeft: "2.75rem" }}
        />
      </div>

      {visible.length === 0 ? (
        <p className="text-muted text-sm">
          {items.length === 0
            ? "Todavía no hay discos."
            : "Ningún disco coincide con la búsqueda."}
        </p>
      ) : (
        <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
          {!canReorder && (
            <p className="text-muted text-xs mb-2">
              Borra la búsqueda para poder reordenar arrastrando.
            </p>
          )}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={visible.map((a) => a.id)}
              strategy={verticalListSortingStrategy}
            >
              <table className="w-full text-sm sm:min-w-[560px]">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-muted border-b border-border">
                    <th className="py-2 pr-1 w-7" />
                    <th className="py-2 pr-4" />
                    <th className="py-2 pr-4">Título</th>
                    <th className="py-2 pr-4 hidden sm:table-cell">
                      Artista(s)
                    </th>
                    <th className="py-2 pr-4 hidden sm:table-cell">
                      Destacado
                    </th>
                    <th className="py-2 pr-4 hidden sm:table-cell">
                      Publicado
                    </th>
                    <th className="py-2 pr-4" />
                  </tr>
                </thead>
                <tbody>
                  {visible.map((album) => (
                    <AlbumRow
                      key={album.id}
                      album={album}
                      canReorder={canReorder}
                      onDelete={setPendingDelete}
                    />
                  ))}
                </tbody>
              </table>
            </SortableContext>
          </DndContext>
        </div>
      )}

      <ConfirmDeleteDialog
        title={pendingDelete?.title ?? null}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          const album = pendingDelete;
          if (!album) return;
          setPendingDelete(null);
          startTransition(() => {
            deleteAlbum(album.id);
          });
        }}
      />
    </div>
  );
}
