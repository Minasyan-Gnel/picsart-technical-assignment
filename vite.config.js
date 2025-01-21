import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      react({ include: /\.(ts|tsx)$/ }),
      viteCompression({
        ext: '.gz',
        threshold: 1024,
        algorithm: 'gzip',
        deleteOriginFile: false,
      }),
    ],
    server: {
      port: 3000,
      open: true,
    },
    define: {
      'process.env': loadEnv(mode, process.cwd(), '')
    },
    resolve: {
      dedupe: ['react', 'react-dom'], 
    },
    build: {
      outDir: 'dist',
      target: 'esnext',
      sourcemap: !isProduction,
      minify: isProduction,
      optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom'],
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
