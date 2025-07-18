# Brand Studio 개발 가이드

## 🚀 서버 실행 방법

**항상 다음 주소를 사용하세요:**
- **http://127.0.0.1:5173/**

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
- 서버는 항상 **127.0.0.1:5173**에서 실행됩니다
- 백그라운드에서 안정적으로 실행되어 연결이 끊기지 않습니다
- PID는 `.vite-server.pid` 파일에 저장됩니다
- 로그는 `vite-server.log` 파일에 기록됩니다

### 문제 해결
- localhost 대신 **127.0.0.1** 사용
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

1. **Grid 컴포넌트**: MUI v5의 기본 Grid 사용 (Grid2 아님)
2. **Import 구문**: type imports 대신 일반 imports 사용
3. **서버 주소**: 항상 127.0.0.1:5173 사용

---
Last updated: 2025-07-18