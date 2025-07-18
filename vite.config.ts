import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  server: {
    port: 5173,
    open: true, // 자동으로 브라우저 열기
    hmr: {
      overlay: true, // 에러 오버레이 표시
    },
  },
})
