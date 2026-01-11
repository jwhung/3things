import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        'newtab': resolve(__dirname, 'newtab.html'),
        'popup': resolve(__dirname, 'popup.html'),
      },
      output: {
        // 使用不同的 chunk 分离策略
        manualChunks(id) {
          // 将所有 node_modules 放入 vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // 其他代码保持各自独立
          return null;
        },
      },
    },
  },
})
