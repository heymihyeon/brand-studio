# Contents Creator 개발 가이드

## 🚀 서버 실행 방법

**중요: 반드시 아래 규칙을 따르세요:**
- **http://localhost:5174/** 주소만 사용 (다른 포트 사용 금지)
- **백그라운드에서 실행** (./start-dev.sh 사용)
- **절대 `npm run dev` 직접 실행하지 마세요**

### 서버 관리 명령어

```bash
# 서버 시작 (백그라운드)
./start-dev.sh

# 서버 상태 확인
./status-dev.sh

# 서버 중지
./stop-dev.sh

# 로그 확인
tail -f vite-server.log
```

### 중요 사항
- 서버는 **반드시 localhost:5174**에서만 실행해야 합니다
- **백그라운드 실행 필수** - 연결이 끊기지 않고 안정적으로 동작합니다
- PID는 `.vite-server.pid` 파일에 저장됩니다
- 로그는 `vite-server.log` 파일에 기록됩니다
- **주의**: 직접 `npm run dev`를 실행하면 안 됩니다. 반드시 `./start-dev.sh` 사용!

### 문제 해결
- 서버가 응답하지 않으면 `./stop-dev.sh` 후 `./start-dev.sh` 실행

## 📁 프로젝트 구조

- `/src/pages/` - 페이지 컴포넌트
- `/src/components/` - 재사용 가능한 컴포넌트
- `/src/types.ts` - TypeScript 타입 정의

## 🛠 기술 스택

- React 19 + TypeScript
- Vite 7
- Material-UI v5
- Fabric.js 6
- React Router DOM 7

## 📝 주의사항

1. **Grid 컴포넌트**: CSS Grid 또는 Flexbox 사용 (MUI Grid 대신 Box 컴포넌트 활용)
2. **Import 구문**: type imports 대신 일반 imports 사용
3. **서버 주소**: 항상 localhost:5174 사용

## 🌐 언어 설정

### 개발자 커뮤니케이션
- **모든 응답은 한국어로 작성합니다**
- 코드 주석도 한국어로 작성합니다
- 기술 용어는 필요시 영어 병기 가능합니다

### 서비스 UI 텍스트
- **서비스에 표기되는 모든 텍스트는 반드시 영어로 작성합니다**
- 버튼, 라벨, 메뉴, 알림 메시지 등 사용자에게 보이는 모든 텍스트는 영어 사용
- placeholder, helperText, 툴팁 등도 영어로 작성
- 예외: 한국어 콘텐츠를 다루는 특별한 경우에만 한국어 허용

## ⚠️ 작업 시 주의사항

- **작업 중인 영역 외 다른 영역을 건드리지 않게 주의합니다**
- 특정 컴포넌트나 기능 수정 시 관련 없는 파일이나 코드는 수정하지 않습니다
- 변경사항이 다른 기능에 영향을 주지 않도록 격리된 수정을 수행합니다

## 🎨 디자인 참고 가이드

### idcx-admin/ 폴더 사용 규칙
- **`idcx-admin/` 폴더는 완전히 참고용으로만 사용합니다**
- **`idcx-admin/` 폴더의 소스는 절대 수정하지 않습니다**
- 현재 루트 폴더의 Contents Creator 파일들만 수정하고 서버를 실행합니다
- `idcx-admin/`의 디자인 시스템과 UI 컴포넌트를 참고하여 Contents Creator를 개선합니다

### 참고 대상
- `/idcx-admin/src/components/` - UI 컴포넌트 디자인 참고
- `/idcx-admin/src/theme/` - 색상, 폰트, 테마 시스템 참고
- `/idcx-admin/src/styles/` - 스타일 구조 참고
- `/idcx-admin/src/pages/` - 페이지 레이아웃 구조 참고

## 🎨 레이아웃 추가 지침

- **Promotion Banner에 새로운 레이아웃을 추가할 때는 반드시 모든 포맷에 적용해야 합니다**
  - banner-horizontal (1280*700px)
  - banner-vertical (400*900px)
  - banner-square (1080*1080px)
- 각 포맷 그룹에 동일한 templateVariant로 레이아웃을 추가합니다
- unifiedFormats.ts 파일에서 각 포맷 그룹별로 템플릿을 추가합니다

---
Last updated: 2025-07-30