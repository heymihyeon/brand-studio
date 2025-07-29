# Brand Studio 버그 수정 계획서

## 📋 개요

현재 Brand Studio는 **기능적으로는 정상 동작**하지만, 코드 품질 개선이 필요한 상황입니다.
**기존 기능에 영향을 주지 않는 순서**로 단계적 개선을 진행합니다.

---

## 🎯 수정 우선순위 (기능 영향도 최소화 순서)

### Phase 1: 코드 정리 (기능 영향도 0%)

#### 1.1 미사용 코드 제거
**영향도:** 없음 | **소요시간:** 30분

```typescript
// 🗑️ 제거 대상
// src/pages/Home.tsx
import { Container } from '@mui/material'; // 미사용
import { DocumentIcon, BannerIcon, SnsIcon } from '../icons'; // 미사용
import { Campaign } from '../types'; // 미사용

// src/components/Canvas.tsx
import { getVehicleImageUrl, getVehicleColorFilter } from '../utils'; // 미사용 함수들
```

**수정 방법:**
1. ESLint `--fix` 옵션으로 자동 제거 가능한 항목 처리
2. 수동으로 미사용 import 제거
3. 미사용 함수 정의 제거

#### 1.2 변수 선언 최적화
**영향도:** 없음 | **소요시간:** 15분

```typescript
// 🔧 수정 대상
let imageSrc = '...'; // const로 변경 (재할당 없음)
let maxWidth = 100;   // const로 변경 (재할당 없음)
```

#### 1.3 이벤트 핸들러 매개변수 정리
**영향도:** 없음 | **소요시간:** 10분

```typescript
// 🔧 수정 전
const handleClick = (e) => { /* e 미사용 */ };

// ✅ 수정 후
const handleClick = (_e) => { /* 명시적으로 미사용 표시 */ };
// 또는
const handleClick = () => { /* 매개변수 제거 */ };
```

---

### Phase 2: 타입 안전성 개선 (기능 영향도 5%)

#### 2.1 any 타입 제거 - 단순한 케이스부터
**영향도:** 매우 낮음 | **소요시간:** 2시간

```typescript
// 🔧 수정 우선순위 (쉬운 것부터)

// 1순위: 명확한 타입이 있는 경우
const handleExport = (format: any) => { }
// ↓
const handleExport = (format: 'png' | 'jpg' | 'pdf') => { }

// 2순위: 객체 구조가 명확한 경우
const processTemplate = (data: any) => { }
// ↓
const processTemplate = (data: TemplateData) => { }

// 3순위: fabric.js 객체 (이미 타입 정의 존재)
const fabricObject: any = canvas.getActiveObject();
// ↓
const fabricObject: fabric.Object | null = canvas.getActiveObject();
```

#### 2.2 React Hook 의존성 배열 수정
**영향도:** 낮음 | **소요시간:** 1시간

```typescript
// 🔧 수정 전 (경고 발생하지만 동작함)
useEffect(() => {
  // assets 사용
}, []); // assets.length 누락

// ✅ 수정 후
useEffect(() => {
  // assets 사용
}, [assets.length]); // 의존성 추가
```

---

### Phase 3: 코드 구조 개선 (기능 영향도 10%)

#### 3.1 switch문 lexical declaration 수정
**영향도:** 낮음 | **소요시간:** 10분

```typescript
// 🔧 수정 전
switch (category) {
  case 'banner':
    const bannerData = getBannerData(); // 오류
    break;
}

// ✅ 수정 후
switch (category) {
  case 'banner': {
    const bannerData = getBannerData(); // 블록 스코프
    break;
  }
}
```

#### 3.2 복잡한 useEffect 의존성 분리
**영향도:** 낮음 | **소요시간:** 30분

```typescript
// 🔧 수정 전
useEffect(() => {
  if (editableValues.dealer?.name) {
    setShowDealerInfo(true);
  }
}, [editableValues.dealer?.name]); // 복잡한 표현식

// ✅ 수정 후
const dealerName = editableValues.dealer?.name;
useEffect(() => {
  if (dealerName) {
    setShowDealerInfo(true);
  }
}, [dealerName]); // 단순한 변수
```

---

## 🛠️ 단계별 실행 계획

### Step 1: 준비 작업 (5분)
```bash
# 현재 상태 백업
git add -A
git commit -m "백업: 버그 수정 전 현재 상태"

# 브랜치 생성
git checkout -b bugfix/code-quality-improvement
```

### Step 2: Phase 1 실행 (1시간)
```bash
# 자동 수정 가능한 항목 처리
npm run lint -- --fix

# 수동 수정
# - 미사용 import 제거
# - 미사용 함수 제거
# - const/let 변경
```

### Step 3: Phase 2 실행 (3시간)
```bash
# any 타입 단계적 제거
# - 간단한 케이스부터
# - 기존 타입 활용
# - 새로운 타입 정의 최소화
```

### Step 4: Phase 3 실행 (1시간)
```bash
# 구조적 개선
# - switch문 수정
# - useEffect 의존성 정리
```

### Step 5: 검증 (30분)
```bash
# 린트 검사
npm run lint

# 타입 검사
npx tsc --noEmit

# 기능 테스트
npm run dev
# → 모든 기능 정상 동작 확인
```

---

## 📊 수정 후 예상 효과

### 정량적 개선
- **ESLint 오류:** 86개 → 0개
- **ESLint 경고:** 10개 → 0개
- **any 타입 사용:** 40+ 건 → 10건 이하 (fabric.js 관련만 유지)

### 정성적 개선
- **코드 가독성** 향상
- **타입 안전성** 강화 (런타임 오류 방지)
- **개발 생산성** 향상 (IDE 지원 개선)
- **유지보수성** 향상 (리팩토링 안전성)

---

## ⚠️ 주의사항

### 절대 건드리지 말 것
1. **fabric.js 관련 복잡한 any 타입** - 라이브러리 타입 정의 불완전
2. **Canvas 렌더링 로직** - 기능에 직접적 영향
3. **localStorage 저장/로드 로직** - 데이터 호환성 문제 가능성
4. **이미지 처리 관련 함수** - 복잡한 타입 변환 로직

### 수정 시 검증 필수 항목
- [ ] 모든 카테고리 정상 작동
- [ ] 템플릿 로딩 및 편집 기능
- [ ] 브랜드 자산 업로드/선택
- [ ] 내보내기 기능 (PNG, JPG, PDF)
- [ ] 360도 차량 뷰 회전
- [ ] 로컬스토리지 저장/불러오기

---

## 📅 권장 실행 시점

**최적 타이밍:**
- 새로운 기능 개발 전
- 코드 리뷰 진행 전
- 팀 구성원 합류 전

**피해야 할 시점:**
- 데모 직전
- 중요한 기능 배포 직전
- 긴급한 버그 수정 중

---

이 계획서는 **안전한 순서**로 코드 품질을 개선하되, **기존 기능에는 전혀 영향을 주지 않는** 것을 최우선으로 합니다.