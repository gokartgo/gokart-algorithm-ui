import path from 'node:path'
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	plugins: [react(), svgr()],
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
