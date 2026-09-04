import { useMemo, useState } from "react";
import { useGameStore } from "./store/useGameStore";
import { Game, GameStatus } from "./types/game";
import StatsBar from "./components/StatsBar";
import AzStrip from "./components/AzStrip";
import FilterBar from "./components/FilterBar";
import GameCard from "./components/GameCard";
import GameModal from "./components/GameModal";

export default function App() {
  const { games, addGame, updateGame, removeGame, exportJson, importJson } = useGameStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<GameStatus | "all">("all");
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [modalGame, setModalGame] = useState<Game | null | undefined>(undefined);

  const allGenres = useMemo(() => {
    const set = new Set<string>();
    games.forEach((g) => g.genreTags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [games]);

  const activeLetters = useMemo(() => {
    return new Set(games.map((g) => g.name[0]?.toUpperCase()).filter(Boolean));
  }, [games]);

  const filtered = useMemo(() => {
    return games
      .filter((g) => (statusFilter === "all" ? true : g.status === statusFilter))
      .filter((g) => (genreFilter ? g.genreTags.includes(genreFilter) : true))
      .filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name, "hu"));
  }, [games, search, statusFilter, genreFilter]);

  const scrollToLetter = (letter: string) => {
    const el = document.getElementById(`letter-${letter}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSave = (game: Game) => {
    const exists = games.some((g) => g.id === game.id);
    if (exists) {
      updateGame(game.id, game);
    } else {
      addGame(game);
    }
    setModalGame(undefined);
  };

  const handleExport = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dicsosegfal_backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => importJson(reader.result as string);
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="min-h-screen text-text pb-16">
      <header className="px-4 md:px-12 pt-8 pb-4 flex items-center justify-between flex-wrap gap-4">
        <div className="text-2xl font-extrabold tracking-wide">
          Dicsőség<span className="text-accent2">fal</span>
        </div>
        <div className="flex gap-3 text-sm">
          <button
            onClick={() => setModalGame(null)}
            className="bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            + Új játék
          </button>
          <button
            onClick={handleExport}
            className="border border-border px-4 py-2 rounded-lg text-muted hover:border-accent transition"
          >
            Export
          </button>
          <button
            onClick={handleImportClick}
            className="border border-border px-4 py-2 rounded-lg text-muted hover:border-accent transition"
          >
            Import
          </button>
        </div>
      </header>

      <StatsBar games={games} />
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        genreFilter={genreFilter}
        onGenreChange={setGenreFilter}
        allGenres={allGenres}
      />
      <AzStrip activeLetters={activeLetters} onSelect={scrollToLetter} />

      <div className="px-4 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((game, i) => (
          <div key={game.id} id={`letter-${game.name[0]?.toUpperCase()}`}>
            <GameCard game={game} index={i} onClick={() => setModalGame(game)} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-muted mt-16">
          Nincs a szűrésnek megfelelő játék. Adj hozzá egyet a "+ Új játék" gombbal!
        </div>
      )}

      {modalGame !== undefined && (
        <GameModal
          game={modalGame}
          onClose={() => setModalGame(undefined)}
          onSave={handleSave}
          onDelete={(id) => {
            removeGame(id);
            setModalGame(undefined);
          }}
        />
      )}

      <footer className="text-center text-muted text-xs mt-16 pt-6 border-t border-border">
        Dicsőségfal — saját játék-archívum · fut Cloudflare Pages-en, 100% ingyenesen
      </footer>
    </div>
  );
}
