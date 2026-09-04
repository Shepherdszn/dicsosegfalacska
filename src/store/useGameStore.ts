import { create } from "zustand";
import { Game } from "../types/game";
import { sampleGames } from "../data/sampleGames";

const STORAGE_KEY = "dicsosegfal_games_v1";

function loadGames(): Game[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Nem sikerült betölteni a mentett adatokat:", e);
  }
  return sampleGames;
}

function saveGames(games: Game[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
}

interface GameStore {
  games: Game[];
  addGame: (game: Game) => void;
  updateGame: (id: string, patch: Partial<Game>) => void;
  removeGame: (id: string) => void;
  exportJson: () => string;
  importJson: (json: string) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  games: loadGames(),

  addGame: (game) => {
    const next = [...get().games, game];
    saveGames(next);
    set({ games: next });
  },

  updateGame: (id, patch) => {
    const next = get().games.map((g) => (g.id === id ? { ...g, ...patch } : g));
    saveGames(next);
    set({ games: next });
  },

  removeGame: (id) => {
    const next = get().games.filter((g) => g.id !== id);
    saveGames(next);
    set({ games: next });
  },

  exportJson: () => JSON.stringify(get().games, null, 2),

  importJson: (json) => {
    try {
      const parsed = JSON.parse(json) as Game[];
      saveGames(parsed);
      set({ games: parsed });
    } catch (e) {
      alert("Hibás JSON fájl formátum.");
    }
  }
}));
