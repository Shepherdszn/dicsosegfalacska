const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface Props {
  activeLetters: Set<string>;
  onSelect: (letter: string) => void;
}

export default function AzStrip({ activeLetters, onSelect }: Props) {
  return (
    <div className="px-4 md:px-12 pb-5 flex flex-wrap gap-1.5 text-xs text-muted">
      {LETTERS.map((letter) => {
        const isHot = activeLetters.has(letter);
        return (
          <span
            key={letter}
            onClick={() => onSelect(letter)}
            className={`w-6 h-6 rounded-lg flex items-center justify-center border cursor-pointer transition-all
              ${
                isHot
                  ? "bg-accent text-white border-accent"
                  : "bg-card border-border hover:border-accent"
              }`}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
}
