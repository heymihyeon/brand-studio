import { Template } from '../types';

export const templates: Template[] = [
  // 문서 템플릿
  {
    id: 'doc-proposal-1',
    name: '제안서 템플릿',
    category: '문서',
    format: {
      id: 'a4',
      name: 'A4',
      dimensions: { width: 595, height: 842 },
      category: '문서',
    },
    thumbnail: '',
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
          text: '제안서 제목',
          position: { x: 50, y: 100 },
          editable: true,
        },
        {
          id: 'subtitle',
          type: 'subheading',
          text: '부제목',
          position: { x: 50, y: 150 },
          editable: true,
        },
        {
          id: 'content',
          type: 'body',
          text: '제안 내용을 입력하세요',
          position: { x: 50, y: 200 },
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
  },
  {
    id: 'doc-contract-1',
    name: '계약서 템플릿',
    category: '문서',
    format: {
      id: 'a4',
      name: 'A4',
      dimensions: { width: 595, height: 842 },
      category: '문서',
    },
    thumbnail: '',
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
      ],
      images: [],
      colors: [],
    },
  },
  {
    id: 'doc-brochure-1',
    name: '브로슈어 템플릿',
    category: '문서',
    format: {
      id: 'a4',
      name: 'A4',
      dimensions: { width: 595, height: 842 },
      category: '문서',
    },
    thumbnail: '',
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
          text: '브로슈어 제목',
          position: { x: 50, y: 100 },
          editable: true,
        },
        {
          id: 'description',
          type: 'body',
          text: '설명 텍스트',
          position: { x: 50, y: 400 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'main-image',
          src: '',
          position: { x: 100, y: 200 },
          size: { width: 400, height: 150 },
          editable: true,
        },
      ],
      colors: [],
    },
  },

  // 프로모션 배너 템플릿
  {
    id: 'banner-web-1',
    name: '웹 배너 기본',
    category: '프로모션 배너',
    format: {
      id: 'web-banner',
      name: '웹 배너 (728x90)',
      dimensions: { width: 728, height: 90 },
      category: '프로모션 배너',
    },
    thumbnail: '',
    canvas: {
      width: 728,
      height: 90,
      backgroundColor: '#1F7AFC',
      objects: [],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: '프로모션 제목',
          position: { x: 30, y: 30 },
          editable: true,
        },
        {
          id: 'cta',
          type: 'body',
          text: '지금 확인하기',
          position: { x: 600, y: 35 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'logo',
          src: '',
          position: { x: 20, y: 20 },
          size: { width: 50, height: 50 },
          editable: true,
        },
      ],
      colors: [],
    },
  },
  {
    id: 'banner-square-1',
    name: '정사각형 배너',
    category: '프로모션 배너',
    format: {
      id: 'square-banner',
      name: '정사각형 (300x300)',
      dimensions: { width: 300, height: 300 },
      category: '프로모션 배너',
    },
    thumbnail: '',
    canvas: {
      width: 300,
      height: 300,
      backgroundColor: '#F5F5F5',
      objects: [],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: '특별 할인',
          position: { x: 50, y: 50 },
          editable: true,
        },
        {
          id: 'discount',
          type: 'heading',
          text: '50% OFF',
          position: { x: 100, y: 130 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'product',
          src: '',
          position: { x: 75, y: 200 },
          size: { width: 150, height: 80 },
          editable: true,
        },
      ],
      colors: [],
    },
  },

  // SNS 템플릿
  {
    id: 'sns-instagram-1',
    name: '인스타그램 포스트 기본',
    category: 'SNS',
    format: {
      id: 'instagram-post',
      name: '인스타그램 포스트 (1080x1080)',
      dimensions: { width: 1080, height: 1080 },
      category: 'SNS',
    },
    thumbnail: '',
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
          text: '포스트 제목',
          position: { x: 100, y: 100 },
          editable: true,
        },
        {
          id: 'content',
          type: 'body',
          text: '내용을 입력하세요',
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
  },
  {
    id: 'sns-instagram-2',
    name: '인스타그램 스토리',
    category: 'SNS',
    format: {
      id: 'instagram-story',
      name: '인스타그램 스토리 (1080x1920)',
      dimensions: { width: 1080, height: 1920 },
      category: 'SNS',
    },
    thumbnail: '',
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
          text: '스토리 제목',
          position: { x: 100, y: 200 },
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
  },
  {
    id: 'sns-facebook-1',
    name: '페이스북 포스트',
    category: 'SNS',
    format: {
      id: 'facebook-post',
      name: '페이스북 포스트 (1200x630)',
      dimensions: { width: 1200, height: 630 },
      category: 'SNS',
    },
    thumbnail: '',
    canvas: {
      width: 1200,
      height: 630,
      backgroundColor: '#FFFFFF',
      objects: [],
    },
    editableElements: {
      texts: [
        {
          id: 'title',
          type: 'heading',
          text: '페이스북 포스트',
          position: { x: 100, y: 100 },
          editable: true,
        },
        {
          id: 'description',
          type: 'body',
          text: '설명 텍스트',
          position: { x: 100, y: 450 },
          editable: true,
        },
      ],
      images: [
        {
          id: 'cover',
          src: '',
          position: { x: 100, y: 200 },
          size: { width: 1000, height: 200 },
          editable: true,
        },
      ],
      colors: [],
    },
  },
];

export const getTemplatesByCategory = (category: string): Template[] => {
  return templates.filter(t => t.category === category);
};