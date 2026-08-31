import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/albums";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { logout } from "../actions";

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-3">
          <h1 className="font-display text-2xl">Supabase no configurado</h1>
          <p className="text-muted text-sm">
            Añade las variables de entorno de Supabase (
            <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>) y ejecuta{" "}
            <code>supabase/schema.sql</code> para activar el panel de
            administración.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="flex-1 flex">
      <AdminSidebar logoutAction={logout} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex md:hidden items-center justify-between px-4 py-3 border-b border-border">
          <Link href="/admin/discos" className="font-display text-base">
            Panel · Pablo Cebrián
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/discos"
              className="text-[11px] uppercase tracking-wide text-muted hover:text-accent transition-colors"
            >
              Discos
            </Link>
            <Link
              href="/admin/bio"
              className="text-[11px] uppercase tracking-wide text-muted hover:text-accent transition-colors"
            >
              Bio
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="text-[11px] uppercase tracking-wide text-muted hover:text-accent transition-colors"
              >
                Salir
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 w-full max-w-5xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
