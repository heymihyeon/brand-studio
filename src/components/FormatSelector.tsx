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
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: theme.kiaTypography.weights.bold,
              fontSize: theme.kiaTypography.H2.fontSize,
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
      <DialogContent sx={{ fontFamily: 'KiaSignature' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: formats.length <= 3 
                ? 'repeat(3, 1fr)' 
                : formats.length === 4 
                ? 'repeat(4, 1fr)' 
                : 'repeat(3, 1fr)'
            },
            gap: 3,
            mt: 1,
          }}
        >
          {formats.map((format) => (
            <Box key={format.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 0,
                  border: `1px solid ${theme.colors.Gray[200]}`,
                  '&:hover': {
                    borderColor: theme.colors.Primary.MidnightBlack,
                    boxShadow: `0 2px 10px ${theme.colors.OpacityBlack[15]}`,
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => onSelect(format)} 
                  sx={{ 
                    height: '100%',
                    '&:hover': {
                      backgroundColor: theme.colors.OpacityBlack[3],
                    }
                  }}
                >
                  <CardContent sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    p: 3,
                  }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Stack height="143px" justifyContent="center" alignItems="center">
                        <Box
                          sx={{
                            width: (() => {
                              const ratio = format.dimensions.width / format.dimensions.height;
                              const maxWidth = 120;
                              const maxHeight = 120;
                              
                              if (ratio > 1) {
                                return maxWidth;
                              } else {
                                return Math.round(maxHeight * ratio);
                              }
                            })(),
                            height: (() => {
                              const ratio = format.dimensions.width / format.dimensions.height;
                              const maxWidth = 120;
                              const maxHeight = 120;
                              
                              if (ratio > 1) {
                                return Math.round(maxWidth / ratio);
                              } else {
                                return maxHeight;
                              }
                            })(),
                            border: `2px solid ${theme.colors.Gray[300]}`,
                            borderRadius: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                            bgcolor: theme.colors.Gray[50],
                          }}
                        >
                          <Typography 
                            variant="caption"
                            sx={{ 
                              fontSize: theme.kiaTypography.B3.fontSize,
                              textAlign: 'center',
                              px: 1,
                              color: theme.colors.Gray[600],
                              fontFamily: 'KiaSignature',
                            }}
                          >
                            {format.dimensions.width} × {format.dimensions.height}
                          </Typography>
                        </Box>
                      </Stack>
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          whiteSpace: 'pre-line',
                          fontFamily: 'KiaSignature',
                          fontWeight: theme.kiaTypography.weights.bold,
                          fontSize: theme.kiaTypography.B1.fontSize,
                          color: theme.colors.Primary.MidnightBlack,
                          lineHeight: 1.4,
                        }}
                      >
                        {category === 'Document' && (format.name === 'Car sales contract (A4)' || format.name === 'Quote' || format.name === 'Purchase Order')
                          ? `${format.name.replace(' (A4)', '')}\n(A4)`
                          : category === 'Format' && (format.name === 'Horizontal' || format.name === 'Vertical' || format.name === 'Square')
                          ? `${format.name}\n(${format.dimensions.width}×${format.dimensions.height}px)`
                          : format.name}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FormatSelector;