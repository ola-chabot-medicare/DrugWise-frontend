import { useState } from 'react';
import { Paperclip, Image, Mic, ArrowUp } from 'lucide-react';

export default function ChatInput({ onSend, isLoading }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = input.trim().length > 0 && !isLoading;

  return (
    <div className="border-t border-white/40 bg-white/60 backdrop-blur px-6 py-5 flex-shrink-0">
      <div className="flex items-center gap-3 bg-white/80 backdrop-blur border border-white/70 rounded-2xl px-5 py-4 shadow-sm focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] focus-within:border-blue-300/70 transition-all duration-200">
        <button className="text-slate-300 hover:text-blue-400 transition flex-shrink-0" tabIndex={-1}>
          <Paperclip className="w-5 h-5" />
        </button>
        <button className="text-slate-300 hover:text-blue-400 transition flex-shrink-0" tabIndex={-1}>
          <Image className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about any drug, dosage, or interaction..."
          disabled={isLoading}
          className="flex-1 text-base outline-none text-slate-700 placeholder-slate-400 bg-transparent disabled:opacity-60"
        />
        <button className="text-slate-300 hover:text-blue-400 transition flex-shrink-0" tabIndex={-1}>
          <Mic className="w-5 h-5" />
        </button>
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 shadow-sm ${
            canSend
              ? 'text-white hover:-translate-y-0.5 hover:shadow-blue-300/50 hover:shadow-md'
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'
          }`}
          style={canSend ? { background: 'linear-gradient(135deg, #3b82f6, #0ea5e9, #14b8a6)' } : {}}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
