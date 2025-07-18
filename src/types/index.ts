export interface Category {
  id: string;
  name: '문서' | '프로모션 배너' | 'SNS';
  icon: string;
  description: string;
  defaultTemplate: string;
}

export interface Template {
  id: string;
  name: string;
  category: '문서' | '프로모션 배너' | 'SNS';
  format: FormatOption;
  thumbnail: string;
  canvas: CanvasData;
  editableElements: EditableElement[];
}

export interface FormatOption {
  id: string;
  name: string;
  dimensions: { width: number; height: number };
  category: '문서' | '프로모션 배너' | 'SNS';
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
  type: 'logo' | 'product' | 'background' | 'icon';
  url: string;
  thumbnailUrl: string;
  category: string;
  uploadedBy?: string;
  uploadedAt?: Date;
  fileSize?: number;
  dimensions?: { width: number; height: number };
}

export interface Content {
  id: string;
  name: string;
  templateId: string;
  category: '문서' | '프로모션 배너' | 'SNS';
  editedElements: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}