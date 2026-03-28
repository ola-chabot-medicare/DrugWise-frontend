import { useState, useCallback } from 'react';

const STORAGE_KEY = 'drugwise_reminders';

const DEFAULT_REMINDERS = [
  { id: '1', text: "It's time for your Amlodipine 5mg dose.", time: '7:00 AM', color: 'green' },
  { id: '2', text: 'Take Metformin 500mg with breakfast.', time: '8:00 AM', color: 'green' },
  { id: '3', text: 'Blood pressure check reminder.', time: '12:00 PM', color: 'green' },
  { id: '4', text: 'Evening medication: Lisinopril 10mg.', time: '8:00 PM', color: 'green' },
];

function saveToStorage(reminders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : DEFAULT_REMINDERS;
    }
    // First ever load — seed defaults and persist them
    saveToStorage(DEFAULT_REMINDERS);
    return DEFAULT_REMINDERS;
  } catch {
    return DEFAULT_REMINDERS;
  }
}

export default function useReminders() {
  const [reminders, setReminders] = useState(loadFromStorage);

  const persist = (next) => {
    setReminders(next);
    saveToStorage(next);
  };

  const addReminder = useCallback(
    (text, time, color = 'green') => {
      const reminder = { id: `rem-${Date.now()}`, text, time, color };
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
