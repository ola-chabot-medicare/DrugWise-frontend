const suggestions = [
  "What drugs interact with Ibuprofen?",
  "What is Amlodipine used for?",
  "What are common side effects of Metformin?",
];

// Gradient palette for each chip
const CHIP_GRADIENTS = [
  { border: '#3b82f6', bg: 'rgba(59,130,246,0.08)', text: '#1d4ed8', hover: 'rgba(59,130,246,0.15)' },
  { border: '#0ea5e9', bg: 'rgba(14,165,233,0.08)', text: '#0369a1', hover: 'rgba(14,165,233,0.15)' },
  { border: '#14b8a6', bg: 'rgba(20,184,166,0.08)', text: '#0f766e', hover: 'rgba(20,184,166,0.15)' },
];

export default function SuggestionChips({ onSelect }) {
  return (
    <div className="mt-6 w-full max-w-2xl">
      <p className="text-center text-sm font-medium text-slate-400 mb-4">
        Suggestions on what to ask our AI
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        {suggestions.map((s, i) => {
          const g = CHIP_GRADIENTS[i % CHIP_GRADIENTS.length];
          return (
            <button
              key={i}
              onClick={() => onSelect(s)}
              style={{
                animationDelay: `${i * 80}ms`,
                borderColor: g.border,
                background: g.bg,
                color: g.text,
              }}
              className="border rounded-xl px-5 py-3 text-sm font-medium hover:scale-[1.03] hover:shadow-lg transition-all duration-150 cursor-pointer text-left shadow-sm max-w-xs opacity-0 animate-fade-in-up backdrop-blur-sm"
              onMouseEnter={(e) => { e.currentTarget.style.background = g.hover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = g.bg; }}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}
