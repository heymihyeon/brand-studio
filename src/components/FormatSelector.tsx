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
  Stack
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
        onClick: (e: React.MouseEvent) => e.stopPropagation()
      }}
      BackdropProps={{
        onClick: (e: React.MouseEvent) => e.stopPropagation()
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>{category}</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {formats.map((format) => (
            <Grid item size={{xs:12,sm:6,md:formats.length <= 3 ? 4 : formats.length === 4 ? 3 : 4}} key={format.id}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea onClick={() => onSelect(format)} sx={{ height: '100%' }}>
                  <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>

                      <Stack height="143px" justifyContent="center" alignItems="center">
                      <Box
                        sx={{
                          width: (() => {
                            const ratio = format.dimensions.width / format.dimensions.height;
                            const maxWidth = 120;
                            const maxHeight = 120;

                            
                            if (ratio > 1) {
                              // 가로가 더 긴 경우
                              return maxWidth;
                            } else {
                              // 세로가 더 길거나 정사각형인 경우
                              return Math.round(maxHeight * ratio);
                            }
                          })(),
                          height: (() => {
                            const ratio = format.dimensions.width / format.dimensions.height;
                            const maxWidth = 120;
                            const maxHeight = 120;
                            
                            if (ratio > 1) {
                              // 가로가 더 긴 경우
                              return Math.round(maxWidth / ratio);
                            } else {
                              // 세로가 더 길거나 정사각형인 경우
                              return maxHeight;
                            }
                          })(),
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
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ 
                            fontSize: '10px',
                            textAlign: 'center',
                            px: 1
                          }}
                        >
                          {format.dimensions.width} × {format.dimensions.height}
                        </Typography>
                      </Box>
                      </Stack>
                      <Typography variant="h6" gutterBottom sx={{ whiteSpace: 'pre-line' }}>
                        {category === 'Document' && (format.name === 'Car sales contract (A4)' || format.name === 'Quote' || format.name === 'Purchase Order')
                          ? `${format.name.replace(' (A4)', '')}\n(A4)`
                          : category === 'Google Ads' && (format.name === 'Horizontal' || format.name === 'Vertical' || format.name === 'Square')
                          ? `${format.name}\n(${format.dimensions.width}×${format.dimensions.height}px)`
                          : format.name}
                      </Typography>
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