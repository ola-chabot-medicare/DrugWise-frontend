# DrugWise Frontend

The chat UI for DrugWise, a medical drug-information chatbot. Talks to the
[DrugWise backend](https://github.com/ola-chabot-medicare/DrugWise-backend),
a FastAPI RAG service that answers questions from real FDA drug data instead
of letting the model guess.

## Why this exists

I built DrugWise's frontend to practice a chat UI that's more than a message
list: multi-session history, markdown-formatted responses, and small
localStorage-backed features (reminders, a medication tracker) layered on
top of a real backend call, all without a backend account system.


## Key features

- **AI medical chat**: ask any medication question; responses are rendered
  through a small custom markdown parser (headings, bold, bullet lists) so
  the backend's formatted answers display cleanly.
- **Multi-session chat history**: sessions are created per conversation,
  titled from the first message, and persisted to `localStorage` — close
  the tab and come back later, everything's still there.
- **Regenerate / copy**: re-run the last question against the backend, or
  copy any bot response to the clipboard.
- **Daily reminders & medication tracker**: add, edit, and color-code a
  medication schedule and an active-prescription list, both localStorage-backed.
- **Backend health check**: pings `/health` on load and shows an inline
  warning bubble if the backend isn't reachable, instead of failing silently.
- **Glassmorphism UI**: Tailwind v4, backdrop-blur panels, gradient accents.

## Tech stack

Verified from `package.json`.

- React 19, built with Vite
- Tailwind CSS v4
- Axios
- React Router DOM v7
- Lucide React icons

## Setup

### 1. Clone and install

```bash
git clone https://github.com/ola-chabot-medicare/DrugWise-frontend.git
cd DrugWise-frontend
npm install
```

### 2. Environment variables

`.env` already points `VITE_API_URL` at `http://localhost:8000` — no changes
needed for local dev against the backend running on its default port.

### 3. Run the backend

The chat feature needs the [DrugWise backend](https://github.com/ola-chabot-medicare/DrugWise-backend)
running separately — see its README for setup (it needs your own OpenAI and
ChromaDB Cloud keys).

### 4. Start the app

```bash
npm run dev
```

Open `http://localhost:5173`. The login screen accepts any email/password —
there's no backend auth yet, it's a demo gate in front of the chat UI.

### Other scripts

```bash
npm run build     # production build
npm run lint       # eslint
```
