import React from 'react';
import { Box, Paper } from '@mui/material';

interface CanvasProps {
  template: any;
  editableValues: Record<string, any>;
}

const Canvas: React.FC<CanvasProps> = ({ template, editableValues }) => {
  return (
    <Paper elevation={3} sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box>
        <div>Canvas Placeholder</div>
        <div>Template: {template.name}</div>
      </Box>
    </Paper>
  );
};

export default Canvas;