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
    }>;
    colors: string[];
  };
  thumbnail: string;
}

export const unifiedFormats: UnifiedFormat[] = [
  // 문서 포맷
  {
    id: 'doc-contract-a4',
    name: '계약서(A4)',
    category: '문서',
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
          text: '계약서',
          position: { x: 250, y: 100 },
          editable: true,
        },
        {
          id: 'party1',
          type: 'body',
          text: '계약 당사자 1',
          position: { x: 50, y: 200 },
          editable: true,
        },
        {
          id: 'party2',
          type: 'body',
          text: '계약 당사자 2',
          position: { x: 50, y: 250 },
          editable: true,
        },
        {
          id: 'content',
          type: 'body',
          text: '계약 내용을 입력하세요',
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
    name: '브로슈어(A3)',
    category: '문서',
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
          text: '브로슈어 제목',
          position: { x: 100, y: 100 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: '부제목',
          position: { x: 100, y: 160 },
          editable: true,
        },
        {
          id: 'content',
          type: 'body',
          text: '브로슈어 내용을 입력하세요',
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
    name: '가로 배너(2000*360px)',
    category: '프로모션 배너',
    dimensions: { width: 2000, height: 360 },
    canvas: {
      width: 2000,
      height: 360,
      backgroundColor: '#ffffff',
      objects: [
        {
          type: 'image',
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&h=360&fit=crop',
          left: 0,
          top: 0,
          width: 2000,
          height: 360,
          scaleX: 1,
          scaleY: 1,
        },
        {
          type: 'rect',
          id: 'overlay',
          left: 0,
          top: 0,
          width: 1000,
          height: 360,
          fill: 'rgba(0, 0, 0, 0.5)',
        },
        {
          type: 'text',
          id: 'title',
          text: '현대 EV,\n당신의 여행을 캐리하다.',
          left: 50,
          top: 50,
          fontSize: 60,
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
          top: 200,
          fontSize: 32,
          fontWeight: 'normal',
          fill: '#ffffff',
          fontFamily: 'Noto Sans KR',
        },
        {
          type: 'image',
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          left: 1000,
          top: 60,
          width: 900,
          height: 240,
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
          text: '현대 EV,\n당신의 여행을 캐리하다.',
          position: { x: 50, y: 50 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: 'Hyundai Mobility Passport In Okinawa',
          position: { x: 50, y: 200 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'bg-image',
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&h=360&fit=crop',
          position: { x: 0, y: 0 },
          size: { width: 2000, height: 360 },
          editable: true,
          label: '배경 이미지',
        },
        {
          id: 'vehicle',
          src: 'https://www.hyundai.com/contents/repn-car/side-45/ioniq5-24pe-side-45-gravity-gold-matte.png',
          position: { x: 1000, y: 60 },
          size: { width: 900, height: 240 },
          editable: true,
          label: '차량 모델',
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },
  {
    id: 'banner-vertical',
    name: '세로 배너(400*1200px)',
    category: '프로모션 배너',
    dimensions: { width: 400, height: 1200 },
    canvas: {
      width: 400,
      height: 1200,
      backgroundColor: '#FF6B35',
      objects: [],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: '세로 배너',
          position: { x: 50, y: 200 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: '부제목',
          position: { x: 50, y: 260 },
          editable: true,
        },
        {
          id: 'cta',
          type: 'body',
          text: '지금 확인하기',
          position: { x: 50, y: 1000 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'logo',
          src: '',
          position: { x: 50, y: 50 },
          size: { width: 100, height: 100 },
          editable: true,
        },
        {
          id: 'main-image',
          src: '',
          position: { x: 50, y: 400 },
          size: { width: 300, height: 400 },
          editable: true,
        },
      ],
      colors: [],
    },
    thumbnail: '',
  },

  // SNS 포맷
  {
    id: 'sns-instagram-post',
    name: '인스타그램 게시물(1080*1080px)',
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
          text: '인스타그램 게시물',
          position: { x: 100, y: 100 },
          editable: true,
        },
        {
          id: 'content',
          type: 'body',
          text: '게시물 내용을 입력하세요',
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
    name: '인스타그램 스토리(1080*1920px)',
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
          text: '인스타그램 스토리',
          position: { x: 100, y: 200 },
          editable: true,
        },
        {
          id: 'content',
          type: 'body',
          text: '스토리 내용을 입력하세요',
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
    name: '유튜브 썸네일(1280*720px)',
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
          text: '유튜브 썸네일',
          position: { x: 100, y: 100 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: '부제목',
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
    name: '페이스북 게시물(1080*1920px)',
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
          text: '페이스북 게시물',
          position: { x: 100, y: 200 },
          editable: true,
        },
        {
          id: 'content',
          type: 'body',
          text: '게시물 내용을 입력하세요',
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
    category: format.category,
    format: {
      id: format.id,
      name: format.name,
      dimensions: format.dimensions,
      category: format.category,
    },
    thumbnail: format.thumbnail,
    canvas: format.canvas,
    editableElements: format.editableElements,
  };
};