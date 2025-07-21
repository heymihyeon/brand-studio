import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { Template } from '../types';

interface ExportDialogProps {
  open: boolean;
  onClose: () => void;
  onExport: (format: string, quality: number, fileName: string) => void;
  template: Template | null;
}

const ExportDialog: React.FC<ExportDialogProps> = ({
  open,
  onClose,
  onExport,
  template,
}) => {
  const [format, setFormat] = useState<string>('png');
  const [quality, setQuality] = useState<number>(100);
  const [fileName, setFileName] = useState<string>('');

  // Set default filename when dialog opens
  React.useEffect(() => {
    if (open && template) {
      const defaultName = `${template.name}_${new Date().toISOString().split('T')[0]}`;
      setFileName(defaultName);
    }
  }, [open, template]);

  const formatOptions = [
    { value: 'png', label: 'PNG', description: 'High quality image, supports transparent background' },
    { value: 'jpg', label: 'JPG', description: 'Compressed image, smaller file size' },
    { value: 'pdf', label: 'PDF', description: 'Document format, suitable for printing' },
  ];

  const handleExport = () => {
    const defaultFileName = template 
      ? `${template.name}_${new Date().toISOString().split('T')[0]}`
      : 'export';
    
    onExport(format, quality, fileName || defaultFileName);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Export Content</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Select File Format
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {formatOptions.map((option) => (
              <Card 
                key={option.value}
                variant={format === option.value ? 'outlined' : 'elevation'}
                sx={{ 
                  cursor: 'pointer',
                  border: format === option.value ? '2px solid' : '1px solid',
                  borderColor: format === option.value ? 'primary.main' : 'divider',
                  '&:hover': {
                    borderColor: 'primary.main',
                  }
                }}
                onClick={() => setFormat(option.value)}
              >
                <CardContent sx={{ 
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  minHeight: 100
                }}>
                  <Typography variant="h6" sx={{ mb: 0.5 }}>{option.label}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
                    {option.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder={template ? `${template.name}_${new Date().toISOString().split('T')[0]}` : 'export'}
              helperText={`Extension will be added automatically (.${format})`}
            />
          </Box>

          {format === 'jpg' && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Quality Settings
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Quality</InputLabel>
                <Select
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  label="Quality"
                >
                  <MenuItem value={100}>Highest Quality (100%)</MenuItem>
                  <MenuItem value={90}>High Quality (90%)</MenuItem>
                  <MenuItem value={80}>Medium Quality (80%)</MenuItem>
                  <MenuItem value={70}>Low Quality (70%)</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          {template && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Export Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Template: {template.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Size: {template.canvas.width} × {template.canvas.height}px
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Format: {template.format.name}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleExport}
          variant="contained"
          startIcon={<DownloadIcon />}
          disabled={!template}
        >
          Export
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportDialog;