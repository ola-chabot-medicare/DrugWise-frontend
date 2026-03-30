import { useState, useRef } from 'react';
import { Phone, Mail, Calendar, MapPin, User, User2, UserCheck, X, Pill, Camera, MoreVertical, Plus } from 'lucide-react';
import profilePhoto from '../assets/profile.jpg';
import useUserProfile from '../hooks/useUserProfile';

const STATUS_COLORS = {
  active:  'bg-emerald-400',
  warning: 'bg-rose-500',
  info:    'bg-amber-400',
};

// Rotating gradient palettes for each drug row
const DRUG_PALETTES = [
  { dot: '#10b981', bg: 'rgba(16,185,129,0.07)', border: 'rgba(16,185,129,0.18)', nameColor: '#065f46', scheduleColor: '#6ee7b7' },
  { dot: '#f43f5e', bg: 'rgba(244,63,94,0.07)',  border: 'rgba(244,63,94,0.18)',  nameColor: '#881337', scheduleColor: '#fda4af' },
  { dot: '#f59e0b', bg: 'rgba(245,158,11,0.07)', border: 'rgba(245,158,11,0.18)', nameColor: '#78350f', scheduleColor: '#fcd34d' },
  { dot: '#8b5cf6', bg: 'rgba(139,92,246,0.07)', border: 'rgba(139,92,246,0.18)', nameColor: '#4c1d95', scheduleColor: '#c4b5fd' },
];

export default function UserProfileCard({ drugs, addDrug, deleteDrug }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', dosage: '', schedule: '', status: 'active' });

  const { profile, updateAvatar } = useUserProfile();
  const fileInputRef = useRef(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateAvatar(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleAdd = () => {
    if (!form.name.trim()) return;
    addDrug(form.name.trim(), form.dosage.trim(), form.schedule.trim(), form.status);
    setForm({ name: '', dosage: '', schedule: '', status: 'active' });
    setShowForm(false);
  };

  const avatarSrc = profile.avatarUrl || profilePhoto;

  return (
    <div>
      {/* ── Profile card — full photo ── */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">

        {/* Layer 1 — Photo */}
        <img
          src={avatarSrc}
          alt="An Loc Nguyen"
          className="absolute inset-0 w-full h-full object-cover object-top"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-100 items-center justify-center hidden">
          <User className="w-16 h-16 text-slate-300" />
        </div>

        {/* Layer 2 — Rich gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.6) 45%, rgba(15,23,42,0.1) 70%, transparent 100%)',
          }}
        />

        {/* Colorful tint strip at very bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, #3b82f6, #0ea5e9, #14b8a6)' }}
        />

        {/* Layer 3 — Info stack */}
        <div className="absolute bottom-2 left-0 right-0 px-4 pb-4 flex flex-col gap-2">
          {/* Name */}
          <span className="text-white font-bold text-lg leading-tight">
            Nguyen An Loc
          </span>

          {/* Gender + Role */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <User2 className="w-4 h-4 text-sky-300 flex-shrink-0" />
              <span className="text-sm text-white/90">Male</span>
            </div>
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-teal-300 flex-shrink-0" />
              <span className="text-sm text-white/90">Patient</span>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-sky-300 flex-shrink-0" />
            <span className="text-sm text-white/90">+65 9131 5790</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-sky-300 flex-shrink-0" />
            <span className="text-sm text-white/90">anlocngdz@gmail.com</span>
          </div>

          {/* Age + Location */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-300 flex-shrink-0" />
              <span className="text-sm text-white/90">
                Age: <span className="text-white font-bold">20</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-300 flex-shrink-0" />
              <span className="text-sm text-white/90">Singapore</span>
            </div>
          </div>
        </div>

        {/* Camera button — top-left */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute top-3 left-3 bg-black/35 hover:bg-black/55 backdrop-blur-sm rounded-full p-2 cursor-pointer transition-colors z-10"
          title="Upload photo"
        >
          <Camera className="w-4 h-4 text-white" />
        </button>

        {/* Three-dot menu — top-right corner */}
        <button
          className="absolute top-3 right-3 cursor-pointer z-10 drop-shadow"
          title="Options"
        >
          <MoreVertical className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleAvatarUpload}
      />

      {/* ── Drug Management ── */}
      <div className="mt-5">
        {/* Section header */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="flex items-center justify-center w-7 h-7 rounded-xl shadow-sm"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)' }}
          >
            <Pill className="w-4 h-4 text-white" />
          </div>
          <h3
            className="text-base font-bold uppercase tracking-wide"
            style={{
              background: 'linear-gradient(135deg,#3b82f6,#0ea5e9,#14b8a6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Drug Management
          </h3>
        </div>

        {drugs.length === 0 ? (
          <p className="text-base text-gray-400 italic text-center py-3">No medications tracked</p>
        ) : (
          <div className="flex flex-col gap-2">
            {drugs.map((drug, idx) => {
              const palette = DRUG_PALETTES[idx % DRUG_PALETTES.length];
              return (
                <div
                  key={drug.id}
                  className="flex items-start gap-3 group py-2.5 px-3 rounded-xl transition-all duration-150"
                  style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
                >
                  {/* Glowing dot */}
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: palette.dot, boxShadow: `0 0 6px 2px ${palette.dot}55` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold" style={{ color: palette.nameColor }}>
                      {drug.name}
                      {drug.dosage && (
                        <span className="text-sm font-normal text-slate-500"> — {drug.dosage}</span>
                      )}
                    </p>
                    {drug.schedule && (
                      <p className="text-sm mt-0.5 font-medium" style={{ color: palette.scheduleColor }}>
                        {drug.schedule}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteDrug(drug.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-400 transition flex-shrink-0 mt-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {showForm ? (
          <div className="mt-3 space-y-2 bg-white/70 backdrop-blur rounded-2xl border border-white/80 p-3 shadow-sm">
            <input
              type="text"
              placeholder="Drug name (e.g. Amlodipine)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full text-base border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-white"
            />
            <input
              type="text"
              placeholder="Dosage (e.g. 5mg daily)"
              value={form.dosage}
              onChange={(e) => setForm({ ...form, dosage: e.target.value })}
              className="w-full text-base border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-white"
            />
            <input
              type="text"
              placeholder="Schedule (e.g. 7:00 AM daily)"
              value={form.schedule}
              onChange={(e) => setForm({ ...form, schedule: e.target.value })}
              className="w-full text-base border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-white"
            />
            <div className="flex items-center gap-2">
              <span className="text-base text-slate-500">Status:</span>
              {[
                { key: 'active',  color: 'bg-emerald-400', label: 'Active' },
                { key: 'warning', color: 'bg-rose-500',    label: 'Warning' },
                { key: 'info',    color: 'bg-amber-400',   label: 'Info' },
              ].map((s) => (
                <button
                  key={s.key}
                  type="button"
                  title={s.label}
                  onClick={() => setForm({ ...form, status: s.key })}
                  className={`w-5 h-5 rounded-full ${s.color} transition-transform hover:scale-110 ${
                    form.status === s.key ? 'ring-2 ring-offset-1 ring-blue-400 scale-110' : 'opacity-50 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                disabled={!form.name.trim()}
                className="flex-1 text-base text-white rounded-xl py-2.5 font-semibold transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)' }}
              >
                Add
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 text-base border border-slate-200 text-slate-600 rounded-xl py-2.5 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="mt-3 w-full flex items-center justify-center gap-2 text-base font-semibold text-blue-500 border border-dashed border-blue-300 rounded-xl px-3 py-3 hover:bg-blue-50 hover:border-blue-400 transition-all duration-150"
          >
            <Plus className="w-4 h-4" />
            Add medication
          </button>
        )}
      </div>
    </div>
  );
}
