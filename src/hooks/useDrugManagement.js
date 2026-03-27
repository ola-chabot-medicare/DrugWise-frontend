import { useState, useCallback } from 'react';

const STORAGE_KEY = 'drugwise_drugs';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(drugs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drugs));
}

export default function useDrugManagement() {
  const [drugs, setDrugs] = useState(loadFromStorage);

  const persist = (next) => {
    setDrugs(next);
    saveToStorage(next);
  };

  const addDrug = useCallback(
    (name, dosage, schedule, status = 'active', notes = '') => {
      const drug = {
        id: `drug-${Date.now()}`,
        name,
        dosage,
        schedule,
        status,
        notes,
      };
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
