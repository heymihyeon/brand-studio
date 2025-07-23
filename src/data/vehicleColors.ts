export interface VehicleColor {
  id: string;
  name: string;
  displayName: string;
  colorCode: string;
  imageUrl: string;
  filter?: string;
  isDefault?: boolean;
}

export const vehicleColors: VehicleColor[] = [
  {
    id: 'matte-silver',
    name: 'matte-silver',
    displayName: 'Matte Silver',
    colorCode: '#6B7280',
    imageUrl: '/images/cars/EV9.png',
    filter: '',
    isDefault: true,
  },
  {
    id: 'snow-whitepearl',
    name: 'snow-whitepearl',
    displayName: 'Snow White',
    colorCode: '#F0F0F0',
    imageUrl: '/images/cars/EV9.png',
    filter: 'brightness(1.3) contrast(1.1)',
  },
  {
    id: 'aurora-blackpearl',
    name: 'aurora-blackpearl',
    displayName: 'Aurora Black',
    colorCode: '#0E1213',
    imageUrl: '/images/cars/EV9.png',
    filter: 'brightness(0.3) saturate(0.8)',
  },
  {
    id: 'glacier',
    name: 'glacier',
    displayName: 'Glacier',
    colorCode: '#979893',
    imageUrl: '/images/cars/EV9.png',
    filter: 'grayscale(0.3) brightness(0.8) contrast(1.2)',
  },
  {
    id: 'yacht-blue',
    name: 'yacht-blue',
    displayName: 'Yacht Blue',
    colorCode: '#263346',
    imageUrl: '/images/cars/EV9.png',
    filter: 'sepia(1) saturate(1.5) hue-rotate(200deg) brightness(0.7)',
  },
  {
    id: 'runway-red',
    name: 'runway-red',
    displayName: 'Runway Red',
    colorCode: '#7D2F23',
    imageUrl: '/images/cars/EV9.png',
    filter: 'sepia(1) saturate(2) hue-rotate(320deg) brightness(0.8)',
  },
];

export const getDefaultVehicleColor = (): VehicleColor => {
  return vehicleColors.find(color => color.isDefault) || vehicleColors[0];
};

export const getVehicleColorById = (id: string): VehicleColor | undefined => {
  return vehicleColors.find(color => color.id === id);
};

export const getVehicleImageUrl = (colorId: string): string => {
  const color = getVehicleColorById(colorId);
  return color?.imageUrl || getDefaultVehicleColor().imageUrl;
};

export const getVehicleColorFilter = (colorId: string): string => {
  const color = getVehicleColorById(colorId);
  return color?.filter || '';
};