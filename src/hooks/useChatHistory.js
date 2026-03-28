import { useState, useCallback, useRef } from 'react';

const STORAGE_KEY = 'drugwise_chat_history';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(sessions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export default function useChatHistory() {
  const [sessions, setSessions] = useState(loadFromStorage);
  const [activeSessionId, setActiveSessionId] = useState(null);

  // useRef always holds the latest sessions — avoids stale closures
  const sessionsRef = useRef(sessions);
  sessionsRef.current = sessions;

  const persist = useCallback((updater) => {
    setSessions((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveToStorage(next);
      sessionsRef.current = next;
      return next;
    });
  }, []);

  const createSession = useCallback((firstMessageText) => {
    const id = `session-${Date.now()}`;
    const title = firstMessageText
      ? firstMessageText.slice(0, 35) + (firstMessageText.length > 35 ? '...' : '')
      : 'New chat';
    const session = {
      id,
      title,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    persist((prev) => [session, ...prev]);
    setActiveSessionId(id);
    return id;
  }, [persist]);

  const saveSession = useCallback(
    (id, messages) => {
      persist((prev) => {
        const exists = prev.some((s) => s.id === id);
        if (!exists) return prev;

        const firstUserMsg = messages.find((m) => m.isUser);
        const next = prev.map((s) => {
          if (s.id !== id) return s;
          const title = firstUserMsg
            ? firstUserMsg.text.slice(0, 35) + (firstUserMsg.text.length > 35 ? '...' : '')
            : s.title;
          return { ...s, messages, title, updatedAt: new Date().toISOString() };
        });
        // Sort by updatedAt descending
        next.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        return next;
      });
    },
    [persist],
  );

  const deleteSession = useCallback(
    (id) => {
      persist((prev) => prev.filter((s) => s.id !== id));
      setActiveSessionId((prevId) => (prevId === id ? null : prevId));
    },
    [persist],
  );

  const loadSession = useCallback(
    (id) => {
      const session = sessionsRef.current.find((s) => s.id === id);
      if (session) {
        setActiveSessionId(id);
        return session.messages;
      }
      return null;
    },
    [],
  );

  const clearAll = useCallback(() => {
    persist([]);
    setActiveSessionId(null);
  }, [persist]);

  // Sorted by updatedAt desc
  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  );

  return {
    sessions: sortedSessions,
    activeSessionId,
    setActiveSessionId,
    createSession,
    saveSession,
    deleteSession,
    loadSession,
    clearAll,
  };
}

