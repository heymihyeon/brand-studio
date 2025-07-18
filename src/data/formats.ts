import { FormatOption } from '../types';

export const formatOptions: Record<string, FormatOption[]> = {
  '문서': [
    { id: 'a4', name: 'A4 (210×297mm)', dimensions: { width: 595, height: 842 }, category: '문서' },
    { id: 'letter', name: 'Letter (216×279mm)', dimensions: { width: 612, height: 792 }, category: '문서' },
    { id: 'a3', name: 'A3 (297×420mm)', dimensions: { width: 842, height: 1191 }, category: '문서' },
  ],
  '프로모션 배너': [
    { id: 'web-banner', name: '웹 배너 (728×90)', dimensions: { width: 728, height: 90 }, category: '프로모션 배너' },
    { id: 'leaderboard', name: '리더보드 (728×250)', dimensions: { width: 728, height: 250 }, category: '프로모션 배너' },
    { id: 'square-banner', name: '정사각형 (300×300)', dimensions: { width: 300, height: 300 }, category: '프로모션 배너' },
    { id: 'skyscraper', name: '스카이스크래퍼 (160×600)', dimensions: { width: 160, height: 600 }, category: '프로모션 배너' },
  ],
  'SNS': [
    { id: 'instagram-post', name: '인스타그램 포스트 (1080×1080)', dimensions: { width: 1080, height: 1080 }, category: 'SNS' },
    { id: 'instagram-story', name: '인스타그램 스토리 (1080×1920)', dimensions: { width: 1080, height: 1920 }, category: 'SNS' },
    { id: 'facebook-post', name: '페이스북 포스트 (1200×630)', dimensions: { width: 1200, height: 630 }, category: 'SNS' },
    { id: 'twitter-post', name: '트위터 포스트 (1200×675)', dimensions: { width: 1200, height: 675 }, category: 'SNS' },
  ],
};

export const getFormatsByCategory = (category: string): FormatOption[] => {
  return formatOptions[category] || [];
};