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
    id: 'flare-red',
    name: 'flare-red',
    displayName: 'Flare Red',
    colorCode: '#7D2F23',
    filter: 'saturate(6) brightness(1.0) contrast(1.05) hue-rotate(115deg)',
  },
  {
    id: 'panthera-metal',
    name: 'panthera-metal',
    displayName: 'Panthera Metal',
    colorCode: '#3A3A3A',
    filter: 'brightness(0.8) contrast(1.1)',
  },
  {
    id: 'ocean-blue',
    name: 'ocean-blue',
    displayName: 'Ocean Blue',
    colorCode: '#263346',
    filter: 'brightness(1.0) contrast(1.05) saturate(6)',
  },
  {
    id: 'pebble-gray',
    name: 'pebble-gray',
    displayName: 'Pebble Gray',
    colorCode: '#979893',
    filter: 'sepia(0.2) brightness(1.0) contrast(1.0) saturate(1.0)',
  },
  {
    id: 'ivory-silver',
    name: 'ivory-silver',
    displayName: 'Ivory Silver',
    colorCode: '#C0C0C0',
    filter: 'brightness(1.2) contrast(0.9)',
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
    defaultColorId: 'snow-white-pearl',
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

// Helper 함수들
export const getVehicleModelById = (id: string): VehicleModel | undefined => {
  return vehicleModels.find(model => model.id === id);
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