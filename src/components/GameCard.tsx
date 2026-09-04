import { motion } from "framer-motion";
import { Game, STATUS_ICONS, STATUS_LABELS } from "../types/game";

const badgeStyles: Record<string, string> = {
  played: "bg-played/15 text-played border-played",
  planned: "bg-planned/15 text-planned border-planned",
  not_played: "bg-dropped/15 text-dropped border-dropped"
};

const progressColor: Record<string, string> = {
  played: "from-accent to-accent2",
  planned: "from-planned to-yellow-300",
  not_played: "from-dropped to-red-800"
};

interface Props {
  game: Game;
  index: number;
  onClick: () => void;
}

export default function GameCard({ game, index, onClick }: Props) {
  const progress = game.status === "played" ? 100 : game.status === "not_played" ? 25 : 0;
  const stars = "★".repeat(game.rating) + "☆".repeat(5 - game.rating);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.6) }}
      whileHover={{ y: -6, scale: 1.015 }}
      onClick={onClick}
      className="bg-gradient-to-br from-card to-bg2 border border-border rounded-xl2 overflow-hidden cursor-pointer relative hover:border-accent hover:shadow-[0_18px_40px_rgba(124,92,255,0.25)] transition-shadow"
    >
      <div
        className="h-32 relative flex items-end p-3.5 bg-cover bg-center"
        style={{
          backgroundImage: game.coverUrl
            ? `url(${game.coverUrl})`
            : "linear-gradient(135deg, #2b2f77, #101425)"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/85" />
        <span
          className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${badgeStyles[game.status]}`}
        >
          {STATUS_ICONS[game.status]} {STATUS_LABELS[game.status]}
        </span>
        <div className="relative z-10 font-extrabold text-[17px] drop-shadow-lg">
          {game.name}
        </div>
      </div>

      <div className="p-4">
        <div className={`text-gold text-[13px] tracking-widest mb-2 ${game.rating === 0 ? "opacity-30" : ""}`}>
          {stars}
        </div>
        <div className="flex justify-between items-center text-[12.5px] text-muted mb-1.5">
          <span>{game.status === "planned" ? "Becsült idő" : "Játékidő"}</span>
          <b className="text-text font-semibold">
            {game.hoursPlayed ? `${game.hoursPlayed} óra` : "—"}
          </b>
        </div>
        <div className="h-1.5 rounded-md bg-white/5 overflow-hidden mt-2.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-md bg-gradient-to-r ${progressColor[game.status]}`}
          />
        </div>
        {game.note && (
          <div className="text-xs text-muted bg-white/[0.03] border border-dashed border-border rounded-lg px-2.5 py-2 mt-2.5 leading-relaxed line-clamp-3">
            {game.note}
          </div>
        )}
      </div>
    </motion.div>
  );
}
