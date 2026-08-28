# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A Vite + React 16 (class components) app that visualizes algorithms in the browser: three sorting algorithms (bubble, quick, merge) as animated bars, and Dijkstra pathfinding on a clickable grid. Originally bootstrapped with Create React App, migrated to Vite — see "Absolute-looking imports" and the Commands section below for what that changed.

## Commands

Package manager is npm (`package-lock.json` is the lockfile; there is no `yarn.lock` despite the CRA-era README still referencing yarn).

- Install: `npm install`
- Dev server: `npm start` or `npm run dev` (http://localhost:3000, both run plain `vite`)
- Production build: `npm run build` (outputs to `build/`, not Vite's default `dist/` — kept as `build` to match `.gitignore` and the root `index.js` static server)
- Preview a production build locally: `npm run preview`
- Tests: `npm test` (watch mode via Vitest + jsdom). Run once non-interactively: `CI=true npm test -- --run`. Filter to one file the same way: `CI=true npm test -- --run SortVisualizer`.
- No separate lint/format script exists. CRA's webpack-integrated ESLint feedback (`eslintConfig` in `package.json`) went away with `react-scripts` and was not replaced — Vite doesn't lint by default. Prettier (`.prettierrc.json`: tabs, no semicolons, single quotes) is applied via editor `formatOnSave` (`.vscode/settings.json`), not a CLI command.

The Node/OpenSSL `--openssl-legacy-provider` workaround this project used to need (react-scripts 3.4.1 → webpack 4 crashing on Node ≥17) no longer applies — Vite's toolchain (esbuild/oxc/Rolldown) doesn't touch that code path.

`src/App.test.jsx` fails regardless of Node/tooling version: it renders `<App />` without a `<Router>`, and `App.jsx` renders a `<Switch>`, which throws `Invariant failed: You should not use <Switch> outside a <Router>`. This is pre-existing (confirmed still true after the Vite migration), not something you broke — wrap with `MemoryRouter` if you touch that test.

## Architecture

### Absolute-looking imports actually resolve to `src/`

Imports such as `import Card from '@/components/Card/Card'` are not filesystem-root imports — `@` is aliased to `src/`. This is configured in two places that must stay in sync:
- `vite.config.ts`: `resolve.alias`, `{ find: '@', replacement: path.resolve(__dirname, 'src') }`. This is what actually resolves the alias at build/dev time.
- `tsconfig.json`: mirrors the same `"@/*": ["src/*"]` mapping, purely so editor tooling/IntelliSense resolves the alias too.

Any new top-level folder under `src/` (e.g. `src/foo`) is automatically importable as `@/foo/...` — no extra config needed, since `@` maps straight to `src/`.

Historical note: pre-Vite, this was a bare `/foo` alias (`babel-plugin-module-resolver` via a since-deleted `.babelrc`/`jsconfig.json`). It was changed to `@/foo` during the migration — a bare leading-slash alias collides with paths Vite itself resolves internally (`/@react-refresh`, `/@fs/...`, absolute filesystem paths during dependency scanning), so don't reintroduce that pattern.

### SVG-as-component imports

`src/components/Card/Card.jsx` imports its icon as `import Sort from '@/assets/icon/sort.svg?react'` (via the `vite-plugin-svgr` plugin configured in `vite.config.ts`) rather than a plain URL import — the `?react` suffix is what turns it into a React component instead of an asset URL. `svgrOptions.jsxRuntime` and `oxcOptions.jsx.runtime` are both explicitly set to `'classic'` there; don't drop those (see "React 16 and the JSX runtime" below).

### React 16 and the JSX runtime

This project is pinned to `react@16.13.1`, which predates `react/jsx-runtime` (added in 16.14). Both `@vitejs/plugin-react` (`jsxRuntime: 'classic'`) and `vite-plugin-svgr` (`oxcOptions.jsx.runtime: 'classic'`) in `vite.config.ts` are configured for the classic runtime for this reason — switching either to the default "automatic" runtime will break at runtime with a failed `react/jsx-runtime` resolution, not a build-time error.

### Routing

`src/index.jsx` wraps `<App />` in `BrowserRouter`. `src/App.jsx` holds the only routes, inside one `<Switch>`:
- `/shorest-path` → `PathfindingVisualizer` (this misspelling of "shortest" is the real, live route — not a typo to casually "fix")
- `/sort` → `SortVisualizer`
- `/` → `Main` (landing page, links out via `Card` clicks)

### `containers/` vs `components/`

- `src/containers/*` — one per route/page (`Main`, `PathfindingVisualizer`, `SortVisualizer`), each a class component (`.jsx`) with a co-located `.scss` of the same name.
- `src/components/*` — smaller reusable pieces (`Button`, `Card`, `Fragment`, `Node`), each in its own folder with a co-located `.scss`. `src/components/index.js` is a barrel exporting only `Button`, `Fragment`, `Node` — **`Card` is intentionally left out** and is always imported by its direct path (`@/components/Card/Card`); match that existing pattern rather than folding it into the barrel unless asked to.
- `Fragment` is a custom component (`props => props.children`) that shadows `React.Fragment`, used project-wide instead of `<>...</>`. It contains no JSX itself, so — like the barrel `index.js` and the `algorithms/*` modules — it stays a plain `.js` file; only files that actually contain JSX were renamed to `.jsx` in the Vite migration.

### Visualization pattern: algorithms mutate the DOM directly, not React state

`src/algorithms/{bubble_sort,quick_sort,merge_sort}.js` don't just compute a sorted array — each comparison/swap step schedules a `setTimeout` that mutates bar elements directly via `document.getElementById('sort-${i}')` (inline height/class changes), matching the DOM ids rendered by `SortVisualizer`. Each algorithm module:
1. Accepts the array plus the container's `timeouts` array and pushes its own `setTimeout` handles onto it, so `SortVisualizer.resetArray()` can `clearTimeout` everything when resetting or starting a new sort mid-animation.
2. Calls back into React exactly once, after the last scheduled timeout (`cb(arr)`, wired to `setState`), to commit the final array to state.

A new sort algorithm needs to follow this same `(array, ..., timeouts, cb)` shape and the `sort-${i}` id convention to plug into `SortVisualizer` unchanged.

`src/algorithms/dijkstra.js` follows the same DOM-coupling idea for the grid (`PathfindingVisualizer` owns a `nodes` grid in state; walls are encoded by negating a node's `row`/`col`). Its exported `findPathGraph`/`travelGraph` memoize into **module-level** `find_path`/`travel` variables, computed only `if (... === null)` — they're never reset back to `null`. Practical effect: re-clicking "Visualize Dijkstra's Algorithm" after moving the start/end or adding walls replays the *first* run's result instead of recomputing. Fixing that requires resetting that module-level state, not just container state.

### Styling

Every component/container has a co-located `.scss` imported directly into its `.js`/`.jsx` file — there's no CSS Modules scoping, so class names are global (avoid colliding with existing ones like `.node`, `.bar`, `.card-container`). Sass compiles via the `sass` (Dart Sass) devDependency, auto-detected by Vite; `node-sass` was removed from this project.
