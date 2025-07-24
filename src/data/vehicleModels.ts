import { BrandAsset } from '../types';

export interface VehicleColor {
  id: string;
  name: string;
  displayName: string;
  colorCode: string;
  filter?: string;
  isDefault?: boolean;
}

export interface VehicleModel extends BrandAsset {
  modelId: string;
  availableColors: VehicleColor[];
  defaultColorId: string;
}

// EV9 색상 옵션
const ev9Colors: VehicleColor[] = [
  {
    id: 'ivory-matte-silver',
    name: 'ivory-matte-silver',
    displayName: 'Ivory Matte Silver',
    colorCode: '#B8B8B8',
    filter: 'brightness(1.1) contrast(0.95) saturate(0.8)',
    isDefault: true,
  },
  {
    id: 'snow-white-pearl',
    name: 'snow-white-pearl',
    displayName: 'Snow White Pearl',
    colorCode: '#F0F0F0',
    filter: 'saturate(0.2) hue-rotate(200deg) brightness(1.8) contrast(1.3)',
  },
  {
    id: 'panthera-metal',
    name: 'panthera-metal',
    displayName: 'Panthera Metal',
    colorCode: '#3A3A3A',
    filter: 'brightness(0.8) contrast(1.1)',
  },
  {
    id: 'ocean-matte-blue',
    name: 'ocean-matte-blue',
    displayName: 'Ocean Matte Blue',
    colorCode: '#2C4B6B',
    filter: 'brightness(1.0) contrast(1.1) saturate(2) hue-rotate(-10deg)',
  },
  {
    id: 'iceberg-green',
    name: 'iceberg-green',
    displayName: 'Iceberg Green',
    colorCode: '#4A6741',
    filter: 'brightness(1.0) contrast(1.1) saturate(1.5) hue-rotate(-15deg)',
  },
];

// K5 색상 옵션
const k5Colors: VehicleColor[] = [
  {
    id: 'snow-white-pearl',
    name: 'snow-white-pearl',
    displayName: 'Snow White Pearl',
    colorCode: '#F0F0F0',
    filter: 'saturate(0.2) hue-rotate(200deg) brightness(1.8) contrast(1.3)',
    isDefault: true,
  },
  {
    id: 'aurora-black-pearl',
    name: 'aurora-black-pearl',
    displayName: 'Aurora Black Pearl',
    colorCode: '#0E1213',
    filter: 'brightness(1.0) contrast(1.2) saturate(0.8)',
  },
  {
    id: 'wolf-gray',
    name: 'wolf-gray',
    displayName: 'Wolf Gray',
    colorCode: '#6B7280',
    filter: '',
  },
  {
    id: 'gravity-blue',
    name: 'gravity-blue',
    displayName: 'Gravity Blue',
    colorCode: '#1E3A5F',
    filter: 'brightness(1.0) contrast(1.05) saturate(4) hue-rotate(-10deg)',
  },
];

// Seltos 색상 옵션
const seltosColors: VehicleColor[] = [
  {
    id: 'snow-white-pearl',
    name: 'snow-white-pearl',
    displayName: 'Snow White Pearl',
    colorCode: '#F0F0F0',
    filter: 'saturate(0.2) hue-rotate(200deg) brightness(1.8) contrast(1.3)',
  },
  {
    id: 'gravity-gray',
    name: 'gravity-gray',
    displayName: 'Gravity Gray',
    colorCode: '#4A4A4A',
    filter: 'brightness(0.9) contrast(1.1)',
    isDefault: true,
  },
  {
    id: 'neptune-blue',
    name: 'neptune-blue',
    displayName: 'Neptune Blue',
    colorCode: '#0052CC',
    filter: 'brightness(1.1) contrast(1.2) saturate(3)',
  },
  {
    id: 'starbright-yellow',
    name: 'starbright-yellow',
    displayName: 'Starbright Yellow',
    colorCode: '#FFD700',
    filter: 'brightness(1.3) contrast(1.1) saturate(2) hue-rotate(-20deg)',
  },
];

// Telluride 색상 옵션
const tellurideColors: VehicleColor[] = [
  {
    id: 'everlasting-silver',
    name: 'everlasting-silver',
    displayName: 'Everlasting Silver',
    colorCode: '#B8B8B8',
    filter: 'brightness(1.1) contrast(0.95)',
    isDefault: true,
  },
  {
    id: 'ebony-black',
    name: 'ebony-black',
    displayName: 'Ebony Black',
    colorCode: '#1A1A1A',
    filter: 'brightness(0.9) contrast(1.3) saturate(0.7)',
  },
  {
    id: 'dark-moss',
    name: 'dark-moss',
    displayName: 'Dark Moss',
    colorCode: '#2F4F2F',
    filter: 'brightness(0.9) contrast(1.1) saturate(1.5) hue-rotate(-20deg)',
  },
  {
    id: 'sangria',
    name: 'sangria',
    displayName: 'Sangria',
    colorCode: '#5C1F1F',
    filter: 'brightness(1.0) contrast(1.2) saturate(3) hue-rotate(10deg)',
  },
];

// Carnival 색상 옵션
const carnivalColors: VehicleColor[] = [
  {
    id: 'snow-white-pearl',
    name: 'snow-white-pearl',
    displayName: 'Snow White Pearl',
    colorCode: '#F0F0F0',
    filter: 'saturate(0.2) hue-rotate(200deg) brightness(1.8) contrast(1.3)',
    isDefault: true,
  },
  {
    id: 'astra-blue',
    name: 'astra-blue',
    displayName: 'Astra Blue',
    colorCode: '#002F6C',
    filter: 'brightness(1.1) contrast(1.15) saturate(5)',
  },
  {
    id: 'platinum-graphite',
    name: 'platinum-graphite',
    displayName: 'Platinum Graphite',
    colorCode: '#5A5A5A',
    filter: 'brightness(0.95) contrast(1.05)',
  },
];

// 차량 모델 데이터
export const vehicleModels: VehicleModel[] = [
  {
    id: 'ev9-default',
    modelId: 'ev9',
    name: 'KIA EV9',
    url: '/images/cars/EV9.png',
    thumbnailUrl: '/images/cars/EV9.png',
    category: 'Vehicle Models',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 800, height: 450 },
    availableColors: ev9Colors,
    defaultColorId: 'ivory-matte-silver',
  },
  {
    id: 'k5-default',
    modelId: 'k5',
    name: 'KIA K5',
    url: '/images/cars/K5.png',
    thumbnailUrl: '/images/cars/K5.png',
    category: 'Vehicle Models',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 800, height: 450 },
    availableColors: k5Colors,
    defaultColorId: 'snow-white-pearl',
  },
  {
    id: 'seltos-default',
    modelId: 'seltos',
    name: 'KIA Seltos',
    url: '/images/cars/seltos.png',
    thumbnailUrl: '/images/cars/seltos.png',
    category: 'Vehicle Models',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 800, height: 450 },
    availableColors: seltosColors,
    defaultColorId: 'gravity-gray',
  },
  {
    id: 'telluride-default',
    modelId: 'telluride',
    name: 'KIA Telluride',
    url: '/images/cars/telluride.png',
    thumbnailUrl: '/images/cars/telluride.png',
    category: 'Vehicle Models',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 800, height: 450 },
    availableColors: tellurideColors,
    defaultColorId: 'everlasting-silver',
  },
  {
    id: 'carnival-default',
    modelId: 'carnival',
    name: 'KIA Carnival',
    url: '/images/cars/carnival.png',
    thumbnailUrl: '/images/cars/carnival.png',
    category: 'Vehicle Models',
    type: 'image',
    uploadedAt: new Date(),
    fileSize: 0,
    dimensions: { width: 800, height: 450 },
    availableColors: carnivalColors,
    defaultColorId: 'snow-white-pearl',
  },
];

// ID 매핑 (BrandHub의 vehicle-preset ID들을 vehicleModels ID로 매핑)
const vehicleIdMapping: Record<string, string> = {
  'vehicle-preset-1': 'ev9-default',
  'vehicle-preset-2': 'k5-default', 
  'vehicle-preset-4': 'seltos-default',
  'vehicle-preset-5': 'telluride-default',
  'vehicle-preset-6': 'carnival-default',
};

// Helper 함수들
export const getVehicleModelById = (id: string): VehicleModel | undefined => {
  // 먼저 직접 ID로 찾기
  let model = vehicleModels.find(model => model.id === id);
  
  // 없으면 매핑된 ID로 찾기
  if (!model && vehicleIdMapping[id]) {
    model = vehicleModels.find(model => model.id === vehicleIdMapping[id]);
  }
  
  return model;
};

export const getDefaultVehicleModel = (): VehicleModel => {
  return vehicleModels[0]; // EV9
};

export const getVehicleColorForModel = (modelId: string, colorId: string): VehicleColor | undefined => {
  const model = vehicleModels.find(m => m.id === modelId);
  if (!model) return undefined;
  
  return model.availableColors.find(color => color.id === colorId);
};

export const getDefaultColorForModel = (modelId: string): VehicleColor | undefined => {
  const model = vehicleModels.find(m => m.id === modelId);
  if (!model) return undefined;
  
  const defaultColorId = model.defaultColorId;
  return model.availableColors.find(color => color.id === defaultColorId) || model.availableColors[0];
};