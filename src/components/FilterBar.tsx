import { GameStatus } from "../types/game";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: GameStatus | "all";
  onStatusChange: (s: GameStatus | "all") => void;
  genreFilter: string | null;
  onGenreChange: (g: string | null) => void;
  allGenres: string[];
}

export default function FilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  genreFilter,
  onGenreChange,
  allGenres
}: Props) {
  const statusChips: { key: GameStatus | "all"; label: string }[] = [
    { key: "all", label: "Mind" },
    { key: "played", label: "Játszottam" },
    { key: "planned", label: "Tervezem" },
    { key: "not_played", label: "Nem fejeztem be" }
  ];

  return (
    <div className="px-4 md:px-12 pb-5 flex flex-col md:flex-row gap-4 md:items-center flex-wrap">
      <div className="flex-1 min-w-[260px] bg-card border border-border rounded-2xl px-4 py-3 flex items-center gap-2">
        <span>🔎</span>
        <input
          className="bg-transparent outline-none text-text w-full text-sm placeholder:text-muted"
          placeholder="Játék keresése..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {statusChips.map((chip) => (
          <div
            key={chip.key}
            onClick={() => onStatusChange(chip.key)}
            className={`px-4 py-2 rounded-full border text-xs cursor-pointer transition-all
              ${
                statusFilter === chip.key
                  ? "bg-accent text-white border-accent"
                  : "bg-card text-muted border-border hover:border-accent"
              }`}
          >
            {chip.label}
          </div>
        ))}
        {allGenres.map((genre) => (
          <div
            key={genre}
            onClick={() => onGenreChange(genreFilter === genre ? null : genre)}
            className={`px-4 py-2 rounded-full border text-xs cursor-pointer transition-all
              ${
                genreFilter === genre
                  ? "bg-accent text-white border-accent"
                  : "bg-card text-muted border-border hover:border-accent"
              }`}
          >
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
}
