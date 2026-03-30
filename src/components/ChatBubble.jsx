import MessageActions from './MessageActions';
import DrugWiseLogo from '../assets/DrugWiseLogo';

function parseBold(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function parseMarkdown(text) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('### ')) {
      return <h3 key={i} className="font-semibold text-slate-800 mt-2 mb-0.5 text-base">{parseBold(line.slice(4))}</h3>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={i} className="font-semibold text-slate-900 text-lg mt-3 mb-1">{parseBold(line.slice(3))}</h2>;
    }
    if (line.startsWith('# ')) {
      return <h1 key={i} className="font-bold text-slate-900 text-xl mt-3 mb-1">{parseBold(line.slice(2))}</h1>;
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return (
        <div key={i} className="flex gap-1.5 text-base text-slate-700">
          <span
            className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)' }}
          />
          <span>{parseBold(line.slice(2))}</span>
        </div>
      );
    }
    if (/^\d+\. /.test(line)) {
      const num = line.match(/^(\d+)\. /)[1];
      const content = line.replace(/^\d+\. /, '');
      return (
        <div key={i} className="flex gap-1.5 text-base text-slate-700">
          <span
            className="flex-shrink-0 font-semibold text-sm"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            {num}.
          </span>
          <span>{parseBold(content)}</span>
        </div>
      );
    }
    // Sub-bullet
    if (/^\s+[-·•]\s/.test(line)) {
      return (
        <div key={i} className="flex gap-1.5 text-sm text-slate-600 ml-5">
          <span className="text-blue-300 flex-shrink-0">◦</span>
          <span>{parseBold(line.trim().slice(2))}</span>
        </div>
      );
    }
    if (line === '') {
      return <div key={i} className="h-1.5" />;
    }
    return <p key={i} className="text-base text-slate-700">{parseBold(line)}</p>;
  });
}

export default function ChatBubble({ message, isUser, onRegenerate, isError }) {
  if (isUser) {
    return (
      <div className="flex flex-col items-end gap-1 animate-message-user">
        <span className="text-xs text-slate-400 mr-1">Me</span>
        <div
          className="rounded-2xl px-4 py-3 max-w-lg shadow-md"
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 60%, #14b8a6 100%)' }}
        >
          <p className="text-white text-base">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 animate-message-bot">
      {/* Bot avatar — vibrant gradient ring */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 p-1.5 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 50%, #14b8a6 100%)' }}
      >
        <DrugWiseLogo size={32} />
      </div>
      <div className="flex-1 max-w-2xl">
        <div
          className={`rounded-2xl shadow-sm px-4 py-3 space-y-0.5 ${
            isError || message.isError
              ? 'bg-rose-50 border border-rose-200'
              : 'bg-white/85 backdrop-blur border border-white/60'
          }`}
        >
          {parseMarkdown(message.text)}
        </div>
        <MessageActions message={message.text} onRegenerate={onRegenerate} />
      </div>
    </div>
  );
}
