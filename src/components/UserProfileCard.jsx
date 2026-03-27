import { useState } from 'react';
import { Phone, Mail, Calendar, MapPin, User, Users, X } from 'lucide-react';

const STATUS_COLORS = {
  active: 'bg-green-500',
  warning: 'bg-red-500',
  info: 'bg-yellow-500',
};

export default function UserProfileCard({ drugs, addDrug, deleteDrug }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', dosage: '', schedule: '', status: 'active' });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    addDrug(form.name.trim(), form.dosage.trim(), form.schedule.trim(), form.status);
    setForm({ name: '', dosage: '', schedule: '', status: 'active' });
    setShowForm(false);
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-4">
        {/* Avatar placeholder */}
        <div className="w-full h-36 bg-slate-100 rounded-xl mb-3 flex items-center justify-center">
          <User className="w-12 h-12 text-slate-300" />
        </div>

        <h3 className="font-semibold text-slate-800 text-base">Guest User</h3>

        <div className="flex items-center gap-3 mt-1.5 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>User</span>
          </div>
          <span className="text-slate-200">|</span>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>Patient</span>
          </div>
        </div>

        <div className="mt-3 space-y-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span>+-- --- ---</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span>user@example.com</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Age: --</span>
            </div>
            <span className="text-slate-200">|</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>Location</span>
            </div>
          </div>
        </div>
      </div>

      {/* Drug Management */}
      <div className="mt-5">
        <h3 className="font-semibold text-base text-slate-700 mb-3">Drug management</h3>

        {drugs.length === 0 ? (
          <p className="text-xs text-gray-400 italic text-center py-3">No medications tracked</p>
        ) : (
          <div className="space-y-1.5">
            {drugs.map((drug) => (
              <div key={drug.id} className="flex items-start gap-2 group">
                <span
                  className={`w-2 h-2 min-w-2 rounded-full ${STATUS_COLORS[drug.status] || 'bg-green-500'} flex-shrink-0 mt-1.5`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-700">
                    {drug.name}
                    {drug.dosage && <span className="text-slate-400"> — {drug.dosage}</span>}
                  </p>
                  {drug.schedule && (
                    <p className="text-xs text-gray-400">{drug.schedule}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteDrug(drug.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition flex-shrink-0 mt-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {showForm ? (
          <div className="mt-3 space-y-2 bg-white rounded-lg border border-slate-200 p-3">
            <input
              type="text"
              placeholder="Drug name (e.g. Amlodipine)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 transition"
            />
            <input
              type="text"
              placeholder="Dosage (e.g. 5mg daily)"
              value={form.dosage}
              onChange={(e) => setForm({ ...form, dosage: e.target.value })}
              className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 transition"
            />
            <input
              type="text"
              placeholder="Schedule (e.g. 7:00 AM)"
              value={form.schedule}
              onChange={(e) => setForm({ ...form, schedule: e.target.value })}
              className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 transition"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Status:</span>
              {[
                { key: 'active', color: 'bg-green-500' },
                { key: 'warning', color: 'bg-red-500' },
                { key: 'info', color: 'bg-yellow-500' },
              ].map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setForm({ ...form, status: s.key })}
                  className={`w-4 h-4 rounded-full ${s.color} transition ${
                    form.status === s.key ? 'ring-2 ring-offset-1 ring-blue-400' : 'opacity-50 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                disabled={!form.name.trim()}
                className="flex-1 text-xs bg-blue-600 text-white rounded-lg py-1.5 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 text-xs border border-slate-200 text-slate-600 rounded-lg py-1.5 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="mt-3 text-sm text-blue-600 hover:underline transition"
          >
            + Add medication
          </button>
        )}
      </div>
    </div>
  );
}
