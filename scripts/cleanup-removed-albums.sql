-- Borra en Supabase los discos que ya no están en pablocebrian.es
-- (no estaban en la web real, solo eran datos placeholder antiguos).
-- Ejecutar en el SQL Editor de Supabase DESPUÉS de correr scripts/seed-albums.ts.

delete from public.albums where slug in (
  'julia-debis-la-memoria',
  'vivafe-i-ll-lift-up-my-eyes',
  'los-enanitos-verdes-creo',
  'tuyo-aleluya',
  'beret-hablo-de-ti',
  'naike-ponce-que-bonito-es-querer',
  'maria-leon-las-damas-y-el-vagabundo',
  'luis-ramiro-cinecitta',
  'gonzalo-hermida-vivir-es-una-fiesta',
  'hermanos-martinez-feliz-navidad',
  'miriam-rodriguez-hay-algo-en-mi-live-las-ventas',
  'beret-nadie-mas-te-la-cree',
  'julia-medina-mi-templo',
  'hermanos-martinez-me-voy-contigo',
  'siloe-todos-los-besos-remix',
  'sole-gimenez-esa-vieja-melodia'
);
