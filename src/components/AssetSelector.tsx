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
}

const assetCategories = ['전체', '로고', '배경', '제품', '아이콘', '기타'];

const AssetSelector: React.FC<AssetSelectorProps> = ({ open, onClose, onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedAsset, setSelectedAsset] = useState<BrandAsset | null>(null);
  const [assets, setAssets] = useState<BrandAsset[]>([]);

  // 브랜드 허브에서 자산 불러오기
  useEffect(() => {
    if (open) {
      const savedLogos = localStorage.getItem('brandLogos');
      const savedImages = localStorage.getItem('brandImages');
      
      const allAssets: BrandAsset[] = [];
      
      if (savedLogos) {
        const logos = JSON.parse(savedLogos);
        allAssets.push(...logos);
      }
      
      if (savedImages) {
        const images = JSON.parse(savedImages);
        allAssets.push(...images);
      }
      
      setAssets(allAssets);
    }
  }, [open]);

  const filteredAssets = selectedCategory === '전체'
    ? assets
    : assets.filter((asset) => asset.category === selectedCategory);

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
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>브랜드 자산 선택</DialogTitle>
      <DialogContent>
        {/* 카테고리 필터 */}
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

        {/* 자산 그리드 */}
        {filteredAssets.length === 0 ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            {selectedCategory === '전체' 
              ? '등록된 브랜드 자산이 없습니다.' 
              : `${selectedCategory} 카테고리에 등록된 자산이 없습니다.`}
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
              브랜드 허브에서 자산을 추가하세요.
            </Link>
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {filteredAssets.map((asset) => (
              <Grid item xs={6} sm={4} md={3} key={asset.id}>
                <Card
                  sx={{
                    border: selectedAsset?.id === asset.id ? 2 : 0,
                    borderColor: 'primary.main',
                  }}
                >
                  <CardActionArea onClick={() => handleAssetClick(asset)}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={asset.thumbnailUrl}
                      alt={asset.name}
                      sx={{ objectFit: 'contain', bgcolor: 'grey.100' }}
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
        <Button onClick={handleClose}>취소</Button>
        <Button
          onClick={handleSelect}
          variant="contained"
          disabled={!selectedAsset}
        >
          선택
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssetSelector;