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
  Block as BlockIcon,
} from '@mui/icons-material';
import { BrandAsset as BrandAssetType, ColorPalette, FontStyle } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{p:3}}>
      {value === index && <Box >{children}</Box>}
    </Box>
  );
};

const BrandAsset: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  
  // Logo management
  const [logos, setLogos] = useState<BrandAssetType[]>([]);
  const [logoDialogOpen, setLogoDialogOpen] = useState(false);
  const [logoForm, setLogoForm] = useState({ name: '', file: null as File | null });
  
  // Color management
  const [colorPalettes, setColorPalettes] = useState<ColorPalette[]>([]);
  const [colorDialogOpen, setColorDialogOpen] = useState(false);
  const [colorForm, setColorForm] = useState({ name: '', colors: ['#1F7AFC'] });
  
  // Vehicle Models management
  const [vehicleModels, setVehicleModels] = useState<BrandAssetType[]>([]);
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false);
  const [vehicleForm, setVehicleForm] = useState({ name: '', file: null as File | null });
  
  // Background Images management
  const [backgroundImages, setBackgroundImages] = useState<BrandAssetType[]>([]);
  const [backgroundDialogOpen, setBackgroundDialogOpen] = useState(false);
  const [backgroundForm, setBackgroundForm] = useState({ name: '', file: null as File | null });
  
  // Profanity Filter management
  const [profanityWords, setProfanityWords] = useState<string[]>([]);
  const [profanityDialogOpen, setProfanityDialogOpen] = useState(false);
  const [profanityForm, setProfanityForm] = useState({ word: '' });

  const addPresetLogoImage =()=>{

    // Add preset logos
    const presetLogos: BrandAssetType[] = [
      {
        id: 'logo-preset-1',
        name: 'Logo White',
        type: 'logo',
        url: '/images/logos/logo_white.png',
        thumbnailUrl: '/images/logos/logo_white.png',
        category: 'Logo',
        uploadedAt: new Date(),
        fileSize: 0,
        dimensions: { width: 300, height: 100 },
      },
      {
        id: 'logo-preset-2',
        name: 'Logo Black',
        type: 'logo',
        url: '/images/logos/logo_black.png',
        thumbnailUrl: '/images/logos/logo_black.png',
        category: 'Logo',
        uploadedAt: new Date(),
        fileSize: 0,
        dimensions: { width: 300, height: 100 },
      },
    ];
    setLogos(presetLogos);
    localStorage.setItem('brandLogos', JSON.stringify(presetLogos));

  }
  
  // Load data from local storage
  useEffect(() => {
    const savedColors = localStorage.getItem('brandColors');
    const savedVehicles = localStorage.getItem('brandVehicles');
    const savedBackgrounds = localStorage.getItem('brandBackgrounds');
    const savedProfanity = localStorage.getItem('profanityWords');

    
    addPresetLogoImage()
    
    
    
    if (savedColors) setColorPalettes(JSON.parse(savedColors));
    
    // Add preset vehicle images
    const presetVehicles: BrandAssetType[] = [
      {
        id: 'vehicle-preset-1',
        name: 'EV9',
        url: '/images/cars/EV9.png',
        thumbnailUrl: '/images/cars/EV9.png',
        category: 'Vehicle',
        type: 'image',
        uploadedAt: new Date(),
        fileSize: 0,
        dimensions: { width: 800, height: 450 },
      },
      {
        id: 'vehicle-preset-2',
        name: 'K8',
        url: '/images/cars/k8.png',
        thumbnailUrl: '/images/cars/k8.png',
        category: 'Vehicle',
        type: 'image',
        uploadedAt: new Date(),
        fileSize: 0,
        dimensions: { width: 800, height: 450 },
      },
      {
        id: 'vehicle-preset-5',
        name: 'Carnival',
        url: '/images/cars/carnival.png',
        thumbnailUrl: '/images/cars/carnival.png',
        category: 'Vehicle',
        type: 'image',
        uploadedAt: new Date(),
        fileSize: 0,
        dimensions: { width: 800, height: 450 },
      },
    ];
    
    // Always use presets for vehicles (ignore saved data)
    setVehicleModels(presetVehicles);
    localStorage.setItem('brandVehicles', JSON.stringify(presetVehicles));
    
    // Add preset background images
    const presetBackgrounds: BrandAssetType[] = [
      {
        id: 'bg-preset-1',
        name: 'Showroom',
        url: '/images/backgrounds/showroom.png',
        thumbnailUrl: '/images/backgrounds/showroom.png',
        category: 'Background',
        type: 'image',
        uploadedAt: new Date(),
        fileSize: 0,
        dimensions: { width: 1920, height: 1080 },
      },
      {
        id: 'bg-preset-2',
        name: 'Deck',
        url: '/images/backgrounds/deck.png',
        thumbnailUrl: '/images/backgrounds/deck.png',
        category: 'Background',
        type: 'image',
        uploadedAt: new Date(),
        fileSize: 0,
        dimensions: { width: 1920, height: 1080 },
      },
      {
        id: 'bg-preset-3',
        name: 'Black 3D',
        url: '/images/backgrounds/black-3d.jpg',
        thumbnailUrl: '/images/backgrounds/black-3d.jpg',
        category: 'Background',
        type: 'image',
        uploadedAt: new Date(),
        fileSize: 0,
        dimensions: { width: 1920, height: 1080 },
      },
    ];
    
    // Always use presets for backgrounds (ignore saved data)
    setBackgroundImages(presetBackgrounds);
    localStorage.setItem('brandBackgrounds', JSON.stringify(presetBackgrounds));
    
    // Load profanity words with defaults
    const defaultProfanityWords = ['damn', 'shit', 'crap', 'hell', 'asshole'];
    if (savedProfanity) {
      const savedWords = JSON.parse(savedProfanity);
      // Merge with defaults, avoiding duplicates
      const allWords = [...new Set([...defaultProfanityWords, ...savedWords])];
      setProfanityWords(allWords);
      localStorage.setItem('profanityWords', JSON.stringify(allWords));
    } else {
      // Set defaults for first time
      setProfanityWords(defaultProfanityWords);
      localStorage.setItem('profanityWords', JSON.stringify(defaultProfanityWords));
    }
  }, []);

  // Logo management functions
  const handleLogoUpload = () => {
    if (logoForm.file && logoForm.name) {
      const newLogo: BrandAssetType = {
        id: Date.now().toString(),
        name: logoForm.name,
        type: 'logo',
        url: URL.createObjectURL(logoForm.file),
        thumbnailUrl: URL.createObjectURL(logoForm.file),
        category: 'Logo',
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
    if (confirm('Are you sure you want to delete this logo?')) {
      const newLogos = logos.filter(logo => logo.id !== id);
      setLogos(newLogos);
      localStorage.setItem('brandLogos', JSON.stringify(newLogos));
    }
  };

  // Color management functions
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
    if (confirm('Are you sure you want to delete this color palette?')) {
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

  // Vehicle Model management functions
  const handleVehicleUpload = () => {
    if (vehicleForm.file && vehicleForm.name) {
      const newVehicle: BrandAssetType = {
        id: Date.now().toString(),
        name: vehicleForm.name,
        type: 'image',
        url: URL.createObjectURL(vehicleForm.file),
        thumbnailUrl: URL.createObjectURL(vehicleForm.file),
        category: 'Vehicle',
        uploadedAt: new Date(),
        fileSize: vehicleForm.file.size,
        dimensions: { width: 600, height: 300 },
      };
      const newVehicles = [...vehicleModels, newVehicle];
      setVehicleModels(newVehicles);
      localStorage.setItem('brandVehicles', JSON.stringify(newVehicles));
      setVehicleDialogOpen(false);
      setVehicleForm({ name: '', file: null });
    }
  };

  const handleVehicleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this vehicle model?')) {
      const newVehicles = vehicleModels.filter(vehicle => vehicle.id !== id);
      setVehicleModels(newVehicles);
      localStorage.setItem('brandVehicles', JSON.stringify(newVehicles));
    }
  };

  // Background Image management functions
  const handleBackgroundUpload = () => {
    if (backgroundForm.file && backgroundForm.name) {
      const newBackground: BrandAssetType = {
        id: Date.now().toString(),
        name: backgroundForm.name,
        type: 'image',
        url: URL.createObjectURL(backgroundForm.file),
        thumbnailUrl: URL.createObjectURL(backgroundForm.file),
        category: 'Background',
        uploadedAt: new Date(),
        fileSize: backgroundForm.file.size,
        dimensions: { width: 1280, height: 700 },
      };
      const newBackgrounds = [...backgroundImages, newBackground];
      setBackgroundImages(newBackgrounds);
      localStorage.setItem('brandBackgrounds', JSON.stringify(newBackgrounds));
      setBackgroundDialogOpen(false);
      setBackgroundForm({ name: '', file: null });
    }
  };

  const handleBackgroundDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this background image?')) {
      const newBackgrounds = backgroundImages.filter(bg => bg.id !== id);
      setBackgroundImages(newBackgrounds);
      localStorage.setItem('brandBackgrounds', JSON.stringify(newBackgrounds));
    }
  };

  // Profanity Filter management functions
  const handleProfanityAdd = () => {
    if (profanityForm.word.trim() && !profanityWords.includes(profanityForm.word.trim().toLowerCase())) {
      const newWords = [...profanityWords, profanityForm.word.trim().toLowerCase()];
      setProfanityWords(newWords);
      localStorage.setItem('profanityWords', JSON.stringify(newWords));
      setProfanityDialogOpen(false);
      setProfanityForm({ word: '' });
    }
  };

  const handleProfanityDelete = (word: string) => {
    if (confirm(`Are you sure you want to delete "${word}"?`)) {
      const newWords = profanityWords.filter(w => w !== word);
      setProfanityWords(newWords);
      localStorage.setItem('profanityWords', JSON.stringify(newWords));
    }
  };

  return (
    <Box sx={{ 
      padding: 4,
      minHeight: '100vh',
    }}>

      <Typography variant="h2" component="h1" gutterBottom align="left"  sx={{ mb: 4 ,lineHeight:1.3,letterSpacing:"-1px"}}>
      Brand Asset
      </Typography>  

      
      
      

        <Paper sx={{ 
          width: '100%',
          boxShadow: '0 1px 12px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
          borderRadius: '8px',
        }}>
          <Tabs 
            value={currentTab} 
            onChange={(_, newValue) => setCurrentTab(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab icon={<LogoIcon />} label="Logo" sx={{py:2}}/>
            <Tab icon={<PaletteIcon />} label="Colors" sx={{py:2}} />
            <Tab icon={<ImageIcon />} label="Vehicle Models" sx={{py:2}}/>
            <Tab icon={<ImageIcon />} label="Background Images" sx={{py:2}}/>
            <Tab icon={<BlockIcon />} label="Profanity Filter" sx={{py:2}}/>
          </Tabs>

          {/* Logo Management */}
          <TabPanel value={currentTab} index={0} >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontSize: '18px' }}>Brand Logos</Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => setLogoDialogOpen(true)}
                sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
              >
                Add Logo
              </Button>
            </Box>
            
            {logos.length === 0 ? (
              <Alert severity="info">No logos registered. Please add a logo.</Alert>
            ) : (
              <Grid container spacing={3}>
                {logos.map((logo) => (
                  <Grid size={{xs:6,sm:4,md:3,lg:3}} key={logo.id}>
                    <Card sx={{ border: '1px solid #e5e7eb' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={logo.url}
                        alt={logo.name}
                        sx={{ objectFit: 'contain', bgcolor: '#EEEFF1' }}
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

          {/* Color Management */}
          <TabPanel value={currentTab} index={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontSize: '18px' }}>Brand Colors</Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => setColorDialogOpen(true)}
                sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
              >
                Add Color Palette
              </Button>
            </Box>
            
            {colorPalettes.length === 0 ? (
              <Alert severity="info">No color palettes registered. Please add colors.</Alert>
            ) : (
              <Grid container spacing={3}>
                {colorPalettes.map((palette) => (
                  <Grid size={{xs:6,sm:4,md:3,lg:3}} key={palette.id}>
                    <Card sx={{ border: '1px solid #e5e7eb' }}>
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

          {/* Vehicle Models Management */}
          <TabPanel value={currentTab} index={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontSize: '18px' }}>Vehicle Models</Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => setVehicleDialogOpen(true)}
                sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
              >
                Add Vehicle Model
              </Button>
            </Box>
            
            {vehicleModels.length === 0 ? (
              <Alert severity="info">No vehicle models registered. Please add a vehicle model.</Alert>
            ) : (
              <Grid container spacing={3}>
                {vehicleModels.map((vehicle) => (
                  <Grid size={{xs:6,sm:4,md:3,lg:3}} key={vehicle.id}>
                    <Card sx={{ border: '1px solid #e5e7eb' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={vehicle.url}
                        alt={vehicle.name}
                        sx={{ objectFit: 'contain', bgcolor: '#EEEFF1' }}
                      />
                      <CardContent>
                        <Typography variant="h6" noWrap>{vehicle.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {vehicle.dimensions?.width} × {vehicle.dimensions?.height}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton onClick={() => handleVehicleDelete(vehicle.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>

          {/* Background Images Management */}
          <TabPanel value={currentTab} index={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontSize: '18px' }}>Background Images</Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => setBackgroundDialogOpen(true)}
                sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
              >
                Add Background Image
              </Button>
            </Box>
            
            {backgroundImages.length === 0 ? (
              <Alert severity="info">No background images registered. Please add a background image.</Alert>
            ) : (
              <Grid container spacing={3}>
                {backgroundImages.map((bg) => (
                  <Grid size={{xs:6,sm:4,md:3,lg:3}} key={bg.id}>
                    <Card sx={{ border: '1px solid #e5e7eb' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={bg.url}
                        alt={bg.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="h6" noWrap>{bg.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {bg.dimensions?.width} × {bg.dimensions?.height}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton onClick={() => handleBackgroundDelete(bg.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>

          {/* Profanity Filter Management */}
          <TabPanel value={currentTab} index={4}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontSize: '18px' }}>Profanity Filter</Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => setProfanityDialogOpen(true)}
                sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
              >
                Add Word
              </Button>
            </Box>
            
            {profanityWords.length === 0 ? (
              <Alert severity="info">No profanity words registered. Please add words to filter.</Alert>
            ) : (
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {profanityWords.length} word{profanityWords.length !== 1 ? 's' : ''} registered
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {profanityWords.map((word, index) => (
                    <Chip
                      key={index}
                      label={word}
                      onDelete={() => handleProfanityDelete(word)}
                      sx={{ mb: 1 }}
                      color="error"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </TabPanel>
        </Paper>

        {/* Logo Upload Dialog */}
        <Dialog open={logoDialogOpen} onClose={() => setLogoDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add Logo</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Logo Name"
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
                Select Logo File
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) {
                      // 파일명에서 확장자 제거
                      const fileName = file.name.replace(/\.[^/.]+$/, '');
                      setLogoForm({ 
                        ...logoForm, 
                        file: file,
                        name: fileName // 파일명으로 자동 대체
                      });
                    } else {
                      setLogoForm({ ...logoForm, file: null });
                    }
                  }}
                />
              </Button>
              {logoForm.file && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {logoForm.file.name}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLogoDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleLogoUpload} variant="contained" disabled={!logoForm.name || !logoForm.file}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Color Palette Dialog */}
        <Dialog open={colorDialogOpen} onClose={() => setColorDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add Color Palette</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Palette Name"
                value={colorForm.name}
                onChange={(e) => setColorForm({ ...colorForm, name: e.target.value })}
                sx={{ mb: 3 }}
              />
              <Typography variant="subtitle1" gutterBottom>Colors</Typography>
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
                Add Color
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setColorDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleColorPaletteAdd} variant="contained" disabled={!colorForm.name}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Vehicle Model Dialog */}
        <Dialog open={vehicleDialogOpen} onClose={() => setVehicleDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add Vehicle Model</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Vehicle Model Name"
                value={vehicleForm.name}
                onChange={(e) => setVehicleForm({ ...vehicleForm, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<UploadIcon />}
              >
                Select Vehicle Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) {
                      // 파일명에서 확장자 제거
                      const fileName = file.name.replace(/\.[^/.]+$/, '');
                      setVehicleForm({ 
                        ...vehicleForm, 
                        file: file,
                        name: fileName // 파일명으로 자동 대체
                      });
                    } else {
                      setVehicleForm({ ...vehicleForm, file: null });
                    }
                  }}
                />
              </Button>
              {vehicleForm.file && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {vehicleForm.file.name}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVehicleDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleVehicleUpload} variant="contained" disabled={!vehicleForm.name || !vehicleForm.file}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Background Image Dialog */}
        <Dialog open={backgroundDialogOpen} onClose={() => setBackgroundDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add Background Image</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Background Image Name"
                value={backgroundForm.name}
                onChange={(e) => setBackgroundForm({ ...backgroundForm, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<UploadIcon />}
              >
                Select Background Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) {
                      // 파일명에서 확장자 제거
                      const fileName = file.name.replace(/\.[^/.]+$/, '');
                      setBackgroundForm({ 
                        ...backgroundForm, 
                        file: file,
                        name: fileName // 파일명으로 자동 대체
                      });
                    } else {
                      setBackgroundForm({ ...backgroundForm, file: null });
                    }
                  }}
                />
              </Button>
              {backgroundForm.file && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {backgroundForm.file.name}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setBackgroundDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleBackgroundUpload} variant="contained" disabled={!backgroundForm.name || !backgroundForm.file}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Profanity Word Dialog */}
        <Dialog open={profanityDialogOpen} onClose={() => setProfanityDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add Profanity Word</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Profanity Word"
                value={profanityForm.word}
                onChange={(e) => setProfanityForm({ word: e.target.value })}
                placeholder="Enter word to filter"
                helperText="Text containing this word will be highlighted and save/download will be restricted."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setProfanityDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleProfanityAdd} 
              variant="contained" 
              disabled={!profanityForm.word.trim() || profanityWords.includes(profanityForm.word.trim().toLowerCase())}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
    </Box>
  );
};

export default BrandAsset;