// SteamGridDB API integráció — ingyenes, átlátszó logók és ikonok.
// Kulcs igénylése: https://www.steamgriddb.com/profile/preferences/api
// A kulcsot a .env fájlba tedd: VITE_SGDB_API_KEY=ide_a_kulcsod
//
// FONTOS: A SteamGridDB API nem enged közvetlen böngésző-oldali (CORS) hívást
// API kulccsal. Éles használatra egy egyszerű proxy endpoint javasolt
// (pl. Cloudflare Worker, ami átirányítja a kérést és hozzáadja a fejlécet).
// Ez a fájl a hívás struktúráját mutatja be — a proxy URL-t neked kell majd
// beállítani, ha ezt a funkciót aktiválod.

const SGDB_PROXY = import.meta.env.VITE_SGDB_PROXY_URL as string | undefined;

export interface SgdbLogoResult {
  id: number;
  url: string;
}

export async function searchLogosByGameId(
  sgdbGameId: number
): Promise<SgdbLogoResult[]> {
  if (!SGDB_PROXY) {
    console.warn("Nincs beállítva VITE_SGDB_PROXY_URL — logó-keresés kihagyva.");
    return [];
  }

  const res = await fetch(`${SGDB_PROXY}/logos/game/${sgdbGameId}`);
  if (!res.ok) {
    console.error("SteamGridDB proxy hiba:", res.status);
    return [];
  }
  const data = await res.json();
  return (data.data ?? []).map((item: any) => ({ id: item.id, url: item.url }));
}
