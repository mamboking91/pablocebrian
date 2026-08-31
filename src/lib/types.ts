export type Album = {
  id: string;
  slug: string;
  title: string;
  artist_names: string[];
  role: string | null;
  release_year: number | null;
  label: string | null;
  cover_url: string | null;
  spotify_url: string | null;
  apple_music_url: string | null;
  youtube_url: string | null;
  show_spotify: boolean;
  show_apple_music: boolean;
  featured: boolean;
  published: boolean;
  sort_order: number;
};
