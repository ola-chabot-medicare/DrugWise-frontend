import { useState } from 'react';
import { X, MoreHorizontal, Bell, MessageSquare, Plus, Sparkles, Clock, Pencil } from 'lucide-react';
import { getRelativeTime } from '../utils/timeUtils';

// Colorful dot + glow per reminder color
const REMINDER_STYLES = {
  green:  { dot: '#10b981', glow: '0 0 7px 2px rgba(16,185,129,0.5)',  bg: 'rgba(16,185,129,0.07)',  border: 'rgba(16,185,129,0.2)',  text: '#065f46' },
  yellow: { dot: '#f59e0b', glow: '0 0 7px 2px rgba(245,158,11,0.5)',  bg: 'rgba(245,158,11,0.07)',  border: 'rgba(245,158,11,0.2)',  text: '#78350f' },
  red:    { dot: '#f43f5e', glow: '0 0 7px 2px rgba(244,63,94,0.5)',   bg: 'rgba(244,63,94,0.07)',   border: 'rgba(244,63,94,0.2)',   text: '#881337' },
};

// Helper to display 24h as 12h AM/PM
const formatAMPM = (timeStr) => {
  if (!timeStr) return '';
  // If already AM/PM (from legacy local storage), just return
  if (timeStr.toLowerCase().includes('am') || timeStr.toLowerCase().includes('pm')) {
    return timeStr;
  }
  const [hStr, mStr] = timeStr.split(':');
  if (!hStr || !mStr) return timeStr;
  let hours = parseInt(hStr, 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // '0' should be '12'
  return `${hours}:${mStr} ${ampm}`;
};

// Convert legacy AM/PM local storage data back to HTML5 <input type="time"> compatible HH:mm
const parseTo24Hour = (timeStr) => {
  if (!timeStr) return '';
  if (!timeStr.toLowerCase().includes('am') && !timeStr.toLowerCase().includes('pm')) {
    return timeStr;
  }
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return timeStr;
  let [_, h, m, ampm] = match;
  h = parseInt(h, 10);
  if (ampm.toUpperCase() === 'PM' && h < 12) h += 12;
  if (ampm.toUpperCase() === 'AM' && h === 12) h = 0;
  return `${h.toString().padStart(2, '0')}:${m}`;
};

export default function RightSidebar({
  onNewChat,
  sessions,
  activeSessionId,
  onSelectSession,
  onDeleteSession,
  reminders,
  addReminder,
  deleteReminder,
  updateReminder,
}) {
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderForm, setReminderForm] = useState({ id: null, text: '', time: '', color: 'green' });
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleSaveReminder = () => {
    if (!reminderForm.text.trim()) return;
    if (reminderForm.id) {
      updateReminder(reminderForm.id, {
        text: reminderForm.text.trim(),
        time: reminderForm.time,
        color: reminderForm.color
      });
    } else {
      addReminder(reminderForm.text.trim(), reminderForm.time, reminderForm.color);
    }
    setReminderForm({ id: null, text: '', time: '', color: 'green' });
    setShowReminderForm(false);
  };

  const handleEditClick = (r) => {
    setReminderForm({
      id: r.id,
      text: r.text,
      time: parseTo24Hour(r.time), // Ensures old AM/PM items populate the time input properly
      color: r.color,
    });
    setShowReminderForm(true);
  };

  const handleCancelReminder = () => {
    setReminderForm({ id: null, text: '', time: '', color: 'green' });
    setShowReminderForm(false);
  };

  return (
    <div className="w-96 glass-card border-0 border-l border-white/60 flex flex-col flex-shrink-0 overflow-y-auto">
      <div className="p-5">

        {/* ── New chat — gradient CTA ── */}
        <button
          onClick={onNewChat}
          className="animate-gradient-shift w-full flex items-center justify-center gap-2 text-base font-bold text-white rounded-2xl px-4 py-4 mb-6 shadow-lg hover:shadow-blue-300/50 hover:-translate-y-0.5 transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #0ea5e9, #14b8a6)', backgroundSize: '200% 200%' }}
        >
          <Plus className="w-5 h-5" />
          New chat
          <Sparkles className="w-4 h-4 opacity-80" />
        </button>

        {/* ── RECENTLY section ── */}
        <div className="flex items-center gap-2 mb-3 px-1">
          <div
            className="flex items-center justify-center w-6 h-6 rounded-lg"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#0ea5e9)' }}
          >
            <MessageSquare className="w-3.5 h-3.5 text-white" />
          </div>
          <p
            className="text-base font-bold uppercase tracking-wide"
            style={{
              background: 'linear-gradient(135deg,#3b82f6,#0ea5e9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Recently
          </p>
        </div>

        {sessions.length === 0 ? (
          <p className="text-base text-slate-400 italic text-center py-3">No recent chats yet</p>
        ) : (
          <div className="flex flex-col gap-1">
            {sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              return (
                <div
                  key={session.id}
                  onClick={() => onSelectSession(session.id)}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer relative animate-slide-down transition-all duration-150 ${
                    openMenuId === session.id ? 'z-50' : 'z-auto'
                  } ${
                    isActive
                      ? 'shadow-sm'
                      : 'hover:bg-white/60 hover:shadow-sm'
                  }`}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.10), rgba(14,165,233,0.08))',
                    border: '1px solid rgba(59,130,246,0.22)',
                  } : {}}
                >
                  {/* Active color strip */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                      style={{ background: 'linear-gradient(to bottom,#3b82f6,#14b8a6)' }}
                    />
                  )}
                  <div className="flex-1 min-w-0 mr-2 pl-2">
                    <span
                      className={`block truncate text-base ${isActive ? 'font-semibold' : 'text-slate-700'}`}
                      style={isActive ? {
                        background: 'linear-gradient(135deg,#1d4ed8,#0369a1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      } : {}}
                    >
                      {session.title}
                    </span>
                    <span className={`text-sm ${isActive ? 'text-blue-400' : 'text-slate-400'}`}>
                      {getRelativeTime(session.updatedAt)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === session.id ? null : session.id);
                    }}
                    className={`flex-shrink-0 rounded-lg p-1 transition-colors ${
                      isActive
                        ? 'text-blue-400 hover:bg-blue-100 hover:text-blue-600'
                        : 'opacity-0 group-hover:opacity-100 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                    }`}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {openMenuId === session.id && (
                    <div className="absolute right-2 top-full mt-1 bg-white/90 backdrop-blur border border-white/70 rounded-xl shadow-xl z-10 py-1 min-w-28">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(session.id);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-3 py-2 text-base text-rose-500 hover:bg-rose-50 transition rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── DAILY REMINDER section ── */}
        <div className="flex items-center gap-2 mt-6 mb-3 px-1">
          <div
            className="flex items-center justify-center w-6 h-6 rounded-lg"
            style={{ background: 'linear-gradient(135deg,#8b5cf6,#a78bfa)' }}
          >
            <Bell className="w-3.5 h-3.5 text-white" />
          </div>
          <p
            className="text-base font-bold uppercase tracking-wide"
            style={{
              background: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Daily Reminder
          </p>
        </div>

        {reminders.length === 0 ? (
          <p className="text-base text-slate-400 italic text-center py-3">No reminders set</p>
        ) : (
          <div className="flex flex-col gap-2">
            {reminders.map((r) => {
              const style = REMINDER_STYLES[r.color] || REMINDER_STYLES.green;
              return (
                <div
                  key={r.id}
                  className="flex items-start gap-3 py-2.5 px-3 rounded-xl group transition-all duration-150 relative"
                  style={{ background: style.bg, border: `1px solid ${style.border}` }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: style.dot, boxShadow: style.glow }}
                  />
                  <div className="flex-1 min-w-0 pr-12">
                    <span className="text-base font-medium leading-snug block" style={{ color: style.text }}>
                      {r.text}
                    </span>
                    {r.time && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-sm text-slate-400 font-medium">{formatAMPM(r.time)}</span>
                      </div>
                    )}
                  </div>

                  {/* Edit + Delete overlay on hover */}
                  <div className="absolute right-2 top-2 bottom-2 flex flex-col gap-1 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditClick(r)}
                      className="p-1 rounded bg-white/50 hover:bg-white text-slate-400 hover:text-blue-500 transition-colors shadow-sm"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteReminder(r.id)}
                      className="p-1 rounded bg-white/50 hover:bg-white text-slate-400 hover:text-rose-500 transition-colors shadow-sm"
                      title="Delete"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add / Edit reminder form */}
        {showReminderForm ? (
          <div className="mt-3 space-y-2.5 bg-white/70 backdrop-blur rounded-2xl border border-white/80 p-4 shadow-sm animate-slide-down">
            <input
              type="text"
              placeholder="Reminder message..."
              value={reminderForm.text}
              onChange={(e) => setReminderForm({ ...reminderForm, text: e.target.value })}
              className="w-full text-base border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-white"
            />
            <input
              type="time"
              value={reminderForm.time}
              onChange={(e) => setReminderForm({ ...reminderForm, time: e.target.value })}
              className="w-full text-base border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-white"
            />
            <div className="flex items-center gap-3">
              <span className="text-base text-slate-500">Color:</span>
              {[
                { key: 'green',  label: 'Emerald', dot: '#10b981' },
                { key: 'yellow', label: 'Amber',   dot: '#f59e0b' },
                { key: 'red',    label: 'Rose',    dot: '#f43f5e' },
              ].map((c) => (
                <button
                  key={c.key}
                  type="button"
                  title={c.label}
                  onClick={() => setReminderForm({ ...reminderForm, color: c.key })}
                  className={`w-5 h-5 rounded-full transition-transform hover:scale-110 ${
                    reminderForm.color === c.key ? 'ring-2 ring-offset-1 ring-blue-400 scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{ background: c.dot }}
                />
              ))}
            </div>
            <div className="flex gap-2 mt-1">
              <button
                onClick={handleSaveReminder}
                disabled={!reminderForm.text.trim()}
                className="flex-1 text-base text-white rounded-xl py-2.5 font-semibold transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}
              >
                {reminderForm.id ? 'Save Changes' : 'Add'}
              </button>
              <button
                onClick={handleCancelReminder}
                className="flex-[0.7] text-base border border-slate-200 text-slate-600 rounded-xl py-2.5 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowReminderForm(true)}
            className="mt-3 w-full flex items-center justify-center gap-2 text-base font-semibold text-violet-500 border border-dashed border-violet-300 rounded-xl px-3 py-3 hover:bg-violet-50 hover:border-violet-400 transition-all duration-150"
          >
            <Plus className="w-4 h-4" />
            Add reminder
          </button>
        )}
      </div>
    </div>
  );
}
