# plan.md - AIDA Project Task Planning Guide for LLM Execution

Purpose: LLM(Claude Code)이 AIDA MVP를 구현하기 위한 원자적 작업 계획 생성 가이드
Project: AI-Driven Incident Diagnosis & Analysis (2주 MVP)
User Instruction: $ARGUMENTS

**🚨 CRITICAL**: 이 가이드는 LLM이 직접 코드를 작성하고 실행하기 위한 것입니다. 모든 작업은 CLAUDE.md 규칙을 엄격히 준수해야 합니다.

## ⚠️ 필수 준수 사항 (매 작업마다 확인)

### 🔴 절대 금지 사항
```typescript
// ❌ NEVER DO THIS - 즉시 실패 처리
const data: any = {};                    // 'any' 타입 사용 금지
exec(`kubectl ${userInput}`);            // 임의 명령 실행 금지
console.log(`API Key: ${apiKey}`);      // API 키 노출 금지
kubectl delete/create/apply/patch        // 쓰기 작업 금지
```

### 🟢 항상 수행할 검증
```bash
# 모든 코드 변경 후 반드시 실행
npm run typecheck    # 0 errors 필수
npm run lint         # 0 errors 필수
npm test            # 관련 테스트 통과 필수
```

## Step 1: 작업 분해 시 LLM 체크리스트

### 1.1 지시사항 분석 (파일 확인 우선)
```bash
# 1. 먼저 프로젝트 규칙 파일 읽기
cat CLAUDE.md              # 프로젝트 규칙 확인
cat CLAUDE_FOR_PRD.md      # PRD 실행 가이드 확인

# 2. 현재 프로젝트 상태 파악
ls -la src/               # 소스 구조 확인
npm list                  # 설치된 패키지 확인
cat package.json          # 스크립트 및 의존성 확인
```

### 1.2 작업 원자화 규칙
- **10-30분 단위**: 하나의 함수, 하나의 테스트, 하나의 타입 정의
- **명확한 파일 경로**: `src/modules/orchestrator/index.ts` (정확한 경로)
- **구체적 명령어**: `npm test -- orchestrator.test.ts` (정확한 테스트)
- **검증 가능한 결과**: "타입 오류 0개", "테스트 5개 통과"

## Step 2: LLM용 작업 카드 템플릿

```
TASK ID: [T###]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
제목: [동사 + 구체적 대상 + 파일명]
예상 시간: [10-30분]
카테고리: [TypeDefinition|Implementation|Testing|Configuration]

🔍 사전 확인 (반드시 수행):
1. cat [관련 파일 경로] - 현재 상태 확인
2. grep -r "any" src/ - any 타입 사용 확인
3. cat .env.example - 필요한 환경변수 확인

📝 작업 내용:
1. [정확한 파일 경로]에 [구체적 코드] 작성
   ```typescript
   // 예시 코드 스니펫
   interface OpenTelemetryAlert {
     alertname: string;
     severity: 'critical' | 'warning' | 'info';
   }
   ```

2. [정확한 명령어]로 검증
   ```bash
   npm run typecheck -- --noEmit
   ```

3. [테스트 파일 경로]에 테스트 작성
   ```typescript
   describe('함수명', () => {
     it('should 구체적 동작', () => {
       // 테스트 코드
     });
   });
   ```

✅ 완료 조건:
- [ ] 파일 생성/수정: [경로/파일명]
- [ ] TypeScript 오류: 0개
- [ ] 테스트 통과: [테스트명]
- [ ] CLAUDE.md 규칙 준수: any 타입 없음

⚠️ 주의사항:
- [특정 제약사항 - 예: "kubectl 명령은 SAFE_COMMANDS 패턴만 허용"]
```

## Step 3: AIDA 특화 작업 패턴

### 3.1 TypeScript 타입 정의 작업
```
작업 시작:
1. mkdir -p src/types
2. touch src/types/[도메인].ts
3. 타입 작성 (union types 선호, never any)
4. export 확인
5. npm run typecheck

CLAUDE.md 체크:
- ✓ any 타입 사용 여부
- ✓ 명시적 타입 정의
- ✓ strict mode 호환성
```

### 3.2 LLM API 통합 작업
```
작업 시작:
1. API 키 환경변수 확인: echo $CLAUDE_API_KEY | wc -c
2. Rate limiter 구현 확인: cat src/utils/llm/rateLimiter.ts
3. Retry 로직 포함 확인
4. 에러 타입 정의: LLMError extends Error

CLAUDE.md 체크:
- ✓ API 키 노출 금지
- ✓ Rate limit 준수 (Claude: 20/min)
- ✓ 예산 추적 구현
```

### 3.3 Kubernetes 명령 검증 작업
```
작업 시작:
1. SAFE_COMMANDS 패턴 확인: cat src/modules/executor/validators.ts
2. 각 명령에 대한 regex 테스트
3. Fallback 전략 구현
4. 100% 테스트 커버리지 필수

CLAUDE.md 체크:
- ✓ 읽기 전용 작업만 허용
- ✓ 모든 명령 검증 필수
- ✓ 실패 시 대안 준비
```

## Step 4: 3분 성능 목표 달성 전략

### 4.1 성능 영향 측정
```typescript
// 모든 비동기 작업에 시간 측정 추가
const startTime = Date.now();
// ... 작업 수행
const duration = Date.now() - startTime;
console.log(`Task completed in ${duration}ms`);

// 3분 = 180,000ms 목표
// - Orchestration: < 10s
// - Execution: < 120s  
// - Analysis: < 50s
```

### 4.2 병렬 처리 가능 작업 식별
```typescript
// 병렬 실행 가능한 kubectl 명령
const results = await Promise.all([
  kubectl('get pods -n namespace'),
  kubectl('get svc -n namespace'),
  kubectl('get events -n namespace')
]);
```

## Step 5: 검증 중심 작업 흐름

### 5.1 각 작업 완료 시 필수 검증
```bash
#!/bin/bash
# verify-task.sh - 모든 작업 후 실행

echo "🔍 CLAUDE.md 규칙 검증 시작..."

# 1. TypeScript 검증
echo "1. TypeScript 체크..."
npm run typecheck || exit 1

# 2. Any 타입 검색
echo "2. 'any' 타입 검색..."
! grep -r "any" src/ --include="*.ts" || exit 1

# 3. 린트 검증
echo "3. ESLint 체크..."
npm run lint || exit 1

# 4. 테스트 실행
echo "4. 테스트 실행..."
npm test || exit 1

# 5. 보안 검증
echo "5. API 키 노출 검증..."
! grep -r "CLAUDE_API_KEY\|GEMINI_API_KEY" src/ || exit 1

echo "✅ 모든 검증 통과!"
```

### 5.2 통합 테스트 검증
```bash
# 3가지 시나리오 테스트
npm run test:scenario:crashloop    # < 3분
npm run test:scenario:network       # < 3분  
npm run test:scenario:resource      # < 3분
```

## 📋 LLM 실행을 위한 명령어 사전

### 프로젝트 초기화
```bash
# 정확한 명령어 순서
npm init -y
npm install typescript@5.x express@4.x @types/node @types/express
npm install @anthropic-ai/sdk @google/generative-ai
npm install -D jest @types/jest ts-jest eslint prettier
npx tsc --init --strict --target ES2022 --module commonjs
```

### 디렉토리 구조 생성
```bash
mkdir -p src/{modules/{orchestrator,executor,analyzer},api,utils/{llm,k8s},types}
mkdir -p tests/{unit,integration,e2e}
touch src/app.ts
touch src/types/{alerts,tasks,llm}.ts
```

### 환경 설정
```bash
cp .env.example .env.local
# 편집기로 .env.local 열어서 API 키 설정
```

## 🎯 작업 우선순위 결정 가이드

### 우선순위 1: 안전성 기반 (Safety-First)
1. 타입 정의 → 2. 검증 로직 → 3. 구현 → 4. 테스트

### 우선순위 2: 의존성 기반
```
types/ → utils/ → modules/ → api/ → integration
```

### 우선순위 3: 시나리오 중요도
1. CrashLoopBackOff (가장 흔함)
2. Network Issues (복잡도 높음)
3. Resource Usage (단순함)

## ⚡ LLM 작업 실행 팁

### 1. 항상 현재 상태 확인
```bash
git status          # 변경사항 확인
npm test           # 테스트 상태 확인
npm run typecheck  # 타입 오류 확인
```

### 2. 작은 단위로 커밋
```bash
git add [specific-file]
git commit -m "feat(module): add specific functionality"
```

### 3. 실패 시 즉시 롤백
```bash
git checkout -- [file]  # 파일 단위 롤백
git reset --hard HEAD   # 전체 롤백 (주의!)
```

## 📊 작업 계획 출력 형식

```
═══════════════════════════════════════════════════
AIDA MVP 작업 계획
═══════════════════════════════════════════════════
목표: $ARGUMENTS
총 작업 수: [개수]
예상 완료 시간: [시간]

작업 목록:
[순차적 작업 카드 - 의존성 순서대로]

핵심 검증 포인트:
- [ ] 모든 타입 정의 완료
- [ ] 3가지 시나리오 구현
- [ ] 3분 처리 시간 달성
- [ ] 0 TypeScript 오류

위험 요소:
[식별된 위험과 대응 방안]
═══════════════════════════════════════════════════
```

## 🚨 최종 체크리스트

작업 계획 생성 완료 후 확인:
1. 모든 작업이 10-30분 단위인가?
2. 각 작업에 구체적 파일 경로가 있는가?
3. 각 작업에 검증 명령어가 포함되어 있는가?
4. CLAUDE.md 규칙 체크가 각 단계에 있는가?
5. 3분 성능 목표가 고려되었는가?

**Remember**: LLM은 한 번에 하나의 작업만 수행. 각 작업은 독립적으로 실행 가능해야 함.