import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
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
          <AppLayout />
        </Router>
      </ThemeProvider>
    );
  } catch (error) {
    console.error('Error in App component:', error);
    return <div>Error loading app: {String(error)}</div>;
  }
}

function AppLayout() {
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  // 에디터 페이지인지 확인
  const isEditorPage = location.pathname.startsWith('/editor');
  
  // 에디터 페이지일 때는 전체 화면 레이아웃
  if (isEditorPage) {
    return (
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <Routes>
          <Route path="/editor/:categoryId" element={<Editor />} />
        </Routes>
      </Box>
    );
  }

  // 일반 페이지 레이아웃 (idcx-admin 구조)
  const sidebarWidth = sidebarExpanded ? 216 : 56;

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.colors.Primary.MidnightBlack,
        overflow: 'hidden',
      }}
    >
      {/* 상단 고정 헤더 */}
      <NavBar />
      
      {/* 메인 바디 (헤더 아래) */}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: 'calc(100vh - 48px)', // NavBar 높이 제외
          paddingTop: '48px', // NavBar 높이만큼 패딩
        }}
      >
        {/* 좌측 사이드바 */}
        <SideBar 
          isExpanded={sidebarExpanded}
          onToggle={() => setSidebarExpanded(!sidebarExpanded)}
        />
        
        {/* 메인 콘텐츠 영역 */}
        <Box
          component="main"
          sx={{
            flex: 1,
            marginLeft: `${sidebarWidth}px`,
            backgroundColor: theme.colors.Primary.PolarWhite,
            minHeight: 'calc(100vh - 48px)',
            overflow: 'auto',
            transition: 'margin-left 0.3s ease',
            position: 'relative',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brand-hub" element={<BrandHub />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;