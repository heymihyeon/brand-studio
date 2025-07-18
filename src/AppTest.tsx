import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Typography, Box } from '@mui/material';
import theme from './theme';
import Header from './components/Header';

function App() {
  console.log('AppTest component rendering with Header');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Brand Studio with Header
            </Typography>
            <Typography variant="body1">
              Testing full app structure...
            </Typography>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App