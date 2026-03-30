import DrugWiseLogo from '../assets/DrugWiseLogo';

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 p-1.5 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 50%, #14b8a6 100%)' }}
      >
        <DrugWiseLogo size={32} />
      </div>
      <div className="bg-white rounded-xl shadow-sm px-4 py-3.5">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 bg-slate-400 rounded-full inline-block animate-bounce-dot"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
