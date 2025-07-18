import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Chip,
  Paper,
  Stack,
  Divider,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CloudUpload as UploadIcon,
  Palette as PaletteIcon,
  TextFields as FontIcon,
  Image as ImageIcon,
  AccountCircle as LogoIcon,
} from '@mui/icons-material';
import { BrandAsset, ColorPalette, FontStyle } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const BrandHub: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  
  // 로고 관리
  const [logos, setLogos] = useState<BrandAsset[]>([]);
  const [logoDialogOpen, setLogoDialogOpen] = useState(false);
  const [logoForm, setLogoForm] = useState({ name: '', file: null as File | null });
  
  // 색상 관리
  const [colorPalettes, setColorPalettes] = useState<ColorPalette[]>([]);
  const [colorDialogOpen, setColorDialogOpen] = useState(false);
  const [colorForm, setColorForm] = useState({ name: '', colors: ['#1F7AFC'] });
  
  // 폰트 관리
  const [fonts, setFonts] = useState<FontStyle[]>([]);
  const [fontDialogOpen, setFontDialogOpen] = useState(false);
  const [fontForm, setFontForm] = useState({
    name: '',
    fontFamily: '',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    file: null as File | null,
  });
  
  // 이미지 관리
  const [images, setImages] = useState<BrandAsset[]>([]);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageForm, setImageForm] = useState({ name: '', category: '배경', file: null as File | null });
  
  // 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const savedLogos = localStorage.getItem('brandLogos');
    const savedColors = localStorage.getItem('brandColors');
    const savedFonts = localStorage.getItem('brandFonts');
    const savedImages = localStorage.getItem('brandImages');
    
    if (savedLogos) setLogos(JSON.parse(savedLogos));
    if (savedColors) setColorPalettes(JSON.parse(savedColors));
    if (savedFonts) setFonts(JSON.parse(savedFonts));
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    } else {
      // 샘플 이미지 추가
      const sampleImages: BrandAsset[] = [
        // 차량 이미지
        {
          id: 'vehicle-1',
          name: '아이오닉 5 (Gravity Gold)',
          url: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          category: '제품',
          type: 'image',
        },
        {
          id: 'vehicle-2',
          name: '아이오닉 6 (Serenity White)',
          url: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq6-24pe-side-45-serenity-white-pearl.png',
          category: '제품',
          type: 'image',
        },
        {
          id: 'vehicle-3',
          name: '코나 일렉트릭',
          url: 'https://www.hyundai.com/contents/repn-car/side-45/kona-electric-24pe-side-45-ecotronic-gray.png',
          category: '제품',
          type: 'image',
        },
        // 배경 이미지
        {
          id: 'bg-1',
          name: '오키나와 해변',
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&h=360&fit=crop',
          category: '배경',
          type: 'image',
        },
        {
          id: 'bg-2',
          name: '도시 야경',
          url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=2000&h=360&fit=crop',
          category: '배경',
          type: 'image',
        },
        {
          id: 'bg-3',
          name: '산 풍경',
          url: 'https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=2000&h=360&fit=crop',
          category: '배경',
          type: 'image',
        },
      ];
      setImages(sampleImages);
      localStorage.setItem('brandImages', JSON.stringify(sampleImages));
    }
  }, []);

  // 로고 관리 함수들
  const handleLogoUpload = () => {
    if (logoForm.file && logoForm.name) {
      const newLogo: BrandAsset = {
        id: Date.now().toString(),
        name: logoForm.name,
        type: 'logo',
        url: URL.createObjectURL(logoForm.file),
        thumbnailUrl: URL.createObjectURL(logoForm.file),
        category: '로고',
        uploadedAt: new Date(),
        fileSize: logoForm.file.size,
        dimensions: { width: 300, height: 200 },
      };
      const newLogos = [...logos, newLogo];
      setLogos(newLogos);
      localStorage.setItem('brandLogos', JSON.stringify(newLogos));
      setLogoDialogOpen(false);
      setLogoForm({ name: '', file: null });
    }
  };

  const handleLogoDelete = (id: string) => {
    if (confirm('로고를 삭제하시겠습니까?')) {
      const newLogos = logos.filter(logo => logo.id !== id);
      setLogos(newLogos);
      localStorage.setItem('brandLogos', JSON.stringify(newLogos));
    }
  };

  // 색상 관리 함수들
  const handleColorPaletteAdd = () => {
    if (colorForm.name && colorForm.colors.length > 0) {
      const newPalette: ColorPalette = {
        id: Date.now().toString(),
        name: colorForm.name,
        colors: colorForm.colors,
      };
      const newPalettes = [...colorPalettes, newPalette];
      setColorPalettes(newPalettes);
      localStorage.setItem('brandColors', JSON.stringify(newPalettes));
      setColorDialogOpen(false);
      setColorForm({ name: '', colors: ['#1F7AFC'] });
    }
  };

  const handleColorPaletteDelete = (id: string) => {
    if (confirm('색상 팔레트를 삭제하시겠습니까?')) {
      const newPalettes = colorPalettes.filter(palette => palette.id !== id);
      setColorPalettes(newPalettes);
      localStorage.setItem('brandColors', JSON.stringify(newPalettes));
    }
  };

  const handleColorAdd = () => {
    setColorForm({ ...colorForm, colors: [...colorForm.colors, '#FFFFFF'] });
  };

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...colorForm.colors];
    newColors[index] = color;
    setColorForm({ ...colorForm, colors: newColors });
  };

  const handleColorRemove = (index: number) => {
    const newColors = colorForm.colors.filter((_, i) => i !== index);
    setColorForm({ ...colorForm, colors: newColors });
  };

  // 폰트 관리 함수들
  const handleFontUpload = () => {
    if (fontForm.name && fontForm.fontFamily) {
      const newFont: FontStyle = {
        id: Date.now().toString(),
        name: fontForm.name,
        fontFamily: fontForm.fontFamily,
        fontSize: fontForm.fontSize,
        fontWeight: fontForm.fontWeight,
        lineHeight: fontForm.lineHeight,
      };
      const newFonts = [...fonts, newFont];
      setFonts(newFonts);
      localStorage.setItem('brandFonts', JSON.stringify(newFonts));
      setFontDialogOpen(false);
      setFontForm({ name: '', fontFamily: '', fontSize: 16, fontWeight: 400, lineHeight: 1.5, file: null });
    }
  };

  const handleFontDelete = (id: string) => {
    if (confirm('폰트를 삭제하시겠습니까?')) {
      const newFonts = fonts.filter(font => font.id !== id);
      setFonts(newFonts);
      localStorage.setItem('brandFonts', JSON.stringify(newFonts));
    }
  };

  // 이미지 관리 함수들
  const handleImageUpload = () => {
    if (imageForm.file && imageForm.name) {
      const newImage: BrandAsset = {
        id: Date.now().toString(),
        name: imageForm.name,
        type: 'image',
        url: URL.createObjectURL(imageForm.file),
        thumbnailUrl: URL.createObjectURL(imageForm.file),
        category: imageForm.category,
        uploadedAt: new Date(),
        fileSize: imageForm.file.size,
        dimensions: { width: 400, height: 300 },
      };
      const newImages = [...images, newImage];
      setImages(newImages);
      localStorage.setItem('brandImages', JSON.stringify(newImages));
      setImageDialogOpen(false);
      setImageForm({ name: '', category: '배경', file: null });
    }
  };

  const handleImageDelete = (id: string) => {
    if (confirm('이미지를 삭제하시겠습니까?')) {
      const newImages = images.filter(image => image.id !== id);
      setImages(newImages);
      localStorage.setItem('brandImages', JSON.stringify(newImages));
    }
  };

  return (
    <Box sx={{ 
      py: 4, 
      px: 4, 
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
        <Typography variant="h4" component="h1" gutterBottom>
        브랜드 허브
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        브랜드 일관성을 유지하기 위한 자산들을 관리하세요.
      </Typography>

        <Paper sx={{ width: '100%' }}>
          <Tabs 
            value={currentTab} 
            onChange={(_, newValue) => setCurrentTab(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab icon={<LogoIcon />} label="로고" />
            <Tab icon={<PaletteIcon />} label="색상" />
            <Tab icon={<FontIcon />} label="폰트" />
            <Tab icon={<ImageIcon />} label="이미지" />
          </Tabs>

          {/* 로고 관리 */}
          <TabPanel value={currentTab} index={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">브랜드 로고</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setLogoDialogOpen(true)}
              >
                로고 추가
              </Button>
            </Box>
            
            {logos.length === 0 ? (
              <Alert severity="info">등록된 로고가 없습니다. 로고를 추가해보세요.</Alert>
            ) : (
              <Grid container spacing={3}>
                {logos.map((logo) => (
                  <Grid item xs={12} sm={6} md={4} key={logo.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        image={logo.url}
                        alt={logo.name}
                        sx={{ objectFit: 'contain', bgcolor: 'grey.50' }}
                      />
                      <CardContent>
                        <Typography variant="h6" noWrap>{logo.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {logo.dimensions?.width} × {logo.dimensions?.height}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton onClick={() => handleLogoDelete(logo.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>

          {/* 색상 관리 */}
          <TabPanel value={currentTab} index={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">브랜드 색상</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setColorDialogOpen(true)}
              >
                색상 팔레트 추가
              </Button>
            </Box>
            
            {colorPalettes.length === 0 ? (
              <Alert severity="info">등록된 색상 팔레트가 없습니다. 색상을 추가해보세요.</Alert>
            ) : (
              <Grid container spacing={3}>
                {colorPalettes.map((palette) => (
                  <Grid item xs={12} sm={6} md={4} key={palette.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>{palette.name}</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {palette.colors.map((color, index) => (
                            <Box
                              key={index}
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: color,
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1,
                                mb: 1,
                              }}
                            />
                          ))}
                        </Stack>
                      </CardContent>
                      <CardActions>
                        <IconButton onClick={() => handleColorPaletteDelete(palette.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>

          {/* 폰트 관리 */}
          <TabPanel value={currentTab} index={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">브랜드 폰트</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setFontDialogOpen(true)}
              >
                폰트 추가
              </Button>
            </Box>
            
            {fonts.length === 0 ? (
              <Alert severity="info">등록된 폰트가 없습니다. 폰트를 추가해보세요.</Alert>
            ) : (
              <Grid container spacing={3}>
                {fonts.map((font) => (
                  <Grid item xs={12} sm={6} md={4} key={font.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>{font.name}</Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontFamily: font.fontFamily,
                            fontSize: font.fontSize,
                            fontWeight: font.fontWeight,
                            lineHeight: font.lineHeight,
                            mb: 1
                          }}
                        >
                          {font.fontFamily}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          크기: {font.fontSize}px, 굵기: {font.fontWeight}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton onClick={() => handleFontDelete(font.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>

          {/* 이미지 관리 */}
          <TabPanel value={currentTab} index={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">브랜드 이미지</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setImageDialogOpen(true)}
              >
                이미지 추가
              </Button>
            </Box>
            
            {images.length === 0 ? (
              <Alert severity="info">등록된 이미지가 없습니다. 이미지를 추가해보세요.</Alert>
            ) : (
              <Grid container spacing={3}>
                {images.map((image) => (
                  <Grid item xs={12} sm={6} md={4} key={image.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        image={image.url}
                        alt={image.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="h6" noWrap>{image.name}</Typography>
                        <Chip label={image.category} size="small" />
                      </CardContent>
                      <CardActions>
                        <IconButton onClick={() => handleImageDelete(image.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>
        </Paper>

        {/* 로고 업로드 다이얼로그 */}
        <Dialog open={logoDialogOpen} onClose={() => setLogoDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>로고 추가</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="로고 이름"
                value={logoForm.name}
                onChange={(e) => setLogoForm({ ...logoForm, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<UploadIcon />}
              >
                로고 파일 선택
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setLogoForm({ ...logoForm, file: e.target.files?.[0] || null })}
                />
              </Button>
              {logoForm.file && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  선택된 파일: {logoForm.file.name}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLogoDialogOpen(false)}>취소</Button>
            <Button onClick={handleLogoUpload} variant="contained" disabled={!logoForm.name || !logoForm.file}>
              추가
            </Button>
          </DialogActions>
        </Dialog>

        {/* 색상 팔레트 추가 다이얼로그 */}
        <Dialog open={colorDialogOpen} onClose={() => setColorDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>색상 팔레트 추가</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="팔레트 이름"
                value={colorForm.name}
                onChange={(e) => setColorForm({ ...colorForm, name: e.target.value })}
                sx={{ mb: 3 }}
              />
              <Typography variant="subtitle1" gutterBottom>색상</Typography>
              <Stack spacing={2}>
                {colorForm.colors.map((color, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      style={{ width: 40, height: 40, border: 'none', borderRadius: 4 }}
                    />
                    <TextField
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      sx={{ flexGrow: 1 }}
                      size="small"
                    />
                    <IconButton onClick={() => handleColorRemove(index)} disabled={colorForm.colors.length <= 1}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
              <Button onClick={handleColorAdd} sx={{ mt: 2 }}>
                색상 추가
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setColorDialogOpen(false)}>취소</Button>
            <Button onClick={handleColorPaletteAdd} variant="contained" disabled={!colorForm.name}>
              추가
            </Button>
          </DialogActions>
        </Dialog>

        {/* 폰트 추가 다이얼로그 */}
        <Dialog open={fontDialogOpen} onClose={() => setFontDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>폰트 추가</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="폰트 이름"
                value={fontForm.name}
                onChange={(e) => setFontForm({ ...fontForm, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="폰트 패밀리"
                value={fontForm.fontFamily}
                onChange={(e) => setFontForm({ ...fontForm, fontFamily: e.target.value })}
                placeholder="예: Arial, Helvetica, sans-serif"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="폰트 크기"
                type="number"
                value={fontForm.fontSize}
                onChange={(e) => setFontForm({ ...fontForm, fontSize: Number(e.target.value) })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="폰트 굵기"
                type="number"
                value={fontForm.fontWeight}
                onChange={(e) => setFontForm({ ...fontForm, fontWeight: Number(e.target.value) })}
                sx={{ mb: 2 }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFontDialogOpen(false)}>취소</Button>
            <Button onClick={handleFontUpload} variant="contained" disabled={!fontForm.name || !fontForm.fontFamily}>
              추가
            </Button>
          </DialogActions>
        </Dialog>

        {/* 이미지 추가 다이얼로그 */}
        <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>이미지 추가</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="이미지 이름"
                value={imageForm.name}
                onChange={(e) => setImageForm({ ...imageForm, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>카테고리</InputLabel>
                <Select
                  value={imageForm.category}
                  onChange={(e) => setImageForm({ ...imageForm, category: e.target.value })}
                  label="카테고리"
                >
                  <MenuItem value="배경">배경</MenuItem>
                  <MenuItem value="제품">제품</MenuItem>
                  <MenuItem value="아이콘">아이콘</MenuItem>
                  <MenuItem value="기타">기타</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<UploadIcon />}
              >
                이미지 파일 선택
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setImageForm({ ...imageForm, file: e.target.files?.[0] || null })}
                />
              </Button>
              {imageForm.file && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  선택된 파일: {imageForm.file.name}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setImageDialogOpen(false)}>취소</Button>
            <Button onClick={handleImageUpload} variant="contained" disabled={!imageForm.name || !imageForm.file}>
              추가
            </Button>
          </DialogActions>
        </Dialog>
    </Box>
  );
};

export default BrandHub;