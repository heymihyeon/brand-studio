import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  IconButton,
  Stack,
  useTheme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { UnifiedFormat } from '../data/unifiedFormats';
import { CarIcon } from '../components/icons/CarIcon';

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
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown
      PaperProps={{
        onClick: (e: React.MouseEvent) => e.stopPropagation(),
        sx: {
          borderRadius: '10px',
          boxShadow: `0px 2px 10px ${theme.colors.OpacityBlack[15]}`,
          fontFamily: 'KiaSignature',
        }
      }}
      BackdropProps={{
        onClick: (e: React.MouseEvent) => e.stopPropagation()
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: 'KiaSignature',
          borderBottom: `1px solid ${theme.colors.Gray[200]}`,
          py: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: theme.kiaTypography.weights.bold,
              fontSize: '18px',
              color: theme.colors.Primary.MidnightBlack,
              fontFamily: 'KiaSignature',
            }}
          >
            {category}
          </Typography>
          <IconButton 
            onClick={onClose} 
            size="small"
            sx={{
              color: theme.colors.Gray[600],
              '&:hover': {
                backgroundColor: theme.colors.OpacityBlack[5],
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ fontFamily: 'KiaSignature', p: '24px !important', pt: '24px !important' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: 2,
            width: '100%',
          }}
        >
          {formats.map((format) => (
            <Card
              key={format.id}
              sx={{
                height: 270,
                width: '100%',
                borderRadius: '0px !important',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                border: '1px solid #e5e7eb',
                boxShadow: 'none !important',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 'none !important',
                },
                '& .MuiPaper-root': {
                  borderRadius: '0px !important',
                  boxShadow: 'none !important',
                }
              }}
            >
              <CardActionArea
                onClick={() => onSelect(format)}
                sx={{ 
                  height: '100%',
                  borderRadius: 0,
                  '& .MuiCardActionArea-focusHighlight': {
                    borderRadius: 0,
                  }
                }}
              >
                <CardContent sx={{ 
                  p: 4,
                  height: '100%',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  borderRadius: 0,
                  '&:last-child': {
                    paddingBottom: 4,
                  }
                }}>
                  {/* Format Preview */}
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                      sx={{
                        width: (() => {
                          const ratio = format.dimensions.width / format.dimensions.height;
                          const maxWidth = 160;
                          const maxHeight = 120;
                          const minHeight = 60;
                          
                          // Wide 포맷만 특별 처리 - Horizontal과 동일한 너비
                          if (format.name === 'Wide') {
                            return 160; // Horizontal과 동일한 너비로 고정
                          }
                          
                          if (ratio > 1) {
                            const calculatedHeight = Math.round(maxWidth / ratio);
                            return calculatedHeight < minHeight ? Math.round(minHeight * ratio) : maxWidth;
                          } else {
                            return Math.round(maxHeight * ratio);
                          }
                        })(),
                        height: (() => {
                          const ratio = format.dimensions.width / format.dimensions.height;
                          const maxWidth = 160;
                          const maxHeight = 120;
                          const minHeight = 60;
                          
                          // Wide 포맷만 특별 처리
                          if (format.name === 'Wide') {
                            return 60; // Wide 포맷의 높이를 45px로 설정
                          }
                          
                          if (ratio > 1) {
                            const calculatedHeight = Math.round(maxWidth / ratio);
                            return calculatedHeight < minHeight ? minHeight : calculatedHeight;
                          } else {
                            return maxHeight;
                          }
                        })(),
                        border: `1.3px solid`,
                        borderColor: 'primary.main',
                        borderRadius: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#F1F2F4',
                      }}
                    >
                      <CarIcon sx={{ fontSize: 24, color: 'primary.main' }} />
                    </Box>
                  </Box>
                  
                  {/* Text */}
                  <Box sx={{ textAlign: 'center', width: '100%' }}>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      sx={{ 
                        mb: 1, 
                        fontWeight: 700,
                        color: '#111827',
                        fontSize: '18px'
                      }}
                    >
                      {format.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#6b7280',
                        lineHeight: 1.5,
                        fontSize: '14px'
                      }}
                    >
                      {format.dimensions.width} × {format.dimensions.height}px
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FormatSelector;