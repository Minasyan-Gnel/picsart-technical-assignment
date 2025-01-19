import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react({ include: /\.(ts|tsx)$/ })],
  server: {
    port: 3000,
    open: true,
  },
  define: {
    'process.env': loadEnv(mode, process.cwd(), '')
  }
}));
