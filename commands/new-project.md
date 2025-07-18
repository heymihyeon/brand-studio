---
title: 'Project Initialization from PRD'
read_only: true
type: 'command'
version: '1.0.0'
---

# 🚀 '/new-project AIDA' 같이 PRD를 기반으로 새 프로젝트 초기화 및 설정

Purpose: Initialize a new project from PRD with systematic setup and development plan
Target: $ARGUMENTS (project name or PRD file path)

**IMPORTANT**: All user-facing messages, questions, and results must be displayed in Korean.

## Step 1: PRD Analysis and Transformation

### 1.1 Locate and Read PRD
```
Check for PRD file:
- Look for PRD.md in current directory
- Check $ARGUMENTS for PRD file path
- If not found, ask: "PRD 파일 경로를 입력해주세요:"
```

### 1.2 Create PRD_FOR_CLAUDE.md
```
Transform PRD into structured format:

# PRD_FOR_CLAUDE.md

## 프로젝트 개요
- 목표와 범위
- 핵심 기능 목록
- 기술 스택 결정

## 우선순위별 기능
### P0 (필수)
- [기능명]: 구현 요구사항

### P1 (중요)
### P2 (선택)

## 기술 요구사항
- 성능 목표
- 보안 요구사항
- 확장성 고려사항

## 필수 규칙 (AIDA 프로젝트 기준)
모든 필수 규칙은 {project-root}/CLAUDE.md를 참조:
- TypeScript Safety Rules (Section 2)
- Security Rules (Section 4)
- Build Verification (Section 1)
- Coverage Requirements (Section 8)
```

## Step 2: Project Setup with Context7

### 2.1 Framework Selection
```
🔥 Context7 필수 사용 시점 #1
프레임워크 선택을 위한 최신 정보 확인:

"Compare Next.js 14 vs Remix vs Vite for [프로젝트 유형] use context7"
"[선택된 프레임워크] latest setup best practices use context7"

기반으로 프로젝트 초기화:
- Next.js: npx create-next-app@latest
- Vite: npm create vite@latest
- Node.js API: 수동 설정
```

### 2.2 Essential Dependencies
```
🔥 Context7 필수 사용 시점 #2
의존성 선택 시 최신 권장사항 확인:

"[프레임워크] essential dependencies 2025 use context7"
"TypeScript 5 strict config recommendations use context7"

필수 개발 도구만 설치:
- TypeScript (strict mode 필수)
- ESLint + Prettier
- Testing framework (Jest/Vitest)
- Git hooks (husky)
- Docker (containerization)

프로젝트별 추가 의존성:
- AIDA 프로젝트: @anthropic-ai/sdk, @google/generative-ai, sqlite3, winston
```

## Step 3: Create Project Structure

### 3.1 Generate CLAUDE.md
```
프로젝트 규칙 문서 생성:

# CLAUDE.md

## 프로젝트 구조
[프로젝트별 폴더 구조]

## 필수 개발 규칙
1. TypeScript strict mode (NEVER use 'any' type)
2. 테스트 커버리지:
   - 전체: 80% 최소
   - 핵심 모듈: 90%
   - 안전 크리티컬 코드: 100%
3. Conventional Commits
4. 필수 빌드 검증:
   - npm run build (0 errors)
   - npm test (all pass)
   - npm run lint && npm run typecheck (0 errors)
   - npm run docker:build && npm run docker:run
5. Git push 권한 확인 필수

## 보안 규칙
- API 키 환경 변수 관리
- 하드코듩된 비밀 금지
- 로그에 API 키 노출 금지

## LLM Rate Limiting (AIDA 프로젝트)
```typescript
const RATE_LIMITS = {
  claude: {
    requestsPerMinute: 20,
    requestsPerHour: 500,
    tokensPerMinute: 40000,
    dailyBudget: 100 // USD
  },
  gemini: {
    requestsPerMinute: 60,
    requestsPerHour: 1000,
    tokensPerMinute: 60000,
    dailyBudget: 50 // USD
  }
};

const RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000, // ms
  maxDelay: 10000,
  backoffMultiplier: 2,
  retryableErrors: [
    'rate_limit_exceeded',
    'timeout',
    'service_unavailable'
  ]
};
```

## 기술 스택
[확정된 기술 스택 목록]

## 에러 핸들링
- Custom error classes 사용
- Silent failures 금지
- User-friendly error messages
```

### 3.2 Folder Structure
```
최소 필수 구조만 생성:

# 일반 프로젝트
src/
├── app/          # 또는 pages/
├── components/
├── lib/
├── types/
└── styles/

# AIDA 프로젝트 (모듈러 모놀리스 구조)
src/
├── modules/
│   ├── orchestrator/      # Claude 오케스트레이션 모듈
│   │   ├── index.ts       # 모듈 exports
│   │   ├── orchestrator.ts # 메인 클래스
│   │   ├── prompts.ts     # Claude 프롬프트
│   │   └── __tests__/     # 모듈 테스트
│   ├── executor/          # K8s 명령 실행 모듈
│   │   ├── index.ts
│   │   ├── executor.ts
│   │   ├── validators.ts  # 명령어 검증
│   │   ├── fallback.ts    # 폴백 전략
│   │   └── __tests__/
│   └── analyzer/          # Gemini 분석 모듈
│       ├── index.ts
│       ├── analyzer.ts
│       ├── prompts.ts     # Gemini 프롬프트
│       └── __tests__/
├── api/                   # Express.js 라우트
├── utils/
│   ├── llm/              # LLM 클라이언트
│   │   ├── claude.ts     # Claude 클라이언트 (재시도 포함)
│   │   ├── gemini.ts     # Gemini 클라이언트 (재시도 포함)
│   │   └── rateLimiter.ts # 공유 rate limiting
│   └── k8s/
│       ├── client.ts     # Kubernetes API 래퍼
│       └── commands.ts   # 명령어 빌더
├── types/
│   ├── alerts.ts         # OpenTelemetry 타입
│   ├── tasks.ts          # 태스크 타입
│   └── llm.ts           # LLM 응답 타입
└── app.ts                # 메인 진입점

.claude/commands/  # 커스텀 명령어
```

## Step 4: Development Plan with Context7

### 4.1 Break Down Features
```
🔥 Context7 필수 사용 시점 #3
각 기능 구현 전 최신 패턴 확인:

P0 기능별 태스크 분해:
TASK-001: [기능] 구현
  시작 전: "[기능] implementation pattern use context7"
  크기: S (2시간)
  검증: 테스트 + lint
```

### 4.2 Sprint Planning
```
Sprint 1 (Week 1): Foundation
- 프로젝트 설정
- 기본 구조
- P0 기능 시작

각 스프린트 시작 시 Context7 체크:
"[기술스택] weekly update changes use context7"
```

## Step 5: Task Execution Process

### 5.1 Task Start Checklist
```
🔥 Context7 필수 사용 시점 #4
매 태스크 시작 시:

1. Context7로 최신 패턴 확인
   "[구현할 기능] [프레임워크] pattern use context7"
   
2. 구현 시작
3. 테스트 작성
4. CLAUDE.md 준수 확인
```

### 5.2 Quality Gates
```
태스크 완료 기준:
□ 기능 구현 완료
□ 테스트 통과 (80%+ coverage)
□ ESLint 통과 (0 errors)
□ TypeScript 타입 검사 (0 errors)
□ Build 성공
□ Docker 컨테이너 실행 확인
```

## Step 6: Context7 Integration Points

### 6.1 언제 Context7를 사용해야 하는가
```
🔥 필수 Context7 사용 상황:

1. 프로젝트 시작
   - 프레임워크 선택
   - 보일러플레이트 구조
   - 초기 설정

2. 새 기능 구현
   - 컴포넌트 패턴
   - 상태 관리 방식
   - API 설계

3. 문제 해결
   - 에러 메시지 검색
   - 성능 최적화
   - 보안 패턴

4. 라이브러리 선택
   - 최신 대안 확인
   - 버전 호환성
   - 마이그레이션 가이드
```

### 6.2 Context7 쿼리 템플릿
```
기능별 쿼리 예시:

인증 구현:
"Next.js 14 auth implementation with [provider] use context7"

상태 관리:
"[Zustand/Redux] with TypeScript setup 2025 use context7"

API 설계:
"REST API error handling best practices use context7"

테스팅:
"Vitest with React Testing Library setup use context7"
```

## Output Format

```
═══════════════════════════════════════════════════
신규 프로젝트 초기화 완료: $PROJECT_NAME
═══════════════════════════════════════════════════

✅ 완료된 작업:
- PRD 분석 및 변환
- 프로젝트 구조 생성
- 개발 환경 설정
- 개발 계획 수립

📋 개발 계획:
- 총 태스크: [X]개
- 예상 기간: [Y]주
- 첫 스프린트: [날짜]

🔥 Context7 활용 포인트:
1. 새 기능 시작 전 최신 패턴 확인
2. 에러 발생 시 솔루션 검색
3. 라이브러리 선택 시 비교
4. 주간 기술 업데이트 확인

다음 명령어:
/plan TASK-001  # 첫 태스크 시작
/create-feature [기능명]  # 기능 개발
/qa  # 품질 검사

💡 팁: 각 태스크 시작 시 Context7로 최신 패턴을 확인하세요!
═══════════════════════════════════════════════════
```

## Error Handling

### Common Issues
```
프로젝트 생성 실패:
- Node 버전 확인 (18+ 필수)
- 디렉토리 권한 확인
- TypeScript 설치 확인

의존성 설치 실패:
- npm cache clean --force
- node_modules 삭제 후 재설치
- package-lock.json 삭제 후 재생성

타입 오류:
- tsconfig.json strict 옵션 확인
- @types/* 패키지 설치 확인
```