import { useState, useRef } from 'react';
import { Phone, Mail, Calendar, MapPin, User, User2, UserCheck, X, Pill, Camera, MoreVertical, Sun, Moon } from 'lucide-react';
import profilePhoto from '../assets/profile.jpg';
import useUserProfile from '../hooks/useUserProfile';
import useDarkMode from '../hooks/useDarkMode';

const STATUS_COLORS = {
  active: 'bg-green-500',
  warning: 'bg-red-500',
  info: 'bg-yellow-500',
};

export default function UserProfileCard({ drugs, addDrug, deleteDrug }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', dosage: '', schedule: '', status: 'active' });

  const { profile, updateAvatar } = useUserProfile();
  const { isDark, toggleDark } = useDarkMode();
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
      {/* ── Profile card — full photo, no white section ── */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-md">

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
        {/* Fallback — hidden unless image fails */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-100 items-center justify-center hidden"
        >
          <User className="w-16 h-16 text-slate-300" />
        </div>

        {/* Layer 2 — Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)',
          }}
        />

        {/* Layer 3 — Info stack, pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 flex flex-col gap-1.5">
          {/* Name */}
          <span className="text-white font-semibold text-sm leading-tight mb-1">
            Nguyen An Loc
          </span>

          {/* Gender + Role */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <User2 className="w-3 h-3 text-white/70 flex-shrink-0" />
              <span className="text-[11px] text-white/80">Male</span>
            </div>
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-3 h-3 text-white/70 flex-shrink-0" />
              <span className="text-[11px] text-white/80">Patient</span>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-white/70 flex-shrink-0" />
            <span className="text-[11px] text-white/80">+65 9131 5790</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-white/70 flex-shrink-0" />
            <span className="text-[11px] text-white/80">anlocngdz@gmail.com</span>
          </div>

          {/* Age + Location */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-white/70 flex-shrink-0" />
              <span className="text-[11px] text-white/80">
                Age: <span className="text-white font-semibold">20</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-white/70 flex-shrink-0" />
              <span className="text-[11px] text-white/80">Singapore</span>
            </div>
          </div>
        </div>

        {/* Layer 4 — Top controls */}
        {/* Camera button — top-left */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute top-3 left-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-1.5 cursor-pointer transition-colors z-10"
          title="Upload photo"
        >
          <Camera className="w-4 h-4 text-white" />
        </button>

        {/* Dark Mode toggle — top-right */}
        <button
          onClick={toggleDark}
          className="absolute top-3 right-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-1.5 cursor-pointer transition-colors z-10 mr-1"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-white" />}
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
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
          <Pill className="w-4 h-4 text-blue-500 mr-1.5 inline-flex" />
          Drug management
        </h3>

        {drugs.length === 0 ? (
          <p className="text-sm text-gray-400 italic text-center py-3">No medications tracked</p>
        ) : (
          <div>
            {drugs.map((drug) => (
              <div key={drug.id} className="flex items-start gap-2 group py-1.5 border-b border-gray-100 last:border-0">
                <span
                  className={`w-2 h-2 min-w-2 rounded-full ${STATUS_COLORS[drug.status] || 'bg-green-500'} flex-shrink-0 mt-1.5`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">
                    {drug.name}
                    {drug.dosage && <span className="text-sm text-gray-400 font-normal"> — {drug.dosage}</span>}
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
                className="flex-1 text-sm bg-blue-600 text-white rounded-lg py-1.5 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 text-sm border border-slate-200 text-slate-600 rounded-lg py-1.5 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="border border-dashed border-blue-300 text-blue-500 text-xs rounded-lg px-3 py-1.5 hover:bg-blue-50 hover:border-blue-400 transition-all duration-150 w-full text-center mt-2 block"
          >
            + Add medication
          </button>
        )}
      </div>
    </div>
  );
}
