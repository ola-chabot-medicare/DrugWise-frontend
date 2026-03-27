import { Copy, Check, RefreshCw, Share2, Bookmark } from 'lucide-react';
import { useState } from 'react';

export default function MessageActions({ message, onRegenerate }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-0.5 mt-1.5 ml-1">
      <button
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy'}
        className={`p-1.5 rounded-lg transition ${copied ? 'text-green-500' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      <button
        onClick={onRegenerate}
        title="Regenerate"
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
      >
        <RefreshCw className="w-3.5 h-3.5" />
      </button>
      <button title="Share" className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition">
        <Share2 className="w-3.5 h-3.5" />
      </button>
      <button title="Bookmark" className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition">
        <Bookmark className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
