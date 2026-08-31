import { isSupabaseConfigured } from "@/lib/albums";
import { login } from "./actions";

export const metadata = {
  title: "Admin · Iniciar sesión",
};

export default async function LoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const { error } = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-3">
          <h1 className="font-display text-2xl">Supabase no configurado</h1>
          <p className="text-muted text-sm">
            Añade las variables de entorno de Supabase (
            <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>) para activar el
            panel de administración.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex items-center justify-center px-6">
      <form action={login} className="w-full max-w-sm space-y-4">
        <h1 className="font-display text-2xl text-center mb-6">
          Panel de administración
        </h1>
        {error && (
          <p className="text-sm text-red-400 text-center">
            {decodeURIComponent(Array.isArray(error) ? error[0] : error)}
          </p>
        )}
        <div className="space-y-1">
          <label htmlFor="email" className="text-xs uppercase tracking-wide text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-background-elevated border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="text-xs uppercase tracking-wide text-muted">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full bg-background-elevated border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-accent text-background font-medium py-2 text-sm uppercase tracking-wide hover:bg-accent-soft transition-colors"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
