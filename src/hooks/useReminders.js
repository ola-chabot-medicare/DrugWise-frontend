import { useState, useCallback } from 'react';

const STORAGE_KEY = 'drugwise_reminders';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(reminders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}

export default function useReminders() {
  const [reminders, setReminders] = useState(loadFromStorage);

  const persist = (next) => {
    setReminders(next);
    saveToStorage(next);
  };

  const addReminder = useCallback(
    (text, time, color = 'green') => {
      const reminder = {
        id: `rem-${Date.now()}`,
        text,
        time,
        color,
      };
      persist([...reminders, reminder]);
    },
    [reminders],
  );

  const deleteReminder = useCallback(
    (id) => {
      persist(reminders.filter((r) => r.id !== id));
    },
    [reminders],
  );

  const updateReminder = useCallback(
    (id, fields) => {
      persist(reminders.map((r) => (r.id === id ? { ...r, ...fields } : r)));
    },
    [reminders],
  );

  return { reminders, addReminder, deleteReminder, updateReminder };
}
