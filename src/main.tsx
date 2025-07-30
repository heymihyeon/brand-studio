import React from 'react'
import { createRoot } from 'react-dom/client'

// Enhanced error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Dynamic import with fallback
async function initApp() {
  try {
    console.log('Initializing app...');
    
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }
    
    console.log('Root element found, loading App component...');
    
    // Load the main App with idcx-admin layout
    const module = await import('./App.tsx');
    const App = module.default;
    console.log('Loaded App.tsx with idcx-admin layout');
    
    console.log('Creating React root...');
    const root = createRoot(rootElement);
    
    console.log('Rendering app...');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    
    // Fallback UI
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          font-family: sans-serif;
          text-align: center;
          padding: 20px;
        ">
          <div>
            <h1>애플리케이션을 로드할 수 없습니다</h1>
            <p>브라우저 콘솔에서 자세한 오류 정보를 확인하세요.</p>
            <p style="color: red; margin-top: 20px;">${error}</p>
            <button onclick="location.reload()" style="
              margin-top: 20px;
              padding: 10px 20px;
              background: #1976d2;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            ">새로고침</button>
          </div>
        </div>
      `;
    }
  }
}

// Initialize app
initApp();
