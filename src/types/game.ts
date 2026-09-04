export type GameStatus = "played" | "planned" | "not_played";

export interface Game {
  id: string;
  name: string;
  status: GameStatus;
  rating: number;
  hoursPlayed: number | null;
  note: string;
  logoUrl: string | null;
  coverUrl: string | null;
  genreTags: string[];
  dateAdded: string;
}

export const STATUS_LABELS: Record<GameStatus, string> = {
  played: "Kijátszva",
  planned: "Tervezem",
  not_played: "Nem játszottam"
};

export const STATUS_ICONS: Record<GameStatus, string> = {
  played: "✔",
  planned: "⏳",
  not_played: "✖"
};
