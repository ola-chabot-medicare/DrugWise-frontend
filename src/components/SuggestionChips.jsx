const suggestions = [
  "What drugs interact with Ibuprofen?",
  "What is Amlodipine used for?",
  "What are common side effects of Metformin?",
];

export default function SuggestionChips({ onSelect }) {
  return (
    <div className="mt-6 w-full max-w-2xl">
      <p className="text-center text-sm text-slate-400 mb-3">Suggestions on what to ask our AI</p>
      <div className="flex gap-3 justify-center flex-wrap">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelect(s)}
            className="border border-slate-200 rounded-xl px-5 py-3 text-base text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition text-left shadow-sm max-w-xs"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
