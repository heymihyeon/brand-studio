import { BrandAsset } from '../types';

export const presetLogos: BrandAsset[] = [
  {
    id: 'logo-preset-1',
    name: 'KIA Logo White',
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
    name: 'KIA Logo Black',
    type: 'logo',
    url: '/images/logos/logo_black.png',
    thumbnailUrl: '/images/logos/logo_black.png',
    category: 'Logo',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 300, height: 100 },
  },
];

export const presetVehicles: BrandAsset[] = [
  {
    id: 'vehicle-preset-1',
    name: 'KIA EV9',
    url: '/images/cars/EV9.png',
    thumbnailUrl: '/images/cars/EV9.png',
    category: 'Vehicle Models',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 800, height: 450 },
  },
  {
    id: 'vehicle-preset-2',
    name: 'KIA K5',
    url: '/images/cars/K5.png',
    thumbnailUrl: '/images/cars/K5.png',
    category: 'Vehicle Models',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 800, height: 450 },
  },
  {
    id: 'vehicle-preset-3',
    name: 'KIA Seltos',
    url: '/images/cars/seltos.png',
    thumbnailUrl: '/images/cars/seltos.png',
    category: 'Vehicle Models',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 800, height: 450 },
  },
  {
    id: 'vehicle-preset-4',
    name: 'KIA Telluride',
    url: '/images/cars/telluride.png',
    thumbnailUrl: '/images/cars/telluride.png',
    category: 'Vehicle Models',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 800, height: 450 },
  },
  {
    id: 'vehicle-preset-5',
    name: 'KIA Carnival',
    url: '/images/cars/carnival.png',
    thumbnailUrl: '/images/cars/carnival.png',
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
    name: 'Showroom',
    url: '/images/backgrounds/showroom.png',
    thumbnailUrl: '/images/backgrounds/showroom.png',
    category: 'Background Images',
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
    category: 'Background Images',
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
    category: 'Background Images',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 1920, height: 1080 },
  },
];

// 기본값으로 사용할 프리셋 getter 함수들
export const getDefaultLogo = () => presetLogos[0]; // KIA Logo White
export const getDefaultVehicle = () => presetVehicles[0]; // KIA EV9
export const getDefaultBackground = () => presetBackgrounds[0]; // Showroom