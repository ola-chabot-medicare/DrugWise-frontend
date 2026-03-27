import { useState } from 'react';
import { Edit2, X } from 'lucide-react';
import { getRelativeTime } from '../utils/timeUtils';

const REMINDER_COLORS = {
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
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
}) {
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderForm, setReminderForm] = useState({ text: '', time: '', color: 'green' });
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleAddReminder = () => {
    if (!reminderForm.text.trim()) return;
    addReminder(reminderForm.text.trim(), reminderForm.time, reminderForm.color);
    setReminderForm({ text: '', time: '', color: 'green' });
    setShowReminderForm(false);
  };

  return (
    <div className="w-90 border-l border-slate-100 bg-white flex flex-col flex-shrink-0 overflow-y-auto">
      <div className="p-4">
        {/* New chat */}
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 text-blue-600 font-medium text-base hover:bg-blue-50 rounded-lg px-3 py-2.5 w-full transition"
        >
          <Edit2 className="w-5 h-5" />
          + New chat
        </button>

        {/* Recently */}
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mt-5 mb-2 px-1">
          Recently
        </p>

        {sessions.length === 0 ? (
          <p className="text-xs text-gray-400 italic text-center py-3">No recent chats yet</p>
        ) : (
          <div className="space-y-0.5">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className={`flex items-center justify-between text-sm rounded-lg px-3 py-2.5 cursor-pointer group transition relative ${
                  session.id === activeSessionId
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex-1 min-w-0 mr-2">
                  <span className="block truncate text-xs">{session.title}</span>
                  <span className="text-xs text-slate-400 font-normal">
                    {getRelativeTime(session.updatedAt)}
                  </span>
                </div>

                {/* 3-dot menu */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === session.id ? null : session.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 flex-shrink-0"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>

                {openMenuId === session.id && (
                  <div className="absolute right-2 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-md z-10 py-1 min-w-24">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(session.id);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Daily Reminder */}
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mt-6 mb-2 px-1">
          Daily Reminder
        </p>

        {reminders.length === 0 ? (
          <p className="text-xs text-gray-400 italic text-center py-3">No reminders set</p>
        ) : (
          <div className="space-y-2">
            {reminders.map((r) => (
              <div key={r.id} className="flex items-start gap-2 text-sm text-slate-600 group">
                <span
                  className={`mt-1.5 w-2.5 h-2.5 min-w-2.5 rounded-full ${REMINDER_COLORS[r.color] || 'bg-green-500'} flex-shrink-0`}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-xs">{r.text}</span>
                  {r.time && (
                    <span className="text-xs text-slate-400 ml-1">({r.time})</span>
                  )}
                </div>
                <button
                  onClick={() => deleteReminder(r.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition flex-shrink-0 mt-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add reminder form */}
        {showReminderForm ? (
          <div className="mt-3 space-y-2 bg-slate-50 rounded-lg border border-slate-200 p-3">
            <input
              type="text"
              placeholder="Reminder message..."
              value={reminderForm.text}
              onChange={(e) => setReminderForm({ ...reminderForm, text: e.target.value })}
              className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 transition bg-white"
            />
            <input
              type="time"
              value={reminderForm.time}
              onChange={(e) => setReminderForm({ ...reminderForm, time: e.target.value })}
              className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 transition bg-white"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Color:</span>
              {['green', 'yellow', 'red'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setReminderForm({ ...reminderForm, color: c })}
                  className={`w-4 h-4 rounded-full ${REMINDER_COLORS[c]} transition ${
                    reminderForm.color === c
                      ? 'ring-2 ring-offset-1 ring-blue-400'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddReminder}
                disabled={!reminderForm.text.trim()}
                className="flex-1 text-xs bg-blue-600 text-white rounded-lg py-1.5 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
              <button
                onClick={() => setShowReminderForm(false)}
                className="flex-1 text-xs border border-slate-200 text-slate-600 rounded-lg py-1.5 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowReminderForm(true)}
            className="mt-2 text-sm text-blue-600 hover:underline transition"
          >
            + Add reminder
          </button>
        )}
      </div>
    </div>
  );
}
