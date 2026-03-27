# DrugWise Frontend — Claude Code Guide

## Project
React + Vite + Tailwind CSS frontend for DrugWise medibot.
Connects to FastAPI backend at http://localhost:8000.

## Key Endpoints
- POST /api/chat  → { message: string } → { answer: string }
- GET  /health    → health check

## Structure (to build)
- src/components/   → reusable UI components
- src/pages/        → Chat page, Landing page
- src/api/          → axios client pointing to backend

## Axios Base URL
http://localhost:8000

## Design Guidelines
- Medical/clinical feel — clean, trustworthy, calm colors
- Chat UI similar to messaging apps
- Always show a disclaimer: "Not a substitute for professional medical advice"

## Stack
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router DOM
```