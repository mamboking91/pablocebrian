# Pablo Cebrián — web + panel de administración

Next.js (App Router) + Supabase. Sitio público de discografía/bio/contacto y
un panel `/admin` para que Pablo gestione sus discos sin tocar código.

## Arrancar en local

```bash
npm install
npm run dev
```

Sin configurar Supabase, el sitio público funciona igualmente mostrando
contenido de ejemplo (`src/lib/placeholder-albums.ts`), y `/admin` muestra un
aviso de configuración pendiente en vez de fallar.

## Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En el SQL editor del proyecto, ejecuta `supabase/schema.sql` (crea la
   tabla `albums`, las políticas RLS y el bucket `album-covers`).
3. En **Authentication → Users**, crea manualmente el usuario admin
   (email + contraseña) que usará Pablo para entrar a `/admin`. No hay
   registro público.
4. Copia `.env.example` a `.env.local` y rellena con los valores de
   **Project Settings → API** de Supabase:

   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```

5. Reinicia `npm run dev`. `/admin/login` ya debería aceptar el usuario
   creado en el paso 3.

## Estructura

- `src/app/{page.tsx,discografia,sobre-mi,contacto}` — páginas públicas:
  home, discografía, ficha de disco, sobre mí, contacto.
- `src/app/admin` — panel de administración protegido (login + CRUD de
  discos en `/admin/discos`).
- `src/lib/albums.ts` — capa de datos; usa Supabase si está configurado, si
  no cae a los placeholders.
- `supabase/schema.sql` — esquema de base de datos a ejecutar en Supabase.

## Pendiente antes de producción

- Sustituir la biografía placeholder en `src/app/sobre-mi/page.tsx` por el
  texto real de Pablo.
- Confirmar email/teléfono de contacto en `src/app/contacto/page.tsx`.
- Cargar la discografía real desde `/admin/discos` (los datos de ejemplo son
  solo para previsualizar el diseño).
- Desplegar en Vercel y migrar el DNS de `pablocebrian.es`.
