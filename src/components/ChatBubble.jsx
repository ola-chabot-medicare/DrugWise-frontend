import MessageActions from './MessageActions';

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
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
          <span>{parseBold(line.slice(2))}</span>
        </div>
      );
    }
    if (/^\d+\. /.test(line)) {
      const num = line.match(/^(\d+)\. /)[1];
      const content = line.replace(/^\d+\. /, '');
      return (
        <div key={i} className="flex gap-1.5 text-base text-slate-700">
          <span className="text-slate-500 flex-shrink-0 font-medium">{num}.</span>
          <span>{parseBold(content)}</span>
        </div>
      );
    }
    // Sub-bullet: starts with spaces then - or ·
    if (/^\s+[-·•]\s/.test(line)) {
      return (
        <div key={i} className="flex gap-1.5 text-sm text-slate-600 ml-5">
          <span className="text-slate-300 flex-shrink-0">◦</span>
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
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-slate-400 mr-1">Me</span>
        <div className="bg-blue-50 rounded-xl px-4 py-3 max-w-lg">
          <p className="text-slate-700 text-base">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <div className="flex-1 max-w-2xl">
        <div className={`rounded-xl shadow-sm px-4 py-3 space-y-0.5 ${isError || message.isError ? 'bg-red-50 border border-red-200' : 'bg-white'}`}>
          {parseMarkdown(message.text)}
        </div>
        <MessageActions message={message.text} onRegenerate={onRegenerate} />
      </div>
    </div>
  );
}
