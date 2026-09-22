# DrugWise Frontend

React + Vite chat UI for DrugWise, a medical drug-information chatbot.
Connects to the FastAPI backend at `VITE_API_URL` (defaults to
`http://localhost:8000`) for RAG-backed answers, and keeps chat sessions,
reminders, and medication tracking in `localStorage` — no backend account
system yet.

## Stack
- React 19 + Vite
- Tailwind CSS v4
- Axios (`src/api/client.js`)
- React Router DOM v7
- Lucide React icons

## Structure
```
src/api/          ← axios client, sendMessage()/checkHealth() against the backend
src/pages/         ← LoginPage (no real auth — MVP), ChatPage
src/components/    ← ChatBubble, ChatInput, TypingIndicator, sidebars, etc.
src/hooks/         ← useChatHistory, useReminders, useDrugManagement, useUserProfile
                     (all localStorage-backed)
src/utils/         ← pure helpers (time formatting)
```

## Backend contract
- `POST /api/chat` — `{ message, model, model_provider }` → `StandardResponse`
  (`{"status": "success", "data": {"answer": "..."}}` or
  `{"status": "error", "message": "..."}`)
- `GET /health` — used on mount to show a connection warning if the backend
  is down

## Rules
- `src/api/client.js` is the only place that talks to the backend — don't
  call axios directly from components/hooks.
- Always show the medical disclaimer in the chat UI ("Not a substitute for
  professional medical advice").
- Write code as a competent Year 3 CS student: correct logic, minimal
  comments, practical variable names, no over-engineering.
- Use spaces around every `=` (`x = 5`, not `x=5`).
- Never commit or push yourself — always let the user commit and push.

## Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

# Frontend Visual Quality
- IMPORTANT: use the `frontend-design` skill for aesthetic direction and
  the `web-design-guidelines` skill for a correctness/accessibility audit
  on every screen you touch. Do not skip this because it's referenced here
  rather than stated in the task prompt.
- Baseline interactivity (hover/focus states, transition-colors on
  interactive elements, prefers-reduced-motion-respecting spinners) is
  mandatory on every screen you touch.
- Headings and buttons use sentence case, not Title Case, project-wide.

---

# Andrej Karpathy's guidelines
Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think before coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity first

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-driven execution

**Define success criteria upfront, then run.**

Transform tasks into verifiable goals stated before you start:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan up front:
[Step] → success: [check]
[Step] → success: [check]
[Step] → success: [check]

Once success criteria are stated, run to completion against them. Don't add
extra self-review passes or re-verification steps beyond what the stated
criteria require — a stated test suite passing is the verification; no need
to double-check it again afterward.

**Exception:** for numbered/plan-mode tasks specifically, the prompt may ask
for a single adversarial-review-subagent pass at the end, checking the diff
against the approved plan (requirements implemented, edge cases tested,
nothing out-of-scope changed). This is not the same agent re-checking its
own already-stated criteria - it's an independent reviewer catching plan
drift the stated criteria didn't cover. It does not apply to small/routine
fixes; on those, this rule's default (no extra passes) still holds.

## 5. Reporting back

**Match report length to what changed, skip narrating routine steps**

- First line answers "what happened" — did it work, what changed. Detail after.
- Skip narrating routine steps ("now I'll check the imports..."). Report findings,
  not process.
- For a small/surgical change, a few lines is enough. Don't pad with restated
  context or a summary of what was already discussed in the prompt.
- Flag real uncertainties or tradeoffs found during work — don't flag things
  already covered by the stated plan.

## 6. Scope discipline

**Deliver what was asked, at the scope intended.**

- Make routine judgment calls yourself; check in only when different readings
  of the request would lead to materially different work.
- If the request seems mistaken or a better approach exists, say so in a
  sentence and continue with the task as asked, rather than quietly widening,
  narrowing, or transforming it.
- Finish the whole task. Stop short of actions clearly beyond what was asked.
