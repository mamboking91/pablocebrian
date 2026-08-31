import Link from "next/link";
import { Toaster } from "sonner";
import { isSupabaseConfigured } from "@/lib/albums";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";
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
        <header className="flex md:hidden items-center px-4 py-3 border-b border-border">
          <Link href="/admin/discos" className="font-display text-base">
            Panel · Pablo Cebrián
          </Link>
        </header>

        <main className="flex-1 px-6 py-8 w-full max-w-5xl mx-auto pb-24 md:pb-8">
          {children}
        </main>
      </div>

      <AdminMobileNav logoutAction={logout} />

      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "var(--background-elevated)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          },
        }}
      />
    </div>
  );
}
