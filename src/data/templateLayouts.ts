import { FormatOption } from '../types';

export interface TemplateLayout {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  editableElements: {
    texts: Array<{
      id: string;
      type: 'heading' | 'subheading' | 'body';
      text: string;
      position: { x: number; y: number }; // 상대적 위치 (0-100%)
      editable: boolean;
    }>;
    images: Array<{
      id: string;
      src: string;
      position: { x: number; y: number }; // 상대적 위치 (0-100%)
      size: { width: number; height: number }; // 상대적 크기 (0-100%)
      editable: boolean;
    }>;
    colors: string[];
  };
  backgroundColor: string;
}

export const templateLayouts: TemplateLayout[] = [
  // 문서 템플릿
  {
    id: 'doc-proposal-1',
    name: '제안서 템플릿',
    category: '문서',
    thumbnail: '',
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: '제안서 제목',
          position: { x: 8, y: 12 }, // 8%, 12%
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: '부제목',
          position: { x: 8, y: 18 }, // 8%, 18%
          editable: true,
        },
        {
          id: 'content',
          type: 'body',
          text: '제안 내용을 입력하세요',
          position: { x: 8, y: 24 }, // 8%, 24%
          editable: true,
        },
      ],
      images: [
        {
          id: 'logo',
          src: '',
          position: { x: 76, y: 6 }, // 76%, 6%
          size: { width: 17, height: 6 }, // 17%, 6%
          editable: true,
        },
      ],
      colors: [],
    },
    backgroundColor: '#FFFFFF',
  },
  {
    id: 'doc-contract-1',
    name: '계약서 템플릿',
    category: '문서',
    thumbnail: '',
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: '계약서',
          position: { x: 42, y: 12 }, // 중앙 정렬
          editable: true,
        },
        {
          id: 'party1',
          type: 'body',
          text: '계약 당사자 1',
          position: { x: 8, y: 24 },
          editable: true,
        },
        {
          id: 'party2',
          type: 'body',
          text: '계약 당사자 2',
          position: { x: 8, y: 30 },
          editable: true,
        },
      ],
      images: [],
      colors: [],
    },
    backgroundColor: '#FFFFFF',
  },
  {
    id: 'doc-brochure-1',
    name: '브로슈어 템플릿',
    category: '문서',
    thumbnail: '',
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: '브로슈어 제목',
          position: { x: 8, y: 12 },
          editable: true,
        },
        {
          id: 'description',
          type: 'body',
          text: '설명 텍스트',
          position: { x: 8, y: 48 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'main-image',
          src: '',
          position: { x: 17, y: 24 },
          size: { width: 67, height: 18 },
          editable: true,
        },
      ],
      colors: [],
    },
    backgroundColor: '#FFFFFF',
  },

  // 프로모션 배너 템플릿
  {
    id: 'banner-basic-1',
    name: '기본 배너 템플릿',
    category: '프로모션 배너',
    thumbnail: '',
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: '프로모션 제목',
          position: { x: 4, y: 33 },
          editable: true,
        },
        {
          id: 'cta',
          type: 'body',
          text: '지금 확인하기',
          position: { x: 82, y: 39 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'logo',
          src: '',
          position: { x: 3, y: 22 },
          size: { width: 7, height: 56 },
          editable: true,
        },
      ],
      colors: [],
    },
    backgroundColor: '#1F7AFC',
  },
  {
    id: 'banner-discount-1',
    name: '할인 배너 템플릿',
    category: '프로모션 배너',
    thumbnail: '',
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: '특별 할인',
          position: { x: 17, y: 17 },
          editable: true,
        },
        {
          id: 'discount',
          type: 'heading',
          text: '50% OFF',
          position: { x: 33, y: 43 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'product',
          src: '',
          position: { x: 25, y: 67 },
          size: { width: 50, height: 27 },
          editable: true,
        },
      ],
      colors: [],
    },
    backgroundColor: '#F5F5F5',
  },

  // SNS 템플릿
  {
    id: 'sns-basic-1',
    name: '기본 SNS 템플릿',
    category: 'SNS',
    thumbnail: '',
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: '포스트 제목',
          position: { x: 9, y: 9 },
          editable: true,
        },
        {
          id: 'content',
          type: 'body',
          text: '내용을 입력하세요',
          position: { x: 9, y: 74 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'main',
          src: '',
          position: { x: 9, y: 19 },
          size: { width: 81, height: 46 },
          editable: true,
        },
      ],
      colors: [],
    },
    backgroundColor: '#FFFFFF',
  },
  {
    id: 'sns-story-1',
    name: '스토리 템플릿',
    category: 'SNS',
    thumbnail: '',
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: '스토리 제목',
          position: { x: 9, y: 10 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'background',
          src: '',
          position: { x: 0, y: 0 },
          size: { width: 100, height: 100 },
          editable: true,
        },
      ],
      colors: [],
    },
    backgroundColor: '#FFFFFF',
  },
];

export const getTemplatesByCategory = (category: string): TemplateLayout[] => {
  return templateLayouts.filter(t => t.category === category);
};

export const getDefaultTemplate = (category: string): TemplateLayout | null => {
  const templates = getTemplatesByCategory(category);
  return templates.length > 0 ? templates[0] : null;
};

// 템플릿 레이아웃을 실제 포맷에 맞게 변환하는 함수
export const applyTemplateToFormat = (template: TemplateLayout, format: FormatOption) => {
  const { width, height } = format.dimensions;
  
  return {
    id: `${template.id}-${format.id}`,
    name: template.name,
    category: template.category,
    format: format,
    thumbnail: template.thumbnail,
    canvas: {
      width,
      height,
      backgroundColor: template.backgroundColor,
      objects: [],
    },
    editableElements: {
      texts: template.editableElements.texts.map(text => ({
        ...text,
        position: {
          x: (text.position.x / 100) * width,
          y: (text.position.y / 100) * height,
        },
      })),
      images: template.editableElements.images.map(image => ({
        ...image,
        position: {
          x: (image.position.x / 100) * width,
          y: (image.position.y / 100) * height,
        },
        size: {
          width: (image.size.width / 100) * width,
          height: (image.size.height / 100) * height,
        },
      })),
      colors: template.editableElements.colors,
    },
  };
};