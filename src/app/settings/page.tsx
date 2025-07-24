'use client';

import { useEffect, useState } from 'react';

const MODELS = ['gpt-4o', 'gpt-4', 'gpt-3.5-turbo'];

export default function SettingsPage() {
  const [model, setModel] = useState('gpt-4o');

  useEffect(() => {
    const saved = localStorage.getItem('selected-model');
    if (saved && MODELS.includes(saved)) {
      setModel(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selected-model', model);
  }, [model]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">⚙️ Settings</h1>

      <div className="space-y-2">
        <label htmlFor="model" className="block text-sm font-medium">
          Select AI Model:
        </label>
        <select
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {MODELS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

