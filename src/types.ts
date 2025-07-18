export interface Category {
  id: string;
  name: 'Document' | 'Promotion Banner' | 'Brochure';
  icon: string;
  description: string;
  defaultTemplate: string;
}

export interface RecentWork {
  id: string;
  name: string;
  thumbnail: string;
  category: 'Document' | 'Promotion Banner' | 'Brochure';
  templateId: string;
  lastModified: Date;
  canEdit: boolean;
  canDuplicate: boolean;
  canDelete: boolean;
  canRename: boolean;
  data: any; // Canvas data
}

export interface Template {
  id: string;
  name: string;
  category: 'Document' | 'Promotion Banner' | 'Brochure';
  format: FormatOption;
  thumbnail: string;
  canvas: CanvasData;
  editableElements: {
    texts: TextElement[];
    images: ImageElement[];
    colors: ColorElement[];
  };
}

export interface TextElement {
  id: string;
  type: 'heading' | 'subheading' | 'body';
  text: string;
  position: { x: number; y: number };
  editable: boolean;
}

export interface ImageElement {
  id: string;
  src: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  editable: boolean;
  label?: string; // Add label property for better categorization
}

export interface ColorElement {
  id: string;
  elementId: string; // ID of the element to apply color
  type: 'fill' | 'stroke';
  value: string;
  editable: boolean;
}

export interface FormatOption {
  id: string;
  name: string;
  dimensions: { width: number; height: number };
  category: 'Document' | 'Promotion Banner' | 'Brochure';
}

export interface CanvasData {
  width: number;
  height: number;
  backgroundColor: string;
  objects: CanvasObject[];
}

export interface CanvasObject {
  id: string;
  type: 'text' | 'image' | 'shape';
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number;
  properties: any;
  locked: boolean;
  editable?: boolean;
}

export interface EditableElement {
  id: string;
  type: 'title' | 'content' | 'image';
  value: string | BrandAsset;
  placeholder?: string;
  constraints?: {
    maxLength?: number;
    allowedAssetTypes?: string[];
  };
}

export interface BrandAsset {
  id: string;
  name: string;
  type: 'logo' | 'color' | 'font' | 'image';
  url?: string;
  thumbnailUrl?: string;
  value?: string; // For colors and fonts
  category?: string;
  uploadedBy?: string;
  uploadedAt?: Date;
  fileSize?: number;
  dimensions?: { width: number; height: number };
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
}

export interface FontStyle {
  id: string;
  name: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
}

export interface BrandColors {
  palettes: ColorPalette[];
}

export interface BrandFonts {
  heading: FontStyle;
  subheading: FontStyle;
  body: FontStyle;
}

export interface Content {
  id: string;
  name: string;
  templateId: string;
  category: 'Document' | 'Promotion Banner' | 'Brochure';
  editedElements: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}