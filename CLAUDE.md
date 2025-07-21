# Brand Studio 개발 가이드

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

- **모든 응답은 한국어로 작성합니다**
- 코드 주석도 한국어로 작성합니다
- 기술 용어는 필요시 영어 병기 가능합니다

---
Last updated: 2025-07-21