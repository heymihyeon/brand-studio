---
title: 'Phase 1 Task Completion Verification'
read_only: true
type: 'command'
version: '2.0.0'
---

# ✅ '/check-complete' - Verify Phase 1 production tasks

Purpose: Check if Phase 1 tasks are properly completed with all requirements met
Usage: `/check-complete [task-id|all]`

**Output Language**: Korean (한국어) for all user-facing messages

## What This Command Does

1. Verifies specific tasks or all tasks from Phase 1
2. Checks code quality requirements (no 'any', coverage)
3. Validates security implementation (kubectl whitelist)
4. Confirms agents are working (<3 min processing)
5. Reports clear Pass/Fail status

## Core Verification Checklist

### 1. Code Quality Gates
```bash
# Run these checks - ALL must pass:
npm test          # Tests passing
npm run typecheck # 0 errors, no 'any' types
npm run lint      # 0 errors
npm run build     # Successful build
```

### 2. Coverage Requirements
```bash
npm run coverage

# Check results against Phase 1 targets:
# - Overall: ≥ 80%
# - Security modules: = 100%
# - Core agents: ≥ 90%
```

### 3. Security Validation
```bash
# For kubectl command validation:
npm run test:security

# Verify whitelist patterns exist:
# - Only GET, DESCRIBE, LOGS, TOP allowed
# - No DELETE, CREATE, APPLY, PATCH
```

### 4. Agent Health Check
```bash
# Start both agents
npm run start:gateway &      # Port 8000
npm run start:investigator & # Port 8001

# Health endpoints
curl http://localhost:8000/health
curl http://localhost:8001/health

# A2A discovery
npx a2a discover --port-range 8000-8001
```

### 5. Alert Processing Test
```bash
# Test webhook with sample alert
curl -X POST http://localhost:8000/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "alertName": "PodCrashLoopBackOff",
    "namespace": "default",
    "pod": "test-pod"
  }'

# Verify processing time < 3 minutes
```

## Task-Specific Checks

### Gateway Tasks (T001-T003)
```
□ Webhook endpoint exists (/webhook)
□ AlertManager payload validation
□ Forwards to Investigator via A2A
□ Health endpoint working
□ Tests cover webhook scenarios
```

### Investigator Tasks (T004-T006)
```
□ Golden commands implemented
□ Command validation working
□ Analysis within 3 minutes
□ Results properly formatted
□ 100% security test coverage
```

### Integration Tasks (T007-T008)
```
□ End-to-end alert flow working
□ Both agents discoverable
□ Performance < 3 min
□ Handles 3 concurrent alerts
□ Integration tests passing
```

## Verification Report Format

```
═══════════════════════════════════════════════════
PHASE 1 COMPLETION CHECK
═══════════════════════════════════════════════════
Checked: [timestamp]
Mode: [all|specific task]

## Quality Gates
✅ Tests: PASS (X tests)
✅ TypeScript: PASS (0 errors)
✅ Lint: PASS (0 errors)
✅ Build: PASS

## Coverage Report
Overall: 85% ✅ (target: 80%)
Security: 100% ✅ (target: 100%)
Core Agents: 92% ✅ (target: 90%)

## Agent Status
Gateway (8000): ✅ Healthy
Investigator (8001): ✅ Healthy
A2A Discovery: ✅ Both visible

## Performance Test
Alert Processing: 2m 15s ✅ (target: <3m)
Concurrent Alerts: 3/3 ✅

## Task Verification
T001 Gateway Webhook: ✅ Complete
T002 Alert Validation: ✅ Complete
T003 A2A Integration: ✅ Complete
T004 Investigator Core: ✅ Complete
T005 Golden Commands: ✅ Complete
T006 Security Module: ✅ Complete

RESULT: ✅ ALL CHECKS PASSED
═══════════════════════════════════════════════════
```

## Failure Handling

### If any check fails:
```
❌ TASK INCOMPLETE - Fix required issues:

1. TypeScript errors found:
   - src/gateway/webhook.ts:45 - 'any' type used
   - Fix: Replace with specific type

2. Security coverage too low: 87%
   - Add tests for command validation edge cases
   
3. Alert processing too slow: 3m 45s
   - Check for blocking operations
   - Review async/await usage

Re-run after fixes: /check-complete
```

## Quick Commands

```bash
# Check all Phase 1 tasks
/check-complete all

# Check specific task
/check-complete T001

# Check gateway tasks only
/check-complete gateway

# Check investigator tasks only
/check-complete investigator
```

## Critical Rules (No Exceptions)

1. **NO 'any' types** - TypeScript strict mode
2. **100% security coverage** - All kubectl patterns tested
3. **<3 minute processing** - Performance requirement
4. **All tests passing** - No skipped tests
5. **Both agents healthy** - Must respond to health checks

## Common Issues

### TypeScript Errors
- Check for 'any' types: `grep -r ": any" src/`
- Ensure all functions have return types
- Define all interfaces properly

### Coverage Too Low
- Run: `npm run coverage -- --verbose`
- Focus on uncovered lines
- Add edge case tests

### Agents Not Starting
- Check ports 8000/8001 are free
- Verify environment variables set
- Check logs for errors

### Performance Issues
- Profile with: `npm run profile`
- Check for sync operations in async functions
- Verify kubectl commands are cached