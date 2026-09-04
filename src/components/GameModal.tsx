import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Game, GameStatus, STATUS_LABELS } from "../types/game";

interface Props {
  game: Game | null;
  onClose: () => void;
  onSave: (game: Game) => void;
  onDelete: (id: string) => void;
}

const emptyGame = (): Game => ({
  id: crypto.randomUUID(),
  name: "",
  status: "planned",
  rating: 0,
  hoursPlayed: null,
  note: "",
  logoUrl: null,
  coverUrl: null,
  genreTags: [],
  dateAdded: new Date().toISOString()
});

export default function GameModal({ game, onClose, onSave, onDelete }: Props) {
  const [form, setForm] = useState<Game>(game ?? emptyGame());

  useEffect(() => {
    setForm(game ?? emptyGame());
  }, [game]);

  const isNew = !game;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-bg2 border border-border rounded-xl2 w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-lg font-bold mb-4">
            {isNew ? "Új játék hozzáadása" : "Játék szerkesztése"}
          </h2>

          <label className="block text-xs text-muted mb-1">Játék neve</label>
          <input
            className="w-full bg-card border border-border rounded-lg px-3 py-2 mb-4 text-sm outline-none focus:border-accent"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="pl. Elden Ring"
          />

          <label className="block text-xs text-muted mb-1">Állapot</label>
          <div className="flex gap-2 mb-4">
            {(Object.keys(STATUS_LABELS) as GameStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setForm({ ...form, status: s })}
                className={`flex-1 px-3 py-2 rounded-lg text-xs border transition-all ${
                  form.status === s
                    ? "bg-accent text-white border-accent"
                    : "bg-card text-muted border-border"
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>

          <label className="block text-xs text-muted mb-1">Értékelés (1-5)</label>
          <div className="flex gap-1 mb-4 text-2xl">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onClick={() => setForm({ ...form, rating: n === form.rating ? 0 : n })}
                className={`cursor-pointer ${n <= form.rating ? "text-gold" : "text-border"}`}
              >
                ★
              </span>
            ))}
          </div>

          <label className="block text-xs text-muted mb-1">
            {form.status === "planned" ? "Becsült játékidő (óra)" : "Kijátszáshoz szükséges óra"}
          </label>
          <input
            type="number"
            min={0}
            className="w-full bg-card border border-border rounded-lg px-3 py-2 mb-4 text-sm outline-none focus:border-accent"
            value={form.hoursPlayed ?? ""}
            onChange={(e) =>
              setForm({ ...form, hoursPlayed: e.target.value ? Number(e.target.value) : null })
            }
            placeholder="pl. 45"
          />

          <label className="block text-xs text-muted mb-1">Megjegyzés</label>
          <textarea
            className="w-full bg-card border border-border rounded-lg px-3 py-2 mb-5 text-sm outline-none focus:border-accent resize-none"
            rows={3}
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="Saját gondolatok, tippek, emlékek..."
          />

          <div className="flex gap-2">
            <button
              onClick={() => {
                if (!form.name.trim()) {
                  alert("Add meg a játék nevét!");
                  return;
                }
                onSave(form);
              }}
              className="flex-1 bg-accent text-white rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition"
            >
              Mentés
            </button>
            {!isNew && (
              <button
                onClick={() => onDelete(form.id)}
                className="px-4 rounded-lg border border-dropped text-dropped text-sm hover:bg-dropped/10 transition"
              >
                Törlés
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 rounded-lg border border-border text-muted text-sm hover:border-accent transition"
            >
              Mégse
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
