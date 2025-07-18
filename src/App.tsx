import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import Home from './pages/Home';
import Editor from './pages/Editor';
import BrandHub from './pages/BrandHub';


function App() {
  console.log('App component rendering');
  try {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/editor/:categoryId" element={<EditorLayout />} />
            <Route path="/*" element={<MainLayout />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  } catch (error) {
    console.error('Error in App component:', error);
    return <div>Error loading app: {String(error)}</div>;
  }
}

function EditorLayout() {
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Editor />
    </Box>
  );
}

function MainLayout() {
  const location = useLocation();
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* 좌측 고정 사이드바 - 에디터가 아닌 경우만 렌더링 */}
      {!location.pathname.startsWith('/editor') && <Header />}
      
      {/* 메인 콘텐츠 영역 */}
      <Box
        component="main"
        sx={{
          flex: 1,
          backgroundColor: '#f9fafb',
          minHeight: '100vh',
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brand-hub" element={<BrandHub />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App

// Updated
