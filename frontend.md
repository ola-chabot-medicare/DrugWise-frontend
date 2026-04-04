# DrugWise Frontend — Implementation Plan

This document tracks the complete frontend build of DrugWise: from scaffolding to a fully interactive RAG-powered chat UI. Use this as a technical interview reference.

---

## Tech Stack

| Layer | Choice | Reason |
| :--- | :--- | :--- |
| Framework | **React 19** | Component model ideal for chat UI with many independent stateful parts |
| Build tool | **Vite 8** | Near-instant HMR, native ES modules, zero-config |
| Styling | **Tailwind CSS v4** | Utility-first; avoids context-switching between files; rapid iteration |
| HTTP | **Axios** | Automatic JSON parsing, global timeout config, clean interceptor API |
| Routing | **React Router v7** | SPA navigation between `/` (Login) and `/chat` |
| Icons | **Lucide React** | Tree-shakeable SVG icon library; consistent stroke weight |
| State | **useState + custom hooks** | No Redux needed — all state is local or localStorage-backed |
| Persistence | **localStorage** | Zero backend dependency for sessions, reminders, drugs, user profile |

---

## Phase 1: Project MVP
*Initialize scaffolding, tooling, routing, and the API layer.*

| Step | Component | Status | Sub-steps |
| :--- | :--- | :---: | :--- |
| **1** | **Vite + React Project Init**<br>`npm create vite@latest` | ✅ Done | 1. Run `npm create vite@latest drugwise-frontend -- --template react`<br>2. `cd drugwise-frontend && npm install`<br>3. Verify dev server starts via `npm run dev`<br>4. Delete boilerplate (`App.css` placeholder content, default `index.css` body styles) |
| **2** | **Tailwind CSS v4 Setup**<br>`@tailwindcss/vite` | ✅ Done | 1. Install `tailwindcss` and the Vite plugin: `npm i -D tailwindcss @tailwindcss/vite`<br>2. Register plugin in `vite.config.js`: `plugins: [react(), tailwindcss()]`<br>3. Add `@import "tailwindcss"` to `src/index.css` — v4 uses a single import, no config file needed<br>4. Verify a utility class like `text-blue-500` applies in JSX |
| **3** | **Dependencies Installation**<br>`package.json` | ✅ Done | 1. `npm install axios react-router-dom lucide-react`<br>2. Confirm versions: React 19, React Router v7, Axios 1.x, Lucide React<br>3. Freeze lockfile with `package-lock.json` committed |
| **4** | **Project Folder Architecture**<br>*Directories* | ✅ Done | 1. `src/api/` — Axios client and all backend calls<br>2. `src/components/` — reusable UI components (ChatBubble, ChatInput, etc.)<br>3. `src/pages/` — full-page views (LoginPage, ChatPage)<br>4. `src/hooks/` — custom React hooks for state logic<br>5. `src/assets/` — static assets (logo SVG, profile photo)<br>6. `src/utils/` — pure helper functions (time formatting) |
| **5** | **Environment Variables**<br>`.env` | ✅ Done | 1. Create `.env` at project root with `VITE_API_URL=http://localhost:8000`<br>2. Vite exposes only `VITE_`-prefixed vars to the browser bundle<br>3. `client.js` reads `import.meta.env.VITE_API_URL` with `localhost:8000` as fallback<br>4. Add `.env` to `.gitignore` to avoid committing local overrides |
| **6** | **Core Routing Setup**<br>`src/App.jsx` | ✅ Done | 1. Wrap app in `<BrowserRouter>` from React Router v7<br>2. Define two routes: `/` → `<LoginPage>`, `/chat` → `<ChatPage>`<br>3. Add a catch-all `<Route path="*">` that redirects to `/`<br>4. Apply a full-height flex layout (`h-full`) so the chat UI never overflows<br>5. Add a thin `bg-gray-800` title bar at the top to frame the design |

---

## Phase 2: Frontend Implementation
*API layer, pages, components, custom hooks, state management.*

| Step | Component | Status | Sub-steps |
| :--- | :--- | :---: | :--- |
| **1** | **Axios API Client**<br>`src/api/client.js` | ✅ Done | 1. Create an Axios instance with `baseURL` from env and `timeout: 60000` (RAG + LLM can take 10–30s)<br>2. Implement `sendMessage(message)`: POST to `/api/chat` with `{ message, model, model_provider }` payload<br>3. Implement `checkHealth()`: GET `/health` to detect if backend is offline<br>4. Wrap `sendMessage` in try/catch; throw a human-readable `Error` so `ChatPage` can display it as an error bubble<br>5. Export both functions and the raw `apiClient` instance for potential future use |
| **2** | **Login Page**<br>`src/pages/LoginPage.jsx` | ✅ Done | 1. Build a **two-column layout**: left 60% is a gradient hero panel, right 40% is the login form<br>2. Animate 14 wireframe hexagons in the hero using inline SVG `<polygon>` elements — no canvas, no library<br>3. Add a layered radial glow and a central hex-cluster with a medical cross SVG<br>4. Build the form with controlled inputs (`email`, `password`) using `useState`<br>5. Add password visibility toggle with `Eye` / `EyeOff` from Lucide<br>6. `handleLogin` calls `e.preventDefault()` and then `navigate('/chat')` — no real auth (MVP)<br>7. Add subtle hover glow on the Submit button via inline style animation |
| **3** | **Chat Page Layout**<br>`src/pages/ChatPage.jsx` | ✅ Done | 1. Build a **three-column layout**: left sidebar (user profile + drugs), center panel (chat), right sidebar (sessions + reminders)<br>2. Apply a multi-stop CSS gradient background (`#e0e7ff → #f0fdf4 → #eff6ff`) for a clinical-calm feel<br>3. Use `flex h-full overflow-hidden` so columns never scroll as a unit — only the message area scrolls<br>4. Wire all custom hooks at this level and pass data/handlers down as props (single source of truth)<br>5. Run `checkHealth()` on mount — on failure, inject a red error bubble into the message stream<br>6. Implement `extractReply(data)` to normalize the backend's `StandardResponse` format: `data.data.answer` → `data.response` → `data.message` with fallbacks |
| **4** | **Chat Send & Session Flow**<br>`ChatPage` core logic | ✅ Done | 1. `handleSend(text)`: guard against empty/loading, create a `userMsg` object with `id: u-${Date.now()}`<br>2. On first send, call `chatHistory.createSession(text)` to generate a new session with title = first 35 chars of user message<br>3. Optimistically save user message to session with `chatHistory.saveSession()` before awaiting the API<br>4. Await `sendMessage(text)`, create a `botMsg`, then save both to session<br>5. On error, create an `isError: true` bubble so `ChatBubble` renders in rose instead of white<br>6. Use `setIsLoading(true/false)` around the async call to trigger `<TypingIndicator>` |
| **5** | **Regenerate & New Chat**<br>`ChatPage` handlers | ✅ Done | 1. `handleRegenerate()`: find the last user message, strip the last bot message from session state, then re-call `sendMessage` — replaces the last response<br>2. `handleNewChat()`: set `activeSessionId` to null and clear `searchQuery` — the welcome screen re-appears because `currentMessages` becomes empty<br>3. `handleSelectSession(id)`: a single `setActiveSessionId(id)` call; React re-renders and `currentMessages` automatically reflects the chosen session<br>4. `handleDeleteSession(id)`: delete the session, then automatically select the next available session or null |
| **6** | **ChatBubble Component**<br>`src/components/ChatBubble.jsx` | ✅ Done | 1. Render two variants: **user** (gradient blue bubble, right-aligned) and **bot** (white/glass card, left-aligned with avatar)<br>2. Build a custom lightweight markdown renderer (`parseMarkdown`): handles `#`, `##`, `###` headings; `-`/`*` unordered lists; numbered lists; sub-bullets; empty lines as spacers<br>3. Build `parseBold` to handle `**text**` → `<strong>` — called by every line renderer<br>4. Use `animate-message-user` and `animate-message-bot` CSS classes for slide-in entry animations<br>5. If `isError` is true, swap the bubble background from white to `rose-50` with a `rose-200` border<br>6. Attach `<MessageActions>` below every bot bubble |
| **7** | **MessageActions Component**<br>`src/components/MessageActions.jsx` | ✅ Done | 1. Four action buttons: **Copy**, **Regenerate**, **Share**, **Bookmark**<br>2. Copy uses `navigator.clipboard.writeText()` and flips to a green `<Check>` icon for 2 seconds<br>3. Regenerate calls `onRegenerate` prop (wired to `handleRegenerate` in ChatPage)<br>4. Share and Bookmark are placeholder stubs (visual affordance, no behavior yet) |
| **8** | **ChatInput Component**<br>`src/components/ChatInput.jsx` | ✅ Done | 1. Controlled `<input>` with `value/onChange` — clear on send<br>2. `Enter` (without `Shift`) submits; `Shift+Enter` would insert newline (current input is single-line)<br>3. Send button is disabled and visually grayed when input is empty or `isLoading` is true<br>4. Three decorative icon buttons (Paperclip, Image, Mic) are visual stubs — tabIndex -1 so they don't trap keyboard focus<br>5. Gradient send button activates only when `canSend = input.trim().length > 0 && !isLoading` |
| **9** | **TypingIndicator Component**<br>`src/components/TypingIndicator.jsx` | ✅ Done | 1. Renders the bot avatar + a bubble with three bouncing dots<br>2. Each dot is a `<span>` with `animate-bounce-dot` class and staggered `animationDelay` (0ms, 150ms, 300ms)<br>3. Conditionally rendered in ChatPage: `{isLoading && <TypingIndicator />}` |
| **10** | **SuggestionChips Component**<br>`src/components/SuggestionChips.jsx` | ✅ Done | 1. Shown only when `!hasUserMessages` (welcome state) — disappears after first send<br>2. Three hardcoded drug query suggestions; clicking one calls `onSend(suggestion)` directly<br>3. Each chip has a unique blue/sky/teal gradient palette<br>4. Staggered `animate-fade-in-up` with `animationDelay: i * 80ms` for a cascading reveal |
| **11** | **UserProfileCard Component**<br>`src/components/UserProfileCard.jsx` | ✅ Done | 1. Full-bleed photo card (320px tall) with a dark-to-transparent gradient overlay so text is legible over any photo<br>2. A colored bottom strip (`#3b82f6 → #14b8a6`) acts as a brand accent below the photo<br>3. Camera button in top-left triggers a hidden `<input type="file" accept="image/*">` via `useRef`<br>4. On file select, `FileReader.readAsDataURL()` converts the image to base64, saved via `useUserProfile.updateAvatar()`<br>5. **Drug Management section**: maps `drugs` array to colored rows; each row shows name, dosage, schedule<br>6. "Add medication" form appears inline with controlled inputs for name, dosage, schedule, status<br>7. Calls `addDrug()` / `deleteDrug()` props wired to `useDrugManagement` |
| **12** | **RightSidebar Component**<br>`src/components/RightSidebar.jsx` | ✅ Done | 1. **New Chat button**: gradient CTA at top; calls `onNewChat` which resets `activeSessionId`<br>2. **Recently section**: maps `sessions` array; active session has a gradient left border strip + highlighted text<br>3. Session items have a hover-only `<MoreHorizontal>` menu button (avoids cluttering inactive items)<br>4. Clicking the menu reveals a context dropdown with a "Delete" option — `stopPropagation()` prevents session selection firing simultaneously<br>5. **Daily Reminder section**: maps `reminders`; each has a colored glow dot keyed to `green/yellow/red`<br>6. Edit/Delete overlay appears on `group-hover:opacity-100` — two icon buttons positioned absolutely on the right<br>7. Reminder form: text input + `<input type="time">` + color picker (3 dot buttons); `handleSaveReminder` routes to `addReminder` or `updateReminder` based on whether `reminderForm.id` is set<br>8. `parseTo24Hour()` converts legacy AM/PM strings back to HH:mm for the HTML time input<br>9. `formatAMPM()` converts HH:mm display strings to `h:mm AM/PM` for the UI |
| **13** | **`useChatHistory` Hook**<br>`src/hooks/useChatHistory.js` | ✅ Done | 1. Load all sessions from `localStorage` on mount via lazy `useState(loadFromStorage)`<br>2. `persist(updater)` wraps `setSessions` to also call `saveToStorage` and keep `sessionsRef.current` in sync — solves stale closure issues in callbacks<br>3. `createSession(firstMessageText)`: generate a `session-${Date.now()}` ID, truncate title to 35 chars, prepend to sessions list<br>4. `saveSession(id, messages)`: update messages + re-derive title from first user message + sort by `updatedAt` descending<br>5. `deleteSession(id)`: uses functional updater `prev.filter(...)` so it always reads from current React state, not stale closure<br>6. `currentMessages` is a derived value: `sessions.find(s => s.id === activeSessionId)?.messages ?? []` — no manual sync needed<br>7. `sessionsRef` pattern: `useRef` mirrors the latest `sessions` state so async callbacks never read stale values |
| **14** | **`useReminders` Hook**<br>`src/hooks/useReminders.js` | ✅ Done | 1. Seeds 4 default reminders (Amlodipine, Metformin, BP check, Lisinopril) on first-ever load and persists them<br>2. `addReminder(text, time, color)`: appends a new reminder with `id: rem-${Date.now()}`<br>3. `deleteReminder(id)`: filters the array and persists<br>4. `updateReminder(id, fields)`: maps over array, merges fields with spread for immutable update |
| **15** | **`useDrugManagement` Hook**<br>`src/hooks/useDrugManagement.js` | ✅ Done | 1. Seeds 3 demo drugs (Amlodipine, Glucophage, Ibuprofen) on first-ever load<br>2. Each drug has `{ id, name, dosage, schedule, status, notes }` — status is `active / warning / info`<br>3. `addDrug` / `deleteDrug` / `updateDrug` follow the same immutable pattern as `useReminders`<br>4. `status` field drives the color dot in `UserProfileCard` (emerald = active, rose = warning, amber = info) |
| **16** | **`useUserProfile` Hook**<br>`src/hooks/useUserProfile.js` | ✅ Done | 1. Stores `{ name, gender, role, phone, email, age, location, avatarUrl, avatarFrame }` in localStorage<br>2. `updateAvatar(base64String)`: stores a base64 data URL — persists across refreshes without a backend<br>3. `updateFrame` and `resetAvatar` are available for future avatar frame feature<br>4. On load, merges localStorage data with `DEFAULT_PROFILE` using spread — new fields added to defaults are automatically picked up |
| **17** | **`getRelativeTime` Utility**<br>`src/utils/timeUtils.js` | ✅ Done | 1. Takes an ISO date string, computes diff from `Date.now()`<br>2. Returns `"just now"` (< 1 min), `"Xm ago"` (< 1 hr), `"Xh ago"` (< 24 hr), `"Xd ago"` (< 7 days), or `toLocaleDateString()` for older dates<br>3. Used in `RightSidebar` to display relative timestamps on each session item |
| **18** | **CSS Animations**<br>`src/index.css` | ✅ Done | 1. `animate-float`: sinusoidal translateY for logo and hex cluster on Login page<br>2. `animate-float-delayed` / `animate-float-slow`: different durations for hex groups<br>3. `animate-bounce-dot`: used by `TypingIndicator` three-dot animation with staggered delay<br>4. `animate-message-user` / `animate-message-bot`: slide-in + fade for new chat bubbles<br>5. `animate-fade-in-up`: staggered reveal for `SuggestionChips` and login form<br>6. `animate-slide-down`: used for reminder form and session items appearing<br>7. `animate-gradient-shift`: animated `background-position` on gradient buttons for a "living" shimmer effect<br>8. `glass-card`: backdrop-blur + semi-transparent white background for sidebar panels<br>9. `text-gradient`: CSS gradient clipped to text for colored headings |
| **19** | **DrugWise Logo SVG**<br>`src/assets/DrugWiseLogo.jsx` | ✅ Done | 1. An inline React SVG component — no external image file needed, inherits parent color context<br>2. Accepts `size` prop to scale uniformly<br>3. Used in: Chat bubble avatar, TypingIndicator avatar, Login page, ChatPage welcome state |
| **20** | **End-to-End Integration Test**<br>*Browser + backend* | ✅ Done | 1. Start backend: `uvicorn main:app --reload` on port 8000<br>2. Start frontend: `npm run dev` — Vite serves on `http://localhost:5173`<br>3. Navigate to Login, submit form → redirected to `/chat`<br>4. Backend health check fires on mount — green (no error bubble)<br>5. Type a drug query and send — TypingIndicator appears, then bot response renders with parsed markdown<br>6. Verify session is saved in localStorage under `drugwise_chat_history`<br>7. Test "New Chat", "Regenerate", copy button, session switching, session deletion<br>8. Test reminder add/edit/delete; verify colors and time display<br>9. Test drug add/delete in left sidebar; verify localStorage persistence on refresh |

---

## Key Architecture Decisions

### Why localStorage instead of a backend for UI state?
All four hooks (`useChatHistory`, `useReminders`, `useDrugManagement`, `useUserProfile`) persist to `localStorage`. This eliminates auth complexity for the MVP while still surviving page refreshes. The data model is simple flat arrays — no relational complexity needed.

### Why custom hooks instead of a global state manager (Redux/Zustand)?
Each concern (chat history, reminders, drugs, profile) is isolated to its own hook. No component needs cross-slice state — `ChatPage` is the single top-level orchestrator that passes data down as props. This keeps the component tree easy to follow in an interview setting.

### Why `sessionsRef` in `useChatHistory`?
React's `useState` setter closes over the stale value of `sessions` in async callbacks. Using `useRef` to mirror the latest sessions value ensures that `saveSession` and `deleteSession` read fresh data, not the snapshot from when the callback was created.

### How does the three-column layout work responsively?
`ChatPage` uses `flex h-full overflow-hidden`. The left and right sidebars are `w-96 flex-shrink-0` (fixed width), and the center panel is `flex-1 min-w-0`. Only the message area inner div is `overflow-y-auto` — the columns themselves never scroll. On mobile, the sidebars would need to be hidden or converted to drawers (future work).

### How does the markdown renderer work without a library?
`parseMarkdown` in `ChatBubble.jsx` splits the bot response on `\n`, then pattern-matches each line: heading prefixes (`#`, `##`, `###`), list markers (`-`, `*`, `\d+\.`), sub-bullets, empty lines. `parseBold` further splits each line on `**...**` to render `<strong>`. This avoids bundling `react-markdown` (~25KB) and gives precise styling control.

### How does `extractReply` handle different backend response shapes?
```js
data?.data?.answer  // StandardResponse (main path)
?? data?.response   // fallback shape 1
?? data?.message    // fallback shape 2 (also used for error messages)
?? 'No response received.'
```
This defensive chain means the UI degrades gracefully even if the backend response envelope changes.

### How does session deletion avoid race conditions?
`deleteSession` uses `persist(prev => prev.filter(...))` — the functional updater form. This reads from React's current committed state, not from a stale closure over `sessions`. This is the same pattern used by `saveSession` to prevent the "last session to save wins" bug.

---

## Component Tree

```
App
├── LoginPage
│   └── DrugWiseLogo
└── ChatPage
    ├── UserProfileCard (left sidebar)
    │   └── [useDrugManagement, useUserProfile]
    ├── Center Panel
    │   ├── Search Input
    │   ├── ChatBubble (×N)
    │   │   ├── MessageActions
    │   │   └── DrugWiseLogo (bot avatar)
    │   ├── TypingIndicator
    │   ├── SuggestionChips (welcome state only)
    │   └── ChatInput
    └── RightSidebar
        ├── [useChatHistory — sessions list]
        └── [useReminders — reminders list]
```

---

## Data Flow Diagram

```
User types message
      │
      ▼
ChatInput.onSend(text)
      │
      ▼
ChatPage.handleSend(text)
  ├── createSession() if new            → localStorage (drugwise_chat_history)
  ├── saveSession([...msgs, userMsg])   → localStorage
  ├── setIsLoading(true)                → renders <TypingIndicator>
  │
  ▼
sendMessage(text) [axios POST /api/chat]
  │
  ├── SUCCESS → saveSession([...msgs, botMsg])
  └── ERROR   → saveSession([...msgs, errorMsg])
      │
      ▼
  setIsLoading(false)                   → TypingIndicator unmounts
      │
      ▼
  ChatBubble renders botMsg
  parseMarkdown(text) → React elements
```

---

## localStorage Schema

| Key | Shape | Managed by |
| :--- | :--- | :--- |
| `drugwise_chat_history` | `Session[]` where `Session = { id, title, messages: Message[], createdAt, updatedAt }` | `useChatHistory` |
| `drugwise_reminders` | `Reminder[]` where `Reminder = { id, text, time, color }` | `useReminders` |
| `drugwise_drugs` | `Drug[]` where `Drug = { id, name, dosage, schedule, status, notes }` | `useDrugManagement` |
| `drugwise_user_profile` | `{ name, gender, role, phone, email, age, location, avatarUrl, avatarFrame }` | `useUserProfile` |
