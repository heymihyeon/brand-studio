import { Template } from '../types';

export interface UnifiedFormat {
  id: string;
  name: string;
  category: string;
  dimensions: { width: number; height: number };
  templateVariant?: 'default' | 'bottom-left' | 'top-right' | 'center' | 'bottom' | 'middle' | 'top' | 'right';
  formatGroup?: string; // 같은 포맷의 템플릿들을 그룹화
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
    id: 'doc-quote',
    name: 'Quote',
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
          text: 'QUOTATION',
          position: { x: 250, y: 80 },
          editable: true,
        },
        {
          id: 'quote-number',
          type: 'subheading',
          text: 'Quote #: Q-2025-001',
          position: { x: 50, y: 150 },
          editable: true,
        },
        {
          id: 'customer',
          type: 'body',
          text: 'Customer Name',
          position: { x: 50, y: 200 },
          editable: true,
        },
        {
          id: 'items',
          type: 'body',
          text: 'Item details and pricing',
          position: { x: 50, y: 300 },
          editable: true,
        },
        {
          id: 'total',
          type: 'subheading',
          text: 'Total: $0.00',
          position: { x: 400, y: 600 },
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
    id: 'doc-purchase-order',
    name: 'Purchase Order',
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
          text: 'PURCHASE ORDER',
          position: { x: 250, y: 80 },
          editable: true,
        },
        {
          id: 'po-number',
          type: 'subheading',
          text: 'PO #: PO-2025-001',
          position: { x: 50, y: 150 },
          editable: true,
        },
        {
          id: 'vendor',
          type: 'body',
          text: 'Vendor Name',
          position: { x: 50, y: 200 },
          editable: true,
        },
        {
          id: 'ship-to',
          type: 'body',
          text: 'Ship To Address',
          position: { x: 300, y: 200 },
          editable: true,
        },
        {
          id: 'items',
          type: 'body',
          text: 'Item details and quantities',
          position: { x: 50, y: 300 },
          editable: true,
        },
        {
          id: 'total',
          type: 'subheading',
          text: 'Total: $0.00',
          position: { x: 400, y: 600 },
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
    category: 'Brochure',
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

  // 프로모션 배너 포맷 - Horizontal Banner Templates
  // Template 1: Default (텍스트 왼쪽 상단)
  {
    id: 'banner-horizontal-default',
    name: 'Horizontal Banner (1280*700px)',
    category: 'Promotion Banner',
    dimensions: { width: 1280, height: 700 },
    templateVariant: 'default',
    formatGroup: 'banner-horizontal',
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
          top: 220,
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
          position: { x: 50, y: 220 },
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
  
  // Template 2: Bottom Left (텍스트 왼쪽 아래)
  {
    id: 'banner-horizontal-bottom-left',
    name: 'Horizontal Banner (1280*700px)',
    category: 'Promotion Banner',
    dimensions: { width: 1280, height: 700 },
    templateVariant: 'bottom-left',
    formatGroup: 'banner-horizontal',
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
          top: 350,
          width: 640,
          height: 350,
          fill: 'rgba(0, 0, 0, 0.5)',
        },
        {
          type: 'text',
          id: 'title',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          left: 50,
          top: 400,
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
          top: 520,
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
          top: 50,
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
          position: { x: 50, y: 400 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: 'Hyundai Mobility Passport In Okinawa',
          position: { x: 50, y: 520 },
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
          position: { x: 640, y: 50 },
          size: { width: 600, height: 300 },
          editable: true,
          label: 'Vehicle Model',
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },

  // Template 3: Top Right (텍스트 오른쪽 상단)
  {
    id: 'banner-horizontal-top-right',
    name: 'Horizontal Banner (1280*700px)',
    category: 'Promotion Banner',
    dimensions: { width: 1280, height: 700 },
    templateVariant: 'top-right',
    formatGroup: 'banner-horizontal',
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
          left: 640,
          top: 0,
          width: 640,
          height: 350,
          fill: 'rgba(0, 0, 0, 0.5)',
        },
        {
          type: 'text',
          id: 'title',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          left: 690,
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
          left: 690,
          top: 220,
          fontSize: 24,
          fontWeight: 'normal',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
        },
        {
          type: 'image',
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          left: 40,
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
          position: { x: 690, y: 100 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: 'Hyundai Mobility Passport In Okinawa',
          position: { x: 690, y: 220 },
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
          position: { x: 40, y: 350 },
          size: { width: 600, height: 300 },
          editable: true,
          label: 'Vehicle Model',
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },

  // Template 4: Center (차량 없이 텍스트 중앙)
  {
    id: 'banner-horizontal-center',
    name: 'Horizontal Banner (1280*700px)',
    category: 'Promotion Banner',
    dimensions: { width: 1280, height: 700 },
    templateVariant: 'center',
    formatGroup: 'banner-horizontal',
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
          width: 1280,
          height: 700,
          fill: 'rgba(0, 0, 0, 0.4)',
        },
        {
          type: 'text',
          id: 'title',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          left: 640,
          top: 250,
          fontSize: 64,
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
          lineHeight: 1.2,
          textAlign: 'center',
          originX: 'center',
        },
        {
          type: 'text',
          id: 'subtitle',
          text: 'Hyundai Mobility Passport In Okinawa',
          left: 640,
          top: 400,
          fontSize: 32,
          fontWeight: 'normal',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
          textAlign: 'center',
          originX: 'center',
        },
      ],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          position: { x: 640, y: 250 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: 'Hyundai Mobility Passport In Okinawa',
          position: { x: 640, y: 400 },
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
      ],
      colors: [],
    },
    thumbnail: '',
  },

  // Vertical Banner Templates
  // Template 1: Default (텍스트 상단)
  {
    id: 'banner-vertical-default',
    name: 'Vertical Banner\n(400*900px)',
    category: 'Promotion Banner',
    dimensions: { width: 400, height: 900 },
    templateVariant: 'default',
    formatGroup: 'banner-vertical',
    canvas: {
      width: 400,
      height: 900,
      backgroundColor: '#ffffff',
      objects: [
        {
          type: 'image',
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=900&fit=crop',
          left: 0,
          top: 0,
          width: 400,
          height: 900,
          scaleX: 1,
          scaleY: 1,
        },
        {
          type: 'rect',
          id: 'overlay',
          left: 0,
          top: 0,
          width: 400,
          height: 500,
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
          top: 550,
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
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=900&fit=crop',
          position: { x: 0, y: 0 },
          size: { width: 400, height: 900 },
          editable: true,
          label: 'Background Image',
        },
        {
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          position: { x: 20, y: 550 },
          size: { width: 360, height: 180 },
          editable: true,
          label: 'Vehicle Model',
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },
  
  // Template 2: Bottom (텍스트 하단)
  {
    id: 'banner-vertical-bottom',
    name: 'Vertical Banner\n(400*900px)',
    category: 'Promotion Banner',
    dimensions: { width: 400, height: 900 },
    templateVariant: 'bottom',
    formatGroup: 'banner-vertical',
    canvas: {
      width: 400,
      height: 900,
      backgroundColor: '#ffffff',
      objects: [
        {
          type: 'image',
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=900&fit=crop',
          left: 0,
          top: 0,
          width: 400,
          height: 900,
          scaleX: 1,
          scaleY: 1,
        },
        {
          type: 'rect',
          id: 'overlay',
          left: 0,
          top: 400,
          width: 400,
          height: 500,
          fill: 'rgba(0, 0, 0, 0.5)',
        },
        {
          type: 'text',
          id: 'title',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          left: 30,
          top: 500,
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
          top: 650,
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
          top: 150,
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
          position: { x: 30, y: 500 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: 'Hyundai Mobility Passport In Okinawa',
          position: { x: 30, y: 650 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=900&fit=crop',
          position: { x: 0, y: 0 },
          size: { width: 400, height: 900 },
          editable: true,
          label: 'Background Image',
        },
        {
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          position: { x: 20, y: 150 },
          size: { width: 360, height: 180 },
          editable: true,
          label: 'Vehicle Model',
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },

  // Template 3: Middle (텍스트 중간)
  {
    id: 'banner-vertical-middle',
    name: 'Vertical Banner\n(400*900px)',
    category: 'Promotion Banner',
    dimensions: { width: 400, height: 900 },
    templateVariant: 'middle',
    formatGroup: 'banner-vertical',
    canvas: {
      width: 400,
      height: 900,
      backgroundColor: '#ffffff',
      objects: [
        {
          type: 'image',
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=900&fit=crop',
          left: 0,
          top: 0,
          width: 400,
          height: 900,
          scaleX: 1,
          scaleY: 1,
        },
        {
          type: 'rect',
          id: 'overlay',
          left: 0,
          top: 300,
          width: 400,
          height: 300,
          fill: 'rgba(0, 0, 0, 0.5)',
        },
        {
          type: 'text',
          id: 'title',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          left: 30,
          top: 350,
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
          top: 500,
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
          top: 650,
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
          position: { x: 30, y: 350 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: 'Hyundai Mobility Passport In Okinawa',
          position: { x: 30, y: 500 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=900&fit=crop',
          position: { x: 0, y: 0 },
          size: { width: 400, height: 900 },
          editable: true,
          label: 'Background Image',
        },
        {
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          position: { x: 20, y: 650 },
          size: { width: 360, height: 180 },
          editable: true,
          label: 'Vehicle Model',
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },

  // Template 4: Center (차량 없이 텍스트 중앙)
  {
    id: 'banner-vertical-center',
    name: 'Vertical Banner\n(400*900px)',
    category: 'Promotion Banner',
    dimensions: { width: 400, height: 900 },
    templateVariant: 'center',
    formatGroup: 'banner-vertical',
    canvas: {
      width: 400,
      height: 900,
      backgroundColor: '#ffffff',
      objects: [
        {
          type: 'image',
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=900&fit=crop',
          left: 0,
          top: 0,
          width: 400,
          height: 900,
          scaleX: 1,
          scaleY: 1,
        },
        {
          type: 'rect',
          id: 'overlay',
          left: 0,
          top: 0,
          width: 400,
          height: 900,
          fill: 'rgba(0, 0, 0, 0.4)',
        },
        {
          type: 'text',
          id: 'title',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          left: 200,
          top: 350,
          fontSize: 42,
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
          lineHeight: 1.2,
          textAlign: 'center',
          originX: 'center',
        },
        {
          type: 'text',
          id: 'subtitle',
          text: 'Hyundai Mobility Passport In Okinawa',
          left: 200,
          top: 500,
          fontSize: 20,
          fontWeight: 'normal',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
          textAlign: 'center',
          originX: 'center',
        },
      ],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          position: { x: 200, y: 350 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: 'Hyundai Mobility Passport In Okinawa',
          position: { x: 200, y: 500 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=900&fit=crop',
          position: { x: 0, y: 0 },
          size: { width: 400, height: 900 },
          editable: true,
          label: 'Background Image',
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },

  // Square Banner Templates
  // Template 1: Default (텍스트 왼쪽)
  {
    id: 'banner-square-default',
    name: 'Square Banner\n(1080*1080px)',
    category: 'Promotion Banner',
    dimensions: { width: 1080, height: 1080 },
    templateVariant: 'default',
    formatGroup: 'banner-square',
    canvas: {
      width: 1080,
      height: 1080,
      backgroundColor: '#ffffff',
      objects: [
        {
          type: 'image',
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1080&fit=crop',
          left: 0,
          top: 0,
          width: 1080,
          height: 1080,
          scaleX: 1,
          scaleY: 1,
        },
        {
          type: 'rect',
          id: 'overlay',
          left: 0,
          top: 0,
          width: 540,
          height: 1080,
          fill: 'rgba(0, 0, 0, 0.5)',
        },
        {
          type: 'text',
          id: 'title',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          left: 50,
          top: 150,
          fontSize: 42,
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
          fontSize: 22,
          fontWeight: 'normal',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
        },
        {
          type: 'image',
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          left: 440,
          top: 540,
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
          position: { x: 50, y: 150 },
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
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1080&fit=crop',
          position: { x: 0, y: 0 },
          size: { width: 1080, height: 1080 },
          editable: true,
          label: 'Background Image',
        },
        {
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          position: { x: 440, y: 540 },
          size: { width: 600, height: 300 },
          editable: true,
          label: 'Vehicle Model',
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },

  // Template 2: Right (텍스트 오른쪽)
  {
    id: 'banner-square-right',
    name: 'Square Banner\n(1080*1080px)',
    category: 'Promotion Banner',
    dimensions: { width: 1080, height: 1080 },
    templateVariant: 'right',
    formatGroup: 'banner-square',
    canvas: {
      width: 1080,
      height: 1080,
      backgroundColor: '#ffffff',
      objects: [
        {
          type: 'image',
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1080&fit=crop',
          left: 0,
          top: 0,
          width: 1080,
          height: 1080,
          scaleX: 1,
          scaleY: 1,
        },
        {
          type: 'rect',
          id: 'overlay',
          left: 540,
          top: 0,
          width: 540,
          height: 1080,
          fill: 'rgba(0, 0, 0, 0.5)',
        },
        {
          type: 'text',
          id: 'title',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          left: 590,
          top: 150,
          fontSize: 42,
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
          lineHeight: 1.2,
        },
        {
          type: 'text',
          id: 'subtitle',
          text: 'Hyundai Mobility Passport In Okinawa',
          left: 590,
          top: 300,
          fontSize: 22,
          fontWeight: 'normal',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
        },
        {
          type: 'image',
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          left: 40,
          top: 540,
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
          position: { x: 590, y: 150 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: 'Hyundai Mobility Passport In Okinawa',
          position: { x: 590, y: 300 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1080&fit=crop',
          position: { x: 0, y: 0 },
          size: { width: 1080, height: 1080 },
          editable: true,
          label: 'Background Image',
        },
        {
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          position: { x: 40, y: 540 },
          size: { width: 600, height: 300 },
          editable: true,
          label: 'Vehicle Model',
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },

  // Template 3: Top (텍스트 상단)
  {
    id: 'banner-square-top',
    name: 'Square Banner\n(1080*1080px)',
    category: 'Promotion Banner',
    dimensions: { width: 1080, height: 1080 },
    templateVariant: 'top',
    formatGroup: 'banner-square',
    canvas: {
      width: 1080,
      height: 1080,
      backgroundColor: '#ffffff',
      objects: [
        {
          type: 'image',
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1080&fit=crop',
          left: 0,
          top: 0,
          width: 1080,
          height: 1080,
          scaleX: 1,
          scaleY: 1,
        },
        {
          type: 'rect',
          id: 'overlay',
          left: 0,
          top: 0,
          width: 1080,
          height: 400,
          fill: 'rgba(0, 0, 0, 0.5)',
        },
        {
          type: 'text',
          id: 'title',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          left: 540,
          top: 100,
          fontSize: 48,
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
          lineHeight: 1.2,
          textAlign: 'center',
          originX: 'center',
        },
        {
          type: 'text',
          id: 'subtitle',
          text: 'Hyundai Mobility Passport In Okinawa',
          left: 540,
          top: 250,
          fontSize: 24,
          fontWeight: 'normal',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
          textAlign: 'center',
          originX: 'center',
        },
        {
          type: 'image',
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          left: 240,
          top: 500,
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
          position: { x: 540, y: 100 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: 'Hyundai Mobility Passport In Okinawa',
          position: { x: 540, y: 250 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1080&fit=crop',
          position: { x: 0, y: 0 },
          size: { width: 1080, height: 1080 },
          editable: true,
          label: 'Background Image',
        },
        {
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          position: { x: 240, y: 500 },
          size: { width: 600, height: 300 },
          editable: true,
          label: 'Vehicle Model',
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },

  // Template 4: Center (차량 없이 텍스트 중앙)
  {
    id: 'banner-square-center',
    name: 'Square Banner\n(1080*1080px)',
    category: 'Promotion Banner',
    dimensions: { width: 1080, height: 1080 },
    templateVariant: 'center',
    formatGroup: 'banner-square',
    canvas: {
      width: 1080,
      height: 1080,
      backgroundColor: '#ffffff',
      objects: [
        {
          type: 'image',
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1080&fit=crop',
          left: 0,
          top: 0,
          width: 1080,
          height: 1080,
          scaleX: 1,
          scaleY: 1,
        },
        {
          type: 'rect',
          id: 'overlay',
          left: 0,
          top: 0,
          width: 1080,
          height: 1080,
          fill: 'rgba(0, 0, 0, 0.4)',
        },
        {
          type: 'text',
          id: 'title',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          left: 540,
          top: 400,
          fontSize: 56,
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
          lineHeight: 1.2,
          textAlign: 'center',
          originX: 'center',
        },
        {
          type: 'text',
          id: 'subtitle',
          text: 'Hyundai Mobility Passport In Okinawa',
          left: 540,
          top: 580,
          fontSize: 28,
          fontWeight: 'normal',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
          textAlign: 'center',
          originX: 'center',
        },
      ],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: 'Hyundai EV,\nCarrying Your Journey.',
          position: { x: 540, y: 400 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: 'Hyundai Mobility Passport In Okinawa',
          position: { x: 540, y: 580 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1080&fit=crop',
          position: { x: 0, y: 0 },
          size: { width: 1080, height: 1080 },
          editable: true,
          label: 'Background Image',
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },

  // Brochure 포맷
  {
    id: 'brochure-instagram-post',
    name: 'Instagram Post (1080*1080px)',
    category: 'Brochure',
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
    id: 'brochure-instagram-story',
    name: 'Instagram Story (1080*1920px)',
    category: 'Brochure',
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
    id: 'brochure-youtube-thumbnail',
    name: 'YouTube Thumbnail (1280*720px)',
    category: 'Brochure',
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
    id: 'brochure-facebook-post',
    name: 'Facebook Post (1080*1920px)',
    category: 'Brochure',
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

// 템플릿 시스템을 위한 새로운 함수들
export const getTemplatesByFormatGroup = (formatGroup: string): UnifiedFormat[] => {
  return unifiedFormats.filter(f => f.formatGroup === formatGroup);
};

export const getDefaultTemplateForFormat = (formatGroup: string): UnifiedFormat | null => {
  return unifiedFormats.find(f => f.formatGroup === formatGroup && f.templateVariant === 'default') || null;
};

// 포맷 선택을 위한 고유 포맷 목록 가져오기 (중복 제거)
export const getUniqueFormatsByCategory = (category: string): UnifiedFormat[] => {
  const formats = unifiedFormats.filter(f => f.category === category);
  const uniqueFormats: UnifiedFormat[] = [];
  const seenGroups = new Set<string>();
  
  formats.forEach(format => {
    const group = format.formatGroup || format.id;
    if (!seenGroups.has(group)) {
      seenGroups.add(group);
      // 각 그룹의 default 템플릿을 대표로 사용
      const defaultTemplate = format.templateVariant === 'default' ? format : 
        formats.find(f => f.formatGroup === group && f.templateVariant === 'default') || format;
      uniqueFormats.push(defaultTemplate);
    }
  });
  
  return uniqueFormats;
};

// UnifiedFormat을 기존 Template 형식으로 변환하는 함수
export const convertToTemplate = (format: UnifiedFormat): Template => {
  return {
    id: format.id,
    name: format.name,
    category: format.category as 'Document' | 'Promotion Banner' | 'Brochure',
    format: {
      id: format.id,
      name: format.name,
      dimensions: format.dimensions,
      category: format.category as 'Document' | 'Promotion Banner' | 'Brochure',
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