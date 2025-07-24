import { BrandAsset } from '../types';
import { vehicleModels, getDefaultVehicleModel } from './vehicleModels';

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

// vehicleModels에서 가져온 차량 데이터를 presetVehicles로 내보내기
export const presetVehicles: BrandAsset[] = vehicleModels;

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
export const getDefaultVehicle = () => getDefaultVehicleModel(); // KIA EV9 with colors
export const getDefaultBackground = () => presetBackgrounds[0]; // Showroom