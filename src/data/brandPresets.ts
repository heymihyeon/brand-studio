import { BrandAsset } from '../types';

export const presetLogos: BrandAsset[] = [
  {
    id: 'logo-preset-1',
    name: 'Hyundai Horizontal Logo',
    type: 'logo',
    url: '/images/logos/horizontal.svg',
    thumbnailUrl: '/images/logos/horizontal.svg',
    category: 'Logo',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 300, height: 100 },
  },
  {
    id: 'logo-preset-2',
    name: 'Hyundai Square Logo',
    type: 'logo',
    url: '/images/logos/square.svg',
    thumbnailUrl: '/images/logos/square.svg',
    category: 'Logo',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 200, height: 200 },
  },
];

export const presetVehicles: BrandAsset[] = [
  {
    id: 'vehicle-preset-1',
    name: 'INSTER',
    url: '/images/cars/inster.png',
    thumbnailUrl: '/images/cars/inster.png',
    category: 'Vehicle Models',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 800, height: 450 },
  },
  {
    id: 'vehicle-preset-2',
    name: 'KONA Electronic',
    url: '/images/cars/kona_electronic.png',
    thumbnailUrl: '/images/cars/kona_electronic.png',
    category: 'Vehicle Models',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 800, height: 450 },
  },
  {
    id: 'vehicle-preset-3',
    name: 'IONIQ 9',
    url: '/images/cars/ioniq9.png',
    thumbnailUrl: '/images/cars/ioniq9.png',
    category: 'Vehicle Models',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 800, height: 450 },
  },
  {
    id: 'vehicle-preset-4',
    name: 'All About EV',
    url: '/images/cars/all_about_EV.png',
    thumbnailUrl: '/images/cars/all_about_EV.png',
    category: 'Vehicle Models',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 800, height: 450 },
  },
];

export const presetBackgrounds: BrandAsset[] = [
  {
    id: 'bg-preset-1',
    name: 'Road 2',
    url: '/images/backgrounds/road_2.jpg',
    thumbnailUrl: '/images/backgrounds/road_2.jpg',
    category: 'Background Images',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 1920, height: 1080 },
  },
  {
    id: 'bg-preset-2',
    name: 'Black',
    url: '/images/backgrounds/black.jpg',
    thumbnailUrl: '/images/backgrounds/black.jpg',
    category: 'Background Images',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 1920, height: 1080 },
  },
  {
    id: 'bg-preset-3',
    name: 'Road 1',
    url: '/images/backgrounds/road_1.jpg',
    thumbnailUrl: '/images/backgrounds/road_1.jpg',
    category: 'Background Images',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 1920, height: 1080 },
  },
  
];

// 기본값으로 사용할 프리셋 getter 함수들
export const getDefaultLogo = () => presetLogos[0]; // Horizontal Logo
export const getDefaultVehicle = () => presetVehicles[0]; // INSTER
export const getDefaultBackground = () => presetBackgrounds[0]; // Black background