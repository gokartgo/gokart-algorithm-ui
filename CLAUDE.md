# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A Create React App (React 16, class components) that visualizes algorithms in the browser: three sorting algorithms (bubble, quick, merge) as animated bars, and Dijkstra pathfinding on a clickable grid. Bootstrapped with CRA 3.4.1 but run through `react-app-rewired`/`customize-cra` (`config-overrides.js`) so that a root `.babelrc` is honored — plain `react-scripts` ignores it.

## Commands

Package manager is npm (`package-lock.json` is the lockfile; there is no `yarn.lock` despite the CRA-default README still referencing yarn).

- Install: `npm install`
- Dev server: `npm start` (http://localhost:3000)
- Production build: `npm run build`
- Tests: `npm test` (watch mode via Jest, wrapped by `react-app-rewired test`). Run once non-interactively: `CI=true npm test -- --watchAll=false`. Filter to one file the same way Jest does: `CI=true npm test -- --watchAll=false SortVisualizer`.
- No separate lint/format script exists — ESLint (`react-app` config, in `package.json`) runs as part of the webpack build/start, and Prettier (`.prettierrc.json`: tabs, no semicolons, single quotes) is applied via editor `formatOnSave` (`.vscode/settings.json`), not a CLI command.

### Node/OpenSSL gotcha (verified on Node 20)

This stack is react-scripts 3.4.1 → webpack 4, which crashes on Node ≥17 with `error:0308010C:digital envelope routines::unsupported`. The `start` script already sets `NODE_OPTIONS=--openssl-legacy-provider`, but **`build` does not** — `npm run build` fails as-is on modern Node. Prefix it yourself:

```
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

`npm test` does not need this (Jest doesn't invoke webpack), but the checked-in `src/App.test.js` currently fails regardless of Node version: it renders `<App />` without a `<Router>`, and `App.js` renders a `<Switch>`, which throws `Invariant failed: You should not use <Switch> outside a <Router>`. This is pre-existing, not something you broke — wrap with `MemoryRouter` if you touch that test.

## Architecture

### Absolute-looking imports actually resolve to `src/`

Imports such as `import Card from '/components/Card/Card'` are not filesystem-root imports — `/` is aliased to `src/`. This is configured in two places that must stay in sync:
- `.babelrc`: `babel-plugin-module-resolver` with `root: ["./src"]`, `alias: { "/": "./src/" }`. Only takes effect because `config-overrides.js` calls `useBabelRc()`.
- `jsconfig.json`: mirrors the same `"/*": ["src/*"]` mapping, purely so editor tooling/IntelliSense resolves the alias too.

Any new top-level folder under `src/` (e.g. `src/foo`) is automatically importable as `/foo/...` — no extra config needed.

### Routing

`src/index.js` wraps `<App />` in `BrowserRouter`. `src/App.js` holds the only routes, inside one `<Switch>`:
- `/shorest-path` → `PathfindingVisualizer` (this misspelling of "shortest" is the real, live route — not a typo to casually "fix")
- `/sort` → `SortVisualizer`
- `/` → `Main` (landing page, links out via `Card` clicks)

### `containers/` vs `components/`

- `src/containers/*` — one per route/page (`Main`, `PathfindingVisualizer`, `SortVisualizer`), each a class component with a co-located `.scss` of the same name.
- `src/components/*` — smaller reusable pieces (`Button`, `Card`, `Fragment`, `Node`), each in its own folder with a co-located `.scss`. `src/components/index.js` is a barrel exporting only `Button`, `Fragment`, `Node` — **`Card` is intentionally left out** and is always imported by its direct path (`/components/Card/Card`); match that existing pattern rather than folding it into the barrel unless asked to.
- `Fragment` is a custom component (`props => props.children`) that shadows `React.Fragment`, used project-wide instead of `<>...</>`.

### Visualization pattern: algorithms mutate the DOM directly, not React state

`src/algorithms/{bubble_sort,quick_sort,merge_sort}.js` don't just compute a sorted array — each comparison/swap step schedules a `setTimeout` that mutates bar elements directly via `document.getElementById('sort-${i}')` (inline height/class changes), matching the DOM ids rendered by `SortVisualizer`. Each algorithm module:
1. Accepts the array plus the container's `timeouts` array and pushes its own `setTimeout` handles onto it, so `SortVisualizer.resetArray()` can `clearTimeout` everything when resetting or starting a new sort mid-animation.
2. Calls back into React exactly once, after the last scheduled timeout (`cb(arr)`, wired to `setState`), to commit the final array to state.

A new sort algorithm needs to follow this same `(array, ..., timeouts, cb)` shape and the `sort-${i}` id convention to plug into `SortVisualizer` unchanged.

`src/algorithms/dijkstra.js` follows the same DOM-coupling idea for the grid (`PathfindingVisualizer` owns a `nodes` grid in state; walls are encoded by negating a node's `row`/`col`). Its exported `findPathGraph`/`travelGraph` memoize into **module-level** `find_path`/`travel` variables, computed only `if (... === null)` — they're never reset back to `null`. Practical effect: re-clicking "Visualize Dijkstra's Algorithm" after moving the start/end or adding walls replays the *first* run's result instead of recomputing. Fixing that requires resetting that module-level state, not just container state.

### Styling

Every component/container has a co-located `.scss` imported directly into its `.js` — there's no CSS Modules scoping, so class names are global (avoid colliding with existing ones like `.node`, `.bar`, `.card-container`). Sass compiles via the `sass` (Dart Sass) devDependency; `node-sass` was removed from this project.
