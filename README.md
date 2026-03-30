# DrugWise Frontend

The React-based client application for **DrugWise**, an interactive, Retrieval-Augmented Generation (RAG) powered medical chatbot. This application translates complex FDA drug data into modern, conversational, and accessible user experiences.

## Core Features

*   **Intelligent Conversational Interface**: A dynamic, RAG-powered chat environment. It actively parses complex markdown (from the LLM) into beautifully formatted medical warnings, ordered lists, and bold critical texts. 
*   **Medication Management**: A visual dashboard allowing users to add, remove, and track active prescriptions with real-time status indicators (e.g., Active, Paused).
*   **Daily Reminder System**: An interactive, localized reminder board. Features full CRUD capability, custom color-tagging, automatic 24-hour to 12-hour (AM/PM) parsing, and smooth micro-animations.
*   **Session History Persistence**: Live session management enabling users to bounce between historical chat contexts seamlessly. All chat threads and reminders are persisted instantly across browser reloads using robust `localStorage` integration.

## Tech Stack

*   **Core Framework**: React 19, initialized via Vite for lightning-fast HMR and optimized production builds.
*   **Styling**: Tailwind CSS v4. Configured with a dedicated CSS design system relying on custom raw CSS variables for a "Glassmorphism" design language (translucency, backdrop-blur, interactive gradients).
*   **Routing & Connectivity**: React Router v7 for client-side routing and `axios` for streamlined, configurable API interactions with the Python backend.
*   **Iconography**: Lucide React for clean, standard vector graphics.

## Architecture & Design Decisions

### 1. State Management via Custom Hooks
Rather than relying on heavy global state libraries (like Redux or Zustand), the application limits its footprint by leveraging focused, single-responsibility custom hooks:
*   `useChatHistory.js`: Manages the ephemeral active chat window alongside the persistent history of all past conversations. Handles race conditions and ensures synchronization between React state and the browser's local storage.
*   `useReminders.js` & `useDrugManagement.js`: Modularizes the CRUD logic entirely away from the UI presentation layer.

### 2. "Glassmorphic" Design System
To ensure the application feels premium, the UI relies structurally on Tailwind, but strictly avoids hardcoded hex values across components. Instead, a central `index.css` acts as the single source of truth for overarching design tokens (e.g., `--glass-bg`, `--gradient-brand`, micro-animations).

### 3. Asynchronous Data Handling
API interactions (like connecting to the LLM generation endpoints) are cleanly encapsulated in `api/client.js`. It features aggressive timeouts tailored to the potentially slow nature of LLM generation and centralized error boundary routing to prevent blank UI states during database downtime.

## Local Development

### Prerequisites
Make sure you have Node.js (v18+) and npm installed.

### Setup

1. **Clone the repository** (if you haven't already):
```bash
git clone https://github.com/ola-chabot-medicare/DrugWise-frontend.git
cd DrugWise-frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure Environment Variables**:
Create a `.env` file in the root directory and point it to your backend API server.
```env
VITE_API_URL=http://localhost:8000
```

4. **Run the development server**:
```bash
npm run dev
```

The app will become available at `http://localhost:5173`. 

---

### Connecting the Backend
This frontend is designed to strictly consume the RAG API endpoints. It assumes the existence of the DrugWise FastAPI backend running concurrently. If the backend is offline, the client will safely catch Axios errors and display fallback offline UI states within the chat.
