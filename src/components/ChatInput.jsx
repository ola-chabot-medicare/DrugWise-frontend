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
    <div className="border-t border-slate-100 bg-white px-6 py-4 flex-shrink-0">
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2.5 shadow-sm focus-within:border-blue-300 transition">
        <button className="text-slate-400 hover:text-slate-600 transition flex-shrink-0" tabIndex={-1}>
          <Paperclip className="w-4 h-4" />
        </button>
        <button className="text-slate-400 hover:text-slate-600 transition flex-shrink-0" tabIndex={-1}>
          <Image className="w-4 h-4" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything...."
          disabled={isLoading}
          className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-400 bg-transparent disabled:opacity-60"
        />
        <button className="text-slate-400 hover:text-slate-600 transition flex-shrink-0" tabIndex={-1}>
          <Mic className="w-4 h-4" />
        </button>
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition flex-shrink-0 ${
            canSend
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-sm'
              : 'bg-slate-200 text-slate-400 opacity-50 cursor-not-allowed'
          }`}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
