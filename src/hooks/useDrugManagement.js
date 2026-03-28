import { useState, useCallback } from 'react';

const STORAGE_KEY = 'drugwise_drugs';

const DEFAULT_DRUGS = [
  {
    id: '1',
    name: 'Amlodipine 5mg',
    dosage: '1 tablet/day',
    schedule: '7:00 AM daily',
    status: 'active',
    notes: 'For high blood pressure',
  },
  {
    id: '2',
    name: 'Glucophage 500mg',
    dosage: '2 tablets/day',
    schedule: '8:00 AM and 8:00 PM',
    status: 'warning',
    notes: 'Supply running low — refill by Oct 5',
  },
  {
    id: '3',
    name: 'Ibuprofen 400mg',
    dosage: 'As needed',
    schedule: 'With food',
    status: 'info',
    notes: 'Moderate interaction with Glucophage — use with caution',
  },
];

function saveToStorage(drugs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drugs));
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : DEFAULT_DRUGS;
    }
    // First ever load — seed defaults and persist them
    saveToStorage(DEFAULT_DRUGS);
    return DEFAULT_DRUGS;
  } catch {
    return DEFAULT_DRUGS;
  }
}

export default function useDrugManagement() {
  const [drugs, setDrugs] = useState(loadFromStorage);

  const persist = (next) => {
    setDrugs(next);
    saveToStorage(next);
  };

  const addDrug = useCallback(
    (name, dosage, schedule, status = 'active', notes = '') => {
      const drug = { id: `drug-${Date.now()}`, name, dosage, schedule, status, notes };
      persist([...drugs, drug]);
    },
    [drugs],
  );

  const deleteDrug = useCallback(
    (id) => {
      persist(drugs.filter((d) => d.id !== id));
    },
    [drugs],
  );

  const updateDrug = useCallback(
    (id, fields) => {
      persist(drugs.map((d) => (d.id === id ? { ...d, ...fields } : d)));
    },
    [drugs],
  );

  return { drugs, addDrug, deleteDrug, updateDrug };
}
