import { useState, useRef, useEffect, useCallback } from 'react';
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
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  // Hooks
  const chatHistory = useChatHistory();
  const { reminders, addReminder, deleteReminder } = useReminders();
  const { drugs, addDrug, deleteDrug } = useDrugManagement();

  const hasUserMessages = messages.some((m) => m.isUser);

  // Auto-scroll to latest message
  useEffect(() => {
    if (hasUserMessages) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, hasUserMessages]);

  // Health check on mount
  useEffect(() => {
    checkHealth().catch(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: 'health-warn',
          text: "Could not connect to the DrugWise backend.\nPlease start the backend server with: uvicorn main:app --reload",
          isUser: false,
          isError: true,
        },
      ]);
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

  // Save messages to chat history whenever they change
  const saveCurrentSession = useCallback(
    (updatedMessages) => {
      if (chatHistory.activeSessionId) {
        chatHistory.saveSession(chatHistory.activeSessionId, updatedMessages);
      }
    },
    [chatHistory.activeSessionId, chatHistory.saveSession],
  );

  const handleSend = async (text) => {
    if (!text?.trim() || isLoading) return;
    const trimmed = text.trim();
    const userMsg = { id: `u-${Date.now()}`, text: trimmed, isUser: true };

    // Create session on first user message if none active
    let sessionId = chatHistory.activeSessionId;
    if (!sessionId) {
      sessionId = chatHistory.createSession(trimmed);
    }

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setIsLoading(true);

    // Save with user message immediately
    chatHistory.saveSession(sessionId, nextMessages);

    try {
      const data = await sendMessage(trimmed);
      const botMsg = { id: `b-${Date.now()}`, text: extractReply(data), isUser: false };
      const updatedMessages = [...nextMessages, botMsg];
      setMessages(updatedMessages);
      chatHistory.saveSession(sessionId, updatedMessages);
    } catch (err) {
      const errMsg = {
        id: `b-${Date.now()}`,
        text:
          err.message ||
          "Sorry, I'm having trouble connecting right now.\nPlease make sure the backend is running on port 8000.",
        isUser: false,
        isError: true,
      };
      const updatedMessages = [...nextMessages, errMsg];
      setMessages(updatedMessages);
      chatHistory.saveSession(sessionId, updatedMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    const userMessages = messages.filter((m) => m.isUser);
    if (!userMessages.length) return;
    const lastUserText = userMessages[userMessages.length - 1].text;

    // Remove the last bot message
    setMessages((prev) => {
      const copy = [...prev];
      for (let i = copy.length - 1; i >= 0; i--) {
        if (!copy[i].isUser) {
          copy.splice(i, 1);
          break;
        }
      }
      return copy;
    });

    setIsLoading(true);
    try {
      const data = await sendMessage(lastUserText);
      setMessages((prev) => {
        const updated = [
          ...prev,
          { id: `b-${Date.now()}`, text: extractReply(data), isUser: false },
        ];
        saveCurrentSession(updated);
        return updated;
      });
    } catch (err) {
      setMessages((prev) => {
        const updated = [
          ...prev,
          {
            id: `b-${Date.now()}`,
            text:
              err.message ||
              "Sorry, I'm having trouble connecting right now.\nPlease make sure the backend is running on port 8000.",
            isUser: false,
            isError: true,
          },
        ];
        saveCurrentSession(updated);
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    chatHistory.setActiveSessionId(null);
    setMessages([INITIAL_MESSAGE]);
    setSearchQuery('');
  };

  const handleSelectSession = (id) => {
    const loaded = chatHistory.loadSession(id);
    if (loaded && loaded.length > 0) {
      setMessages(loaded);
    } else {
      setMessages([INITIAL_MESSAGE]);
    }
  };

  const handleDeleteSession = (id) => {
    chatHistory.deleteSession(id);
    if (id === chatHistory.activeSessionId) {
      setMessages([INITIAL_MESSAGE]);
    }
  };

  return (
    <div className="flex h-full overflow-hidden bg-[#F0F4F9]">
      {/* ── LEFT SIDEBAR ── */}
      <div className="w-96 bg-white border-r border-gray-100 flex flex-col p-5 overflow-y-auto flex-shrink-0">
        <UserProfileCard drugs={drugs} addDrug={addDrug} deleteDrug={deleteDrug} />
      </div>

      {/* ── CENTER PANEL ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F0F4F9]">
        {/* Search bar */}
        <div className="px-6 pt-4 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2.5 shadow-sm focus-within:border-blue-300 transition">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-400 bg-transparent"
            />
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
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
              <div className="animate-float">
                <DrugWiseLogo size={64} />
              </div>
              <p className="text-2xl font-light text-gray-500 mt-4">
                Ask DrugWise anything...
              </p>
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto my-4 rounded-full" />
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
      />
    </div>
  );
}
