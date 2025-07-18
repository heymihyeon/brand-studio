---
title: 'Comprehensive Test Runner'
read_only: true
type: 'command'
version: '1.0.0'
---

# 🧪 '/test-all unit' 또는 '/test-all' 같이 프로젝트의 모든 테스트 실행

Purpose: Execute all test suites with intelligent retry and coverage validation
Target: $ARGUMENTS (test scope: 'unit'|'integration'|'e2e'|'all'|specific path)

**IMPORTANT**: All user-facing messages, questions, and results must be displayed in Korean.

## Step 1: Determine Test Scope

### 1.0 TDD Workflow Check
```
Remind about TDD cycle:
1. Write Test → 2. Implement → 3. Refactor → Repeat

Verify test files exist for:
- modules/orchestrator/__tests__/
- modules/executor/__tests__/
- modules/analyzer/__tests__/
```

## Step 1: Determine Test Scope

### 1.1 Parse Target
```
IF $ARGUMENTS == 'all' OR empty:
  Run all test types
ELSE:
  Run specified tests
```

### 1.2 Prepare Environment
```
Verify:
- SQLite test database ready
- Environment variables set (.env.local)
  - API keys (follow security rules from {project-root}/CLAUDE.md Section 4)
  - KUBECONFIG (for k8s tests)
- Clean test state
- Mock Kubernetes cluster available (for e2e)
```

## Step 2: Execute Tests

### 2.1 Run Test Suites
```
Execute in order:
1. Lint and TypeScript checks
   - npm run lint
   - npm run typecheck
2. Unit tests
   - npm run test:unit
3. Integration tests
   - npm run test:integration
4. E2E tests (if test cluster available)
   - npm run test:e2e
5. Build validation
   - npm run build
6. Docker validation
   - npm run docker:build
   - npm run docker:run

Handle failures:
- Stop on lint/type errors
- Continue on test failures
- Report all issues
```

### 2.2 Collect Results
```
Track:
- Pass/fail counts
- Execution times
- Coverage metrics
- Flaky tests
```

## Step 3: Coverage Analysis

### 3.1 Check Coverage
```
Compare against AIDA project thresholds:
- Overall: 80% minimum
- Core modules: 90% (orchestrator, analyzer)
- Safety-critical: 100% (command validation)
- New code: 95% minimum
- Current status: Track actual coverage
```

## Step 4: Generate Report

### 4.1 Test Summary
```
Display in Korean:
테스트 실행 결과:
- 전체: X개 중 Y개 통과
- 단위 테스트: X/Y
- 통합 테스트: X/Y
- E2E 테스트: X/Y
- 커버리지: XX% (목표: 80%)
- 코어 모듈 커버리지: XX% (목표: 90%)
- 안전 크리티컬 코드: XX% (목표: 100%)

실패한 테스트:
[List failed tests with error summary]

다음 단계:
[Recommendations]
```

## Error Handling

### On Catastrophic Failure
```
If all tests fail:
1. Check environment
   - Verify .env.local exists
   - Check SQLite database
   - Validate Kubernetes access
2. Reset test data
   - npm run db:migrate -- --reset
3. Run diagnostic mode
   - Check LLM API connectivity
   - Verify kubectl commands
4. Report issue in Korean
```

### AIDA-Specific Test Categories
```
Core Test Scenarios:
1. Pod CrashLoopBackOff simulation
2. Network connectivity issue tests
3. High resource usage scenarios
4. LLM rate limiting tests
5. Fallback strategy validation
6. Command safety validation (100% required)
```