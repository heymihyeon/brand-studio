import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip 압축 플러그인
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 10KB 이상 파일만 압축
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // 이미지 최적화 플러그인
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  // Dependencies 사전 번들링 최적화
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
      'fabric',
      'html2canvas',
      'jspdf',
      'react-is'
    ],
  },
  // 빌드 최적화
  build: {
    target: 'es2022',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 4KB 이하 이미지는 base64로 인라인 처리
    assetsInlineLimit: 4096,
    // 청크 크기 경고 한도 상향
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 코드 스플리팅으로 vendor 번들 분리
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'fabric-vendor': ['fabric'],
          'pdf-vendor': ['jspdf', 'html2canvas'],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true, // 자동으로 브라우저 열기
    hmr: {
      overlay: true, // 에러 오버레이 표시
    },
    // 개발 서버 성능 개선
    fs: {
      strict: true,
    },
  },
})
