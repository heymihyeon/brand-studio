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
    id: 'snow-white',
    name: 'snow-white',
    displayName: 'Snow White',
    colorCode: '#F0F0F0',
    imageUrl: '/images/cars/EV9.png',
    filter: 'saturate(0.2) hue-rotate(200deg) brightness(1.8) contrast(1.3)',
  },
  {
    id: 'aurora-black',
    name: 'aurora-black',
    displayName: 'Aurora Black',
    colorCode: '#0E1213',
    imageUrl: '/images/cars/EV9.png',
    filter: 'brightness(1.0) contrast(1.2) saturate(0.8)',
  },
  {
    id: 'glacier',
    name: 'glacier',
    displayName: 'Glacier',
    colorCode: '#979893',
    imageUrl: '/images/cars/EV9.png',
    filter: 'sepia(0.2) brightness(1.0) contrast(1.0) saturate(1.0)',
  },
  {
    id: 'yacht-blue',
    name: 'yacht-blue',
    displayName: 'Yacht Blue',
    colorCode: '#263346',
    imageUrl: '/images/cars/EV9.png',
    filter: 'brightness(1.0) contrast(1.05) saturate(6)',
  },
  {
    id: 'runway-red',
    name: 'runway-red',
    displayName: 'Runway Red',
    colorCode: '#7D2F23',
    imageUrl: '/images/cars/EV9.png',
    filter: 'saturate(6) brightness(1.0) contrast(1.05) hue-rotate(115deg)',
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