import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  Box,
  Chip,
  Alert,
  Link,
} from '@mui/material';
import { BrandAsset } from '../types';

interface AssetSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (asset: BrandAsset) => void;
  filterCategory?: string; // 특정 카테고리만 표시
}

const assetCategories = ['All', 'Logo', 'Background', 'Vehicle', 'Icon', 'Other'];

const AssetSelector: React.FC<AssetSelectorProps> = ({ open, onClose, onSelect, filterCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(filterCategory || 'All');
  const [selectedAsset, setSelectedAsset] = useState<BrandAsset | null>(null);
  const [assets, setAssets] = useState<BrandAsset[]>([]);

  // Load assets from Brand Hub
  useEffect(() => {
    if (open && assets.length === 0) {
      
      const savedLogos = localStorage.getItem('brandLogos');
      const savedVehicles = localStorage.getItem('brandVehicles');
      const savedBackgrounds = localStorage.getItem('brandBackgrounds');
      
      console.log('AssetSelector Loading Assets:');
      console.log('- Logos:', savedLogos ? 'found' : 'not found');
      console.log('- Vehicles:', savedVehicles ? 'found' : 'not found');
      console.log('- Backgrounds:', savedBackgrounds ? 'found' : 'not found');
      
      const allAssets: BrandAsset[] = [];
      
      if (savedLogos) {
        const logos = JSON.parse(savedLogos);
        allAssets.push(...logos);
      }
      
      if (savedVehicles) {
        const vehicles = JSON.parse(savedVehicles);
        console.log('Loaded vehicles:', vehicles);
        allAssets.push(...vehicles);
      }
      
      if (savedBackgrounds) {
        const backgrounds = JSON.parse(savedBackgrounds);
        console.log('Loaded backgrounds:', backgrounds);
        allAssets.push(...backgrounds);
      }
      
      console.log('Total assets loaded:', allAssets.length);
      setAssets(allAssets);
    }
  }, [open]);

  // filterCategory가 있으면 해당 카테고리만 표시
  const baseAssets = filterCategory 
    ? assets.filter((asset) => {
        // 브랜드 허브의 실제 카테고리와 매핑
        console.log('AssetSelector: Filtering asset', asset.name, 'with category', asset.category, 'against filter', filterCategory);
        if (filterCategory === 'Vehicle Models') {
          return asset.category === 'Vehicle';
        }
        if (filterCategory === 'Background Images') {
          return asset.category === 'Background';
        }
        return asset.category === filterCategory;
      })
    : assets;
    
  console.log('AssetSelector: filterCategory =', filterCategory);
  console.log('AssetSelector: Total assets =', assets.length);
  console.log('AssetSelector: Filtered assets =', baseAssets.length);
    
  const filteredAssets = selectedCategory === 'All'
    ? baseAssets
    : baseAssets.filter((asset) => asset.category === selectedCategory);

  const handleAssetClick = (asset: BrandAsset) => {
    setSelectedAsset(asset);
  };

  const handleSelect = () => {
    if (selectedAsset) {
      onSelect(selectedAsset);
      setSelectedAsset(null);
    }
  };

  const handleClose = () => {
    setSelectedAsset(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth disableRestoreFocus>
      <DialogTitle>
        {filterCategory === 'Background Images' ? 'Select Background Image' : 
         filterCategory === 'Vehicle Models' ? 'Select Vehicle Model' : 
         'Select Brand Asset'}
      </DialogTitle>
      <DialogContent>
        {/* Category filter - filterCategory가 없을 때만 표시 */}
        {!filterCategory && (
          <Box sx={{ mb: 2 }}>
            {assetCategories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        )}

        {/* Asset grid */}
        {filteredAssets.length === 0 ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            {selectedCategory === 'All' 
              ? 'No brand assets registered.' 
              : `No assets registered in ${selectedCategory} category.`}
            <br />
            <Link 
              href="/brand-hub" 
              onClick={(e) => {
                e.preventDefault();
                handleClose();
                window.location.hash = '#/brand-hub';
              }}
              sx={{ cursor: 'pointer' }}
            >
              Add assets from Brand Hub.
            </Link>
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {filteredAssets.map((asset) => (
              <Grid size={{xs:4, sm:4, md:4}} key={asset.id}>
                <Card
                  sx={{
                    border: selectedAsset?.id === asset.id ? 2 : 0,
                    borderColor: 'primary.main',
                  }}
                >
                  <CardActionArea onClick={() => handleAssetClick(asset)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={asset.thumbnailUrl}
                      alt={asset.name}
                      sx={{ objectFit: 'cover', bgcolor: 'grey.100' }}
                    />
                    <Box sx={{ p: 1 }}>
                      <Typography variant="body2" noWrap>
                        {asset.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {asset.category}
                      </Typography>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSelect}
          variant="contained"
          disabled={!selectedAsset}
        >
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssetSelector;