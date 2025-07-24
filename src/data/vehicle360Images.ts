// 360도 차량 이미지 데이터
export interface Vehicle360Data {
  modelId: string;
  modelName: string;
  colors: {
    [colorId: string]: {
      colorName: string;
      images: string[];
    };
  };
}

// EV9 360도 이미지 생성 함수
const generateEV9Images = (colorCode: string): string[] => {
  const images: string[] = [];
  // 로컬 public 폴더 경로 사용
  const baseUrl = '/images/360/ev9';
  
  // 72개 전체 이미지 사용
  for (let i = 1; i <= 72; i++) {
    const imageNumber = i.toString().padStart(2, '0');
    images.push(`${baseUrl}/${colorCode}/${colorCode}_${imageNumber}.png`);
  }
  
  return images;
};

// K8 360도 이미지 생성 함수
const generateK8Images = (colorCode: string): string[] => {
  const images: string[] = [];
  // 로컬 public 폴더 경로 사용
  const baseUrl = '/images/360/k8';
  
  // 72개 전체 이미지 사용
  for (let i = 1; i <= 72; i++) {
    const imageNumber = i.toString().padStart(2, '0');
    images.push(`${baseUrl}/${colorCode}/${colorCode}_${imageNumber}.png`);
  }
  
  return images;
};

// 차량 모델별 360도 이미지 데이터
export const vehicle360Data: Record<string, Vehicle360Data> = {
  'ev9': {
    modelId: 'ev9',
    modelName: 'EV9',
    colors: {
      'ism': {
        colorName: '아이보리 매트 실버',
        images: generateEV9Images('ism')
      },
      'swp': {
        colorName: '스노우 화이트 펄',
        images: generateEV9Images('swp')
      },
      'abp': {
        colorName: '오로라 블랙 펄',
        images: generateEV9Images('abp')
      },
      'gwp': {
        colorName: '플레어 레드',
        images: generateEV9Images('gwp')
      },
      'pgm': {
        colorName: '판테라 메탈',
        images: generateEV9Images('pgm')
      },
      'p2m': {
        colorName: '판테라 메탈',
        images: generateEV9Images('p2m')
      },
      'obm': {
        colorName: '오션 매트 블루',
        images: generateEV9Images('obm')
      },
      'ieg': {
        colorName: '아이스버그 그린',
        images: generateEV9Images('ieg')
      },
      'obg': {
        colorName: '오션 블루',
        images: generateEV9Images('obg')
      },
      'pgg': {
        colorName: '페블 그레이',
        images: generateEV9Images('pgg')
      },
      'i4g': {
        colorName: '아이보리 실버',
        images: generateEV9Images('i4g')
      }
    }
  },
  'k8': {
    modelId: 'k8',
    modelName: 'K8',
    colors: {
      'swp': {
        colorName: '스노우 화이트 펄',
        images: generateK8Images('swp')
      }
    }
  },
  'seltos': {
    modelId: 'seltos',
    modelName: 'Seltos',
    colors: {
      'swp': {
        colorName: '스노우 화이트 펄',
        images: [] // Seltos 이미지 URL이 제공되면 추가
      },
      'abp': {
        colorName: '오로라 블랙 펄',
        images: []
      }
    }
  },
  'sportage': {
    modelId: 'sportage',
    modelName: 'Sportage',
    colors: {
      'swp': {
        colorName: '스노우 화이트 펄',
        images: [] // Sportage 이미지 URL이 제공되면 추가
      },
      'abp': {
        colorName: '오로라 블랙 펄',
        images: []
      }
    }
  }
};

// 색상 ID를 360도 이미지 색상 코드로 매핑
export const colorIdTo360ColorCode: Record<string, string> = {
  'ivory-matte-silver': 'ism',
  'snow-white-pearl': 'swp',
  'aurora-black-pearl': 'abp',
  'flare-red': 'gwp',
  'panthera-metal': 'p2m',
  'ocean-matte-blue': 'obm',
  'iceberg-green': 'ieg',
  'ocean-blue': 'obg',
  'pebble-gray': 'pgg',
  'ivory-silver': 'i4g',
  'matte-silver': 'i4g', // 기본값으로 아이보리 실버 사용
};

// 차량 모델 ID 매핑 (기존 brandPresets의 차량 ID와 매핑)
export const vehicleIdToModelId: Record<string, string> = {
  'ev9-default': 'ev9',
  'k8-default': 'k8',
  'seltos-default': 'seltos',
  'sportage-default': 'sportage',
  'vehicle-preset-1': 'ev9',
  'vehicle-preset-2': 'k8',
  'vehicle-preset-4': 'telluride',
  'vehicle-preset-5': 'carnival',
};