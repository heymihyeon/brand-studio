import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { UnifiedFormat } from '../data/unifiedFormats';

interface FormatSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (format: UnifiedFormat) => void;
  formats: UnifiedFormat[];
  category: string;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({
  open,
  onClose,
  onSelect,
  formats,
  category,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown
      PaperProps={{
        onClick: (e) => e.stopPropagation()
      }}
      BackdropProps={{
        onClick: (e) => e.stopPropagation()
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">{category} 포맷 선택</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {formats.map((format) => (
            <Grid item xs={12} sm={6} md={4} key={format.id}>
              <Card>
                <CardActionArea onClick={() => onSelect(format)}>
                  <CardContent>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          width: 120,
                          height: 80,
                          border: '2px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                          bgcolor: 'grey.50',
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {format.dimensions.width} × {format.dimensions.height}
                        </Typography>
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {format.name}
                      </Typography>
                      <Chip 
                        label={format.category} 
                        size="small" 
                        variant="outlined"
                        color="primary"
                      />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default FormatSelector;