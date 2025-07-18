import { Template } from '../types';

export interface UnifiedFormat {
  id: string;
  name: string;
  category: string;
  dimensions: { width: number; height: number };
  canvas: {
    width: number;
    height: number;
    backgroundColor: string;
    objects: any[];
  };
  editableElements: {
    texts: Array<{
      id: string;
      type: 'heading' | 'subheading' | 'body';
      text: string;
      position: { x: number; y: number };
      editable: boolean;
    }>;
    images: Array<{
      id: string;
      src: string;
      position: { x: number; y: number };
      size: { width: number; height: number };
      editable: boolean;
      label?: string;
    }>;
    colors: string[];
  };
  thumbnail: string;
}

export const unifiedFormats: UnifiedFormat[] = [
  // 문서 포맷
  {
    id: 'doc-contract-a4',
    name: 'Contract (A4)',
    category: 'Document',
    dimensions: { width: 595, height: 842 },
    canvas: {
      width: 595,
      height: 842,
      backgroundColor: '#FFFFFF',
      objects: [],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: 'Contract',
          position: { x: 250, y: 100 },
          editable: true,
        },
        {
          id: 'party1',
          type: 'body',
          text: 'Party 1',
          position: { x: 50, y: 200 },
          editable: true,
        },
        {
          id: 'party2',
          type: 'body',
          text: 'Party 2',
          position: { x: 50, y: 250 },
          editable: true,
        },
        {
          id: 'content',
          type: 'body',
          text: 'Enter contract details',
          position: { x: 50, y: 350 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'logo',
          src: '',
          position: { x: 450, y: 50 },
          size: { width: 100, height: 50 },
          editable: true,
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },
  {
    id: 'doc-brochure-a3',
    name: 'Brochure (A3)',
    category: 'Document',
    dimensions: { width: 842, height: 1191 },
    canvas: {
      width: 842,
      height: 1191,
      backgroundColor: '#FFFFFF',
      objects: [],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: 'Brochure Title',
          position: { x: 100, y: 100 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: 'Subtitle',
          position: { x: 100, y: 160 },
          editable: true,
        },
        {
          id: 'content',
          type: 'body',
          text: 'Enter brochure content',
          position: { x: 100, y: 600 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'main-image',
          src: '',
          position: { x: 100, y: 220 },
          size: { width: 642, height: 300 },
          editable: true,
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },

  // 프로모션 배너 포맷
  {
    id: 'banner-horizontal',
    name: 'Horizontal Banner (1280*700px)',
    category: 'Promotion Banner',
    dimensions: { width: 1280, height: 700 },
    canvas: {
      width: 1280,
      height: 700,
      backgroundColor: '#ffffff',
      objects: [
        {
          type: 'image',
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=700&fit=crop',
          left: 0,
          top: 0,
          width: 1280,
          height: 700,
          scaleX: 1,
          scaleY: 1,
        },
        {
          type: 'rect',
          id: 'overlay',
          left: 0,
          top: 0,
          width: 640,
          height: 700,
          fill: 'rgba(0, 0, 0, 0.5)',
        },
        {
          type: 'text',
          id: 'title',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          left: 50,
          top: 100,
          fontSize: 48,
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
          lineHeight: 1.2,
        },
        {
          type: 'text',
          id: 'subtitle',
          text: 'Hyundai Mobility Passport In Okinawa',
          left: 50,
          top: 300,
          fontSize: 24,
          fontWeight: 'normal',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
        },
        {
          type: 'image',
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          left: 640,
          top: 350,
          width: 600,
          height: 300,
          scaleX: 1,
          scaleY: 1,
        },
      ],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          position: { x: 50, y: 100 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: 'Hyundai Mobility Passport In Okinawa',
          position: { x: 50, y: 300 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=700&fit=crop',
          position: { x: 0, y: 0 },
          size: { width: 1280, height: 700 },
          editable: true,
          label: 'Background Image',
        },
        {
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          position: { x: 640, y: 350 },
          size: { width: 600, height: 300 },
          editable: true,
          label: 'Vehicle Model',
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },
  {
    id: 'banner-vertical',
    name: 'Vertical Banner (400*1200px)',
    category: 'Promotion Banner',
    dimensions: { width: 400, height: 1200 },
    canvas: {
      width: 400,
      height: 1200,
      backgroundColor: '#ffffff',
      objects: [
        {
          type: 'image',
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=1200&fit=crop',
          left: 0,
          top: 0,
          width: 400,
          height: 1200,
          scaleX: 1,
          scaleY: 1,
        },
        {
          type: 'rect',
          id: 'overlay',
          left: 0,
          top: 0,
          width: 400,
          height: 600,
          fill: 'rgba(0, 0, 0, 0.5)',
        },
        {
          type: 'text',
          id: 'title',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          left: 30,
          top: 100,
          fontSize: 36,
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
          lineHeight: 1.2,
        },
        {
          type: 'text',
          id: 'subtitle',
          text: 'Hyundai Mobility Passport In Okinawa',
          left: 30,
          top: 250,
          fontSize: 18,
          fontWeight: 'normal',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
        },
        {
          type: 'image',
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          left: 20,
          top: 700,
          width: 360,
          height: 180,
          scaleX: 1,
          scaleY: 1,
        },
      ],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          position: { x: 30, y: 100 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: 'Hyundai Mobility Passport In Okinawa',
          position: { x: 30, y: 250 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=1200&fit=crop',
          position: { x: 0, y: 0 },
          size: { width: 400, height: 1200 },
          editable: true,
          label: 'Background Image',
        },
        {
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          position: { x: 20, y: 700 },
          size: { width: 360, height: 180 },
          editable: true,
          label: 'Vehicle Model',
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },

  // SNS 포맷
  {
    id: 'sns-instagram-post',
    name: 'Instagram Post (1080*1080px)',
    category: 'SNS',
    dimensions: { width: 1080, height: 1080 },
    canvas: {
      width: 1080,
      height: 1080,
      backgroundColor: '#FFFFFF',
      objects: [],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: 'Instagram Post',
          position: { x: 100, y: 100 },
          editable: true,
        },
        {
          id: 'content',
          type: 'body',
          text: 'Enter post content',
          position: { x: 100, y: 800 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'main',
          src: '',
          position: { x: 100, y: 200 },
          size: { width: 880, height: 500 },
          editable: true,
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },
  {
    id: 'sns-instagram-story',
    name: 'Instagram Story (1080*1920px)',
    category: 'SNS',
    dimensions: { width: 1080, height: 1920 },
    canvas: {
      width: 1080,
      height: 1920,
      backgroundColor: '#FFFFFF',
      objects: [],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: 'Instagram Story',
          position: { x: 100, y: 200 },
          editable: true,
        },
        {
          id: 'content',
          type: 'body',
          text: 'Enter story content',
          position: { x: 100, y: 1600 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'background',
          src: '',
          position: { x: 0, y: 0 },
          size: { width: 1080, height: 1920 },
          editable: true,
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },
  {
    id: 'sns-youtube-thumbnail',
    name: 'YouTube Thumbnail (1280*720px)',
    category: 'SNS',
    dimensions: { width: 1280, height: 720 },
    canvas: {
      width: 1280,
      height: 720,
      backgroundColor: '#FF0000',
      objects: [],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: 'YouTube Thumbnail',
          position: { x: 100, y: 100 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: 'Subtitle',
          position: { x: 100, y: 500 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'main',
          src: '',
          position: { x: 100, y: 200 },
          size: { width: 1080, height: 250 },
          editable: true,
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },
  {
    id: 'sns-facebook-post',
    name: 'Facebook Post (1080*1920px)',
    category: 'SNS',
    dimensions: { width: 1080, height: 1920 },
    canvas: {
      width: 1080,
      height: 1920,
      backgroundColor: '#4267B2',
      objects: [],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: 'Facebook Post',
          position: { x: 100, y: 200 },
          editable: true,
        },
        {
          id: 'content',
          type: 'body',
          text: 'Enter post content',
          position: { x: 100, y: 1600 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'cover',
          src: '',
          position: { x: 100, y: 400 },
          size: { width: 880, height: 1000 },
          editable: true,
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },
];

export const getFormatsByCategory = (category: string): UnifiedFormat[] => {
  return unifiedFormats.filter(f => f.category === category);
};

export const getFormatById = (id: string): UnifiedFormat | null => {
  return unifiedFormats.find(f => f.id === id) || null;
};

// UnifiedFormat을 기존 Template 형식으로 변환하는 함수
export const convertToTemplate = (format: UnifiedFormat): Template => {
  return {
    id: format.id,
    name: format.name,
    category: format.category as '문서' | '프로모션 배너' | 'SNS',
    format: {
      id: format.id,
      name: format.name,
      dimensions: format.dimensions,
      category: format.category as '문서' | '프로모션 배너' | 'SNS',
    },
    thumbnail: format.thumbnail,
    canvas: format.canvas,
    editableElements: {
      texts: format.editableElements.texts,
      images: format.editableElements.images,
      colors: [],  // UnifiedFormat uses string[] but Template expects ColorElement[]
    },
  };
};