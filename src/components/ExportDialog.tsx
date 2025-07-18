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
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  Download as DownloadIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
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

  const formatOptions = [
    { value: 'png', label: 'PNG', icon: <ImageIcon />, description: '고품질 이미지, 투명 배경 지원' },
    { value: 'jpg', label: 'JPG', icon: <ImageIcon />, description: '압축된 이미지, 작은 파일 크기' },
    { value: 'svg', label: 'SVG', icon: <ImageIcon />, description: '벡터 형식, 무한 확대 가능' },
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
          <Typography variant="h6">콘텐츠 내보내기</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            파일 형식 선택
          </Typography>
          <Grid container spacing={2}>
            {formatOptions.map((option) => (
              <Grid item xs={12} key={option.value}>
                <Card 
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
                  <CardContent sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {option.icon}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{option.label}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {option.description}
                        </Typography>
                      </Box>
                      {format === option.value && (
                        <Chip label="선택됨" color="primary" size="small" />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="파일명"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder={template ? `${template.name}_${new Date().toISOString().split('T')[0]}` : 'export'}
              helperText={`확장자는 자동으로 추가됩니다 (.${format})`}
            />
          </Box>

          {format === 'jpg' && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                품질 설정
              </Typography>
              <FormControl fullWidth>
                <InputLabel>품질</InputLabel>
                <Select
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  label="품질"
                >
                  <MenuItem value={100}>최고 품질 (100%)</MenuItem>
                  <MenuItem value={90}>높은 품질 (90%)</MenuItem>
                  <MenuItem value={80}>중간 품질 (80%)</MenuItem>
                  <MenuItem value={70}>낮은 품질 (70%)</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          {template && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                내보내기 정보
              </Typography>
              <Typography variant="body2" color="text.secondary">
                템플릿: {template.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                크기: {template.canvas.width} × {template.canvas.height}px
              </Typography>
              <Typography variant="body2" color="text.secondary">
                형식: {template.format.name}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button 
          onClick={handleExport}
          variant="contained"
          startIcon={<DownloadIcon />}
          disabled={!template}
        >
          내보내기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportDialog;