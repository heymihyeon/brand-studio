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
    id: 'cyber-gray-matte',
    name: 'Cyber Gray Matte',
    displayName: 'Cyber Gray Matte',
    colorCode: '#6B7280',
    imageUrl: '/images/cars/EV9.png',
    filter: '',
    isDefault: true,
  },
  {
    id: 'gravity-gold-matte',
    name: 'Gravity Gold Matte',
    displayName: 'Gravity Gold Matte',
    colorCode: '#D4AF37',
    imageUrl: '/images/cars/EV9.png',
    filter: 'sepia(1) saturate(2) hue-rotate(35deg) brightness(1.2)',
  },
  {
    id: 'phantom-black-pearl',
    name: 'Phantom Black Pearl',
    displayName: 'Phantom Black Pearl',
    colorCode: '#1C1C1C',
    imageUrl: '/images/cars/EV9.png',
    filter: 'brightness(0.3) saturate(0.8)',
  },
  {
    id: 'digital-teal-pearl',
    name: 'Digital Teal Pearl',
    displayName: 'Digital Teal Pearl',
    colorCode: '#4A7C7A',
    imageUrl: '/images/cars/EV9.png',
    filter: 'sepia(1) saturate(1.5) hue-rotate(160deg) brightness(0.9)',
  },
  {
    id: 'shooting-star-matte',
    name: 'Shooting Star Matte',
    displayName: 'Shooting Star Matte',
    colorCode: '#8B9DC3',
    imageUrl: '/images/cars/EV9.png',
    filter: 'sepia(1) saturate(0.8) hue-rotate(200deg) brightness(1.1)',
  },
  {
    id: 'atlas-white',
    name: 'Atlas White',
    displayName: 'Atlas White',
    colorCode: '#FFFFFF',
    imageUrl: '/images/cars/EV9.png',
    filter: 'brightness(1.3) contrast(1.1)',
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