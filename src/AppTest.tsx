import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Typography, Box } from '@mui/material';
import theme from './theme';

function App() {
  console.log('AppTest component rendering');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Brand Studio Test
            </Typography>
            <Typography variant="body1">
              Testing theme system...
            </Typography>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App