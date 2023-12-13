import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/admins': {
        target: 'https://www.healthify.my.id',
        changeOrigin: true,
        secure: false,      
      },
    },
},
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    testMatch: ['**/__tests__/**/*.test.(js|jsx)'],
    globals: true
  },

})
