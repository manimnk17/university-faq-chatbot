import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // usually src, adjust if needed
      },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    base: './', // This is good for relative paths in iframes
    server: {
      port: 5174, // or any port you want
      cors: true, // allow iframe embedding in dev
      headers: {
        'Access-Control-Allow-Origin': '*', // avoid cross-origin issues in dev
      },
    },
    build: {
      outDir: 'dist',
    },
  };
});
