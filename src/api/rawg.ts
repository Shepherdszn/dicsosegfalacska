// RAWG API integráció — ingyenes tier, 20 000 kérés/hó.
// Kulcs igénylése: https://rawg.io/apidocs (regisztráció után azonnal kapsz API kulcsot)
// A kulcsot a .env fájlba tedd: VITE_RAWG_API_KEY=ide_a_kulcsod

const RAWG_BASE = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY as string | undefined;

export interface RawgGameResult {
  id: number;
  name: string;
  background_image: string | null;
  genres: { name: string }[];
  playtime: number;
}

export async function searchGamesRawg(query: string): Promise<RawgGameResult[]> {
  if (!API_KEY) {
    console.warn("Nincs beállítva VITE_RAWG_API_KEY — a keresés nem fog működni.");
    return [];
  }
  if (!query.trim()) return [];

  const url = `${RAWG_BASE}/games?key=${API_KEY}&search=${encodeURIComponent(
    query
  )}&page_size=8`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error("RAWG API hiba:", res.status, res.statusText);
    return [];
  }
  const data = await res.json();
  return data.results ?? [];
}
