import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import theme from './theme';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components to prevent loading errors
const Header = React.lazy(() => import('./components/Header'));
const Home = React.lazy(() => import('./pages/Home'));
const Editor = React.lazy(() => import('./pages/Editor'));
const BrandHub = React.lazy(() => import('./pages/BrandHub'));

// Loading component
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/editor/:categoryId" element={<Editor />} />
              <Route path="/brand-hub" element={<BrandHub />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;