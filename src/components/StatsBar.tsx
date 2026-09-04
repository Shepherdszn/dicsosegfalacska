import { Game } from "../types/game";

export default function StatsBar({ games }: { games: Game[] }) {
  const played = games.filter((g) => g.status === "played");
  const planned = games.filter((g) => g.status === "planned");
  const totalHours = games.reduce((sum, g) => sum + (g.hoursPlayed ?? 0), 0);
  const rated = played.filter((g) => g.rating > 0);
  const avgRating =
    rated.length > 0
      ? (rated.reduce((sum, g) => sum + g.rating, 0) / rated.length).toFixed(1)
      : "0.0";

  const stats = [
    { label: "Kijátszott játék", value: played.length, color: "text-played" },
    { label: "Tervezett játék", value: planned.length, color: "text-planned" },
    { label: "Összes óra", value: totalHours.toLocaleString("hu-HU"), color: "text-accent" },
    { label: "Átlag értékelés", value: `${avgRating}★`, color: "text-gold" }
  ];

  return (
    <div className="mx-4 md:mx-12 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex-1 min-w-[140px] bg-card border border-border rounded-2xl p-4"
        >
          <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
          <div className="text-xs text-muted mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
