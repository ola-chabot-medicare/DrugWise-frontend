import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import DrugWiseLogo from '../assets/DrugWiseLogo';
import UserProfileCard from '../components/UserProfileCard';
import RightSidebar from '../components/RightSidebar';
import ChatBubble from '../components/ChatBubble';
import ChatInput from '../components/ChatInput';
import TypingIndicator from '../components/TypingIndicator';
import SuggestionChips from '../components/SuggestionChips';
import { sendMessage, checkHealth } from '../api/client';
import useChatHistory from '../hooks/useChatHistory';
import useReminders from '../hooks/useReminders';
import useDrugManagement from '../hooks/useDrugManagement';

const INITIAL_MESSAGE = {
  id: 'init',
  text: "Hi! I'm DrugWise, your FDA-powered drug information assistant.\nAsk me about drug dosages, interactions, side effects,\nor general medication questions.",
  isUser: false,
};

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [healthWarn, setHealthWarn] = useState(null);
  const messagesEndRef = useRef(null);

  // Hooks
  const chatHistory = useChatHistory();
  const { reminders, addReminder, deleteReminder, updateReminder } = useReminders();
  const { drugs, addDrug, deleteDrug } = useDrugManagement();

  // Derive display messages directly from the active session.
  // This means selecting a session (just a setActiveSessionId call) is enough
  // to update the chat area — no manual setMessages sync needed.
  const sessionMessages = chatHistory.currentMessages;
  const messages = [
    ...(sessionMessages.length > 0 ? sessionMessages : [INITIAL_MESSAGE]),
    ...(healthWarn ? [healthWarn] : []),
  ];
  const hasUserMessages = messages.some((m) => m.isUser);

  // Auto-scroll to latest message
  useEffect(() => {
    if (hasUserMessages) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sessionMessages, isLoading, hasUserMessages]);

  // Health check on mount
  useEffect(() => {
    checkHealth().catch(() => {
      setHealthWarn({
        id: 'health-warn',
        text: "Could not connect to the DrugWise backend.\nPlease start the backend server with: uvicorn main:app --reload",
        isUser: false,
        isError: true,
      });
    });
  }, []);

  // Extract the answer from the backend StandardResponse
  const extractReply = (data) => {
    if (data?.status === 'error') {
      return data?.message || 'An error occurred on the server.';
    }
    return (
      data?.data?.answer ??
      data?.response ??
      data?.message ??
      'No response received.'
    );
  };

  const handleSend = async (text) => {
    if (!text?.trim() || isLoading) return;
    const trimmed = text.trim();
    const userMsg = { id: `u-${Date.now()}`, text: trimmed, isUser: true };

    // Create session on first user message if none active
    let sessionId = chatHistory.activeSessionId;
    if (!sessionId) {
      sessionId = chatHistory.createSession(trimmed);
    }

    // Build the message list; include INITIAL_MESSAGE when session was empty
    const base = chatHistory.currentMessages.length > 0
      ? chatHistory.currentMessages
      : [INITIAL_MESSAGE];
    const nextMessages = [...base, userMsg];
    chatHistory.saveSession(sessionId, nextMessages);
    setIsLoading(true);

    try {
      const data = await sendMessage(trimmed);
      const botMsg = { id: `b-${Date.now()}`, text: extractReply(data), isUser: false };
      chatHistory.saveSession(sessionId, [...nextMessages, botMsg]);
    } catch (err) {
      const errMsg = {
        id: `b-${Date.now()}`,
        text:
          err.message ||
          "Sorry, I'm having trouble connecting right now.\nPlease make sure the backend is running on port 8000.",
        isUser: false,
        isError: true,
      };
      chatHistory.saveSession(sessionId, [...nextMessages, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    const msgs = chatHistory.currentMessages;
    const userMessages = msgs.filter((m) => m.isUser);
    if (!userMessages.length) return;
    const lastUserText = userMessages[userMessages.length - 1].text;
    const sessionId = chatHistory.activeSessionId;
    if (!sessionId) return;

    // Remove the last bot message
    const withoutLastBot = [...msgs];
    for (let i = withoutLastBot.length - 1; i >= 0; i--) {
      if (!withoutLastBot[i].isUser) {
        withoutLastBot.splice(i, 1);
        break;
      }
    }
    chatHistory.saveSession(sessionId, withoutLastBot);

    setIsLoading(true);
    try {
      const data = await sendMessage(lastUserText);
      chatHistory.saveSession(sessionId, [
        ...withoutLastBot,
        { id: `b-${Date.now()}`, text: extractReply(data), isUser: false },
      ]);
    } catch (err) {
      chatHistory.saveSession(sessionId, [
        ...withoutLastBot,
        {
          id: `b-${Date.now()}`,
          text:
            err.message ||
            "Sorry, I'm having trouble connecting right now.\nPlease make sure the backend is running on port 8000.",
          isUser: false,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    chatHistory.setActiveSessionId(null);
    setSearchQuery('');
  };

  // A single state update is all that's needed — React re-renders and
  // currentMessages automatically reflects the chosen session's messages.
  const handleSelectSession = (id) => {
    chatHistory.setActiveSessionId(id);
  };

  const handleDeleteSession = (id) => {
    const remaining = chatHistory.sessions.filter((s) => s.id !== id);
    chatHistory.deleteSession(id);
    if (id === chatHistory.activeSessionId) {
      const nextId = remaining.length > 0 ? remaining[0].id : null;
      chatHistory.setActiveSessionId(nextId);
    }
  };

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdf4 50%, #eff6ff 100%)' }}
    >
      {/* ── LEFT SIDEBAR ── */}
      <div className="w-96 glass-card border-0 border-r border-white/60 flex flex-col p-5 overflow-y-auto flex-shrink-0">
        <UserProfileCard drugs={drugs} addDrug={addDrug} deleteDrug={deleteDrug} />
      </div>

      {/* ── CENTER PANEL ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Search bar */}
        <div className="px-6 pt-4 pb-3 flex-shrink-0">
          <div className="gradient-ring rounded-full flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-white/70 rounded-full px-5 py-3.5 shadow-sm focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] transition-all duration-200">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="flex-1 text-base outline-none text-slate-700 placeholder-slate-400 bg-transparent"
            />
            <Search className="w-5 h-5 text-blue-400 flex-shrink-0" />
          </div>
        </div>

        {/* Message area */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 space-y-4">
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg}
                isUser={msg.isUser}
                isError={msg.isError}
                onRegenerate={handleRegenerate}
              />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {!hasUserMessages && (
            <div className="flex flex-col items-center px-6 pb-8">
              {/* Glowing halo behind logo */}
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse"
                  style={{ background: 'radial-gradient(circle, #3b82f6 0%, #14b8a6 60%, transparent 100%)', transform: 'scale(1.8)' }}
                />
                <div className="animate-float relative z-10">
                  <DrugWiseLogo size={72} />
                </div>
              </div>
              <p className="text-2xl font-semibold text-gradient mt-5">
                Ask DrugWise anything...
              </p>
              <div
                className="w-20 h-0.5 mx-auto my-4 rounded-full animate-gradient-shift"
                style={{ background: 'linear-gradient(90deg, #3b82f6, #14b8a6, #8b5cf6, #3b82f6)', backgroundSize: '200% 100%' }}
              />
              <SuggestionChips onSelect={handleSend} />
            </div>
          )}
        </div>

        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>

      {/* ── RIGHT SIDEBAR ── */}
      <RightSidebar
        onNewChat={handleNewChat}
        sessions={chatHistory.sessions}
        activeSessionId={chatHistory.activeSessionId}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        reminders={reminders}
        addReminder={addReminder}
        deleteReminder={deleteReminder}
        updateReminder={updateReminder}
      />
    </div>
  );
}
