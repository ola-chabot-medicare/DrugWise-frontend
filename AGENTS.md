# AGENTS.md
Guidance for autonomous coding agents working in this repository.

## 1) Repository Scope
- Repository root: `DrugWise-frontend`
- Frontend app location: `fe/`
- Main stack: React 19 + Vite 8 + ESLint 9
- Package manager: npm (`fe/package-lock.json`)
- Node modules are present in `fe/node_modules/`

## 2) Working Directory
- Run app commands from `fe/` unless explicitly noted.
- Canonical path: `D:\Ola\ola chatbot medicare\frontend\DrugWise-frontend\fe`

## 3) Build / Lint / Test Commands
### Install
- `npm install`

### Local Development
- `npm run dev`
- Starts Vite dev server with HMR.

### Production Build
- `npm run build`
- Writes build output to `fe/dist/`.

### Preview Built App
- `npm run preview`

### Lint
- `npm run lint`
- Runs `eslint .`.

### Tests (Current State)
- No test runner is configured in `fe/package.json` scripts.
- No Vitest, Jest, or Playwright config files were found.
- No `*.test.*` or `*.spec.*` files were found.

### Single Test Command (Important)
- Current state: not available (no framework configured).
- If Vitest is added: `npx vitest run path/to/file.test.jsx`
- Vitest single test name: `npx vitest run path/to/file.test.jsx -t "test name"`
- If Jest is added: `npx jest path/to/file.test.jsx`
- Jest single test name: `npx jest path/to/file.test.jsx -t "test name"`

## 4) Verified Tooling Files
- ESLint config: `fe/eslint.config.js`
- Vite config: `fe/vite.config.js`
- Entry point: `fe/src/main.jsx`
- Root component: `fe/src/App.jsx`
- Global styles: `fe/src/index.css`

## 5) Code Style Guidelines
These rules match the existing codebase and should be preserved.

### JavaScript / React Baseline
- Use ESM imports/exports only.
- Use functional React components.
- Keep components focused and readable.
- Prefer straightforward JSX over abstractions.
- Keep `StrictMode` enabled at root.

### Imports
- Order imports as:
- 1) External packages
- 2) Side-effect imports (e.g. CSS)
- 3) Local modules/components
- Keep one import per line.
- Use relative imports inside `src/` unless aliases are added.
- Remove unused imports (lint treats unused vars as errors).

### Formatting
- Use 2-space indentation.
- Use single quotes.
- Omit semicolons.
- Keep trailing commas in multiline literals/calls.
- Keep long JSX readable by splitting props/expressions.
- Avoid trailing whitespace and dead commented blocks.

### Naming
- Components: PascalCase (`App`, `DrugCard`).
- Variables/functions: camelCase.
- Constants: UPPER_SNAKE_CASE only for true constants.
- CSS variables: kebab-case with `--` prefix.
- CSS classes/ids: short semantic names, usually kebab-case.
- Component file names: PascalCase (`DrugList.jsx`).
- Utility/hook file names: camelCase (`formatDose.js`, `useSearch.js`).

### Types and Data Contracts
- Current app is JavaScript, not TypeScript.
- If introducing TypeScript, migrate incrementally by folder.
- Document non-obvious object shapes near usage.
- Validate external/API data at boundaries.

### ESLint Rules to Respect
- Base: `@eslint/js` recommended rules.
- Hooks: `eslint-plugin-react-hooks` recommended flat config.
- Refresh: `eslint-plugin-react-refresh` Vite config.
- `no-unused-vars` is `error`.
- Exception: identifiers matching `^[A-Z_]` are ignored.

### Error Handling
- Fail fast on impossible states in dev paths.
- Render clear fallback UI for user-facing failures.
- Use `try/catch` for async flows and provide actionable messages.
- Do not silently swallow errors.
- Prefer early returns over deep nesting.

### State, Effects, and Performance
- Keep state as local as practical.
- Derive cheap values during render.
- Memoize only when profiling or repeated expensive work justifies it.
- Keep `useEffect` dependencies complete and lint-clean.
- Avoid effect-driven derived state when pure computation is enough.

### CSS / Styling
- Reuse tokens from `src/index.css` (`:root` custom properties).
- Prefer variables over hard-coded colors/spacing.
- CSS nesting is already used; keep it shallow/readable.
- Keep responsive rules near the related selector.
- Preserve visible `:focus-visible` behavior.

### Accessibility
- Prefer semantic HTML (`button`, `label`, `main`, etc.).
- Ensure keyboard focus visibility.
- Use `aria-*` only when semantics are insufficient.
- Maintain sufficient color contrast.

### Testing Expectations (Until Framework Exists)
- For UI changes, run `npm run lint` and `npm run build`.
- If adding a test framework, add scripts to `package.json`.
- Add at least one documented single-test command example.

## 6) Cursor / Copilot Rules
Checked paths:
- `.cursor/rules/`
- `.cursorrules`
- `.github/copilot-instructions.md`

Current state:
- No Cursor rules found.
- No Copilot instructions file found.

If those files are added later, treat them as higher-priority guidance and update this document.

## 7) Agent Execution Checklist
- Confirm working directory is `fe/` before running scripts.
- Run `npm run lint` after non-trivial edits.
- Run `npm run build` for integration safety.
- Do not assume tests exist; verify scripts first.
- Keep changes minimal, consistent, and scoped to the request.
