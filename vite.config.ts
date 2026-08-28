import path from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// React 16.13.1 predates `react/jsx-runtime` (added in 16.14), so both the app's own JSX
// and svgr's generated icon components must use the classic runtime (`React.createElement`).
export default defineConfig({
	plugins: [
		react({ jsxRuntime: 'classic' }),
		// `svgrOptions.jsxRuntime` only affects the intermediate JSX svgr generates; the actual
		// JSX-to-JS lowering is a separate step controlled by `oxcOptions.jsx.runtime`.
		svgr({ svgrOptions: { jsxRuntime: 'classic' }, oxcOptions: { jsx: { runtime: 'classic' } } }),
	],
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
	server: {
		port: 3000,
	},
	preview: {
		port: 3000,
	},
	build: {
		outDir: 'build',
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/setupTests.js'],
	},
})
