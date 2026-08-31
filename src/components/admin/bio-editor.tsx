"use client";

import { useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

function ToolbarButton({
  onClick,
  active,
  children,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`px-2.5 py-1.5 text-xs border transition-colors ${
        active
          ? "border-accent text-accent bg-accent/10"
          : "border-border text-muted hover:text-foreground hover:border-foreground/40"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as
      | string
      | undefined;
    const url = window.prompt("URL del enlace", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-2 border border-border border-b-0 p-2 bg-background-elevated">
      <ToolbarButton
        label="Negrita"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton
        label="Cursiva"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <em>I</em>
      </ToolbarButton>
      <ToolbarButton
        label="Título"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        label="Lista"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • Lista
      </ToolbarButton>
      <ToolbarButton
        label="Enlace"
        active={editor.isActive("link")}
        onClick={setLink}
      >
        Enlace
      </ToolbarButton>
      <ToolbarButton
        label="Párrafo"
        active={editor.isActive("paragraph")}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        P
      </ToolbarButton>
    </div>
  );
}

export function BioEditor({
  initialContent,
  action,
}: {
  initialContent: string;
  action: (formData: FormData) => Promise<void>;
}) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "prose-bio min-h-[320px] px-4 py-3 focus:outline-none text-[15px] leading-relaxed text-foreground/90",
      },
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[380px] border border-border bg-background-elevated animate-pulse" />
    );
  }

  return (
    <form
      action={async (formData: FormData) => {
        setSaving(true);
        formData.set("content", editor.getHTML());
        await action(formData);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }}
    >
      <Toolbar editor={editor} />
      <div className="border border-border bg-background-elevated">
        <EditorContent editor={editor} />
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="text-xs uppercase tracking-wide bg-accent text-background px-6 py-2 hover:bg-accent-soft transition-colors disabled:opacity-60"
        >
          {saving ? "Guardando…" : "Guardar bio"}
        </button>
        {saved && (
          <span className="text-xs text-accent">Guardado correctamente.</span>
        )}
      </div>
    </form>
  );
}
