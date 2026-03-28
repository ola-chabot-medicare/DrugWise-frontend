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
    <div className="border-t border-slate-100 bg-white px-6 py-5 flex-shrink-0">
      <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm focus-within:border-blue-300 focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.08)] transition-all duration-200">
        <button className="text-slate-400 hover:text-slate-600 transition flex-shrink-0" tabIndex={-1}>
          <Paperclip className="w-5 h-5" />
        </button>
        <button className="text-slate-400 hover:text-slate-600 transition flex-shrink-0" tabIndex={-1}>
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
        <button className="text-slate-400 hover:text-slate-600 transition flex-shrink-0" tabIndex={-1}>
          <Mic className="w-5 h-5" />
        </button>
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
            canSend
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
