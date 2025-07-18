---
title: 'Automated Code Quality Improvement'
read_only: true
type: 'command'
version: '1.0.0'
---

# 🧹 '/clean-code --auto-fix' 또는 '/clean-code src/' 같이 코드 품질 자동 개선

Purpose: Analyze and improve code quality through automated refactoring and cleanup
Target: $ARGUMENTS (file/directory path or 'all' for entire project)

**IMPORTANT**: All user-facing messages, questions, and results must be displayed in Korean.

## Step 1: Scope and Mode Selection

### 1.1 Parse Target and Mode
```
Determine mode:
- --analyze-only: No modifications
- --auto-fix: Safe changes only
- --deep-refactor: Structural improvements
- Default: Interactive mode

Extract target path from $ARGUMENTS
```

### 1.2 Create Safety Checkpoint
```
Create backup:
- Git stash uncommitted changes
- Create backup branch
- Note current commit
```

## Step 2: Code Analysis

### 2.1 Run Static Analysis
```
Execute analyzers:
- ESLint check (npm run lint)
- TypeScript checking (npm run typecheck)
- Complexity analysis
- Security scan (API key exposure)
- Kubernetes command validation
- LLM usage pattern check
- Module structure validation
```

### 2.2 Identify Issues
```
Categorize by risk:
- SAFE: Formatting, unused imports
- MODERATE: Method extraction, dead code
- RISKY: Architecture changes
```

## Step 3: Apply Improvements

### 3.1 Safe Fixes (Automatic)
```
Apply if mode permits:
- Format code with Prettier
- Remove unused imports
- Delete console.logs (keep console.warn/error)
- Fix linting errors
- Apply TypeScript Safety Rules from {project-root}/CLAUDE.md Section 2
- Apply Security Rules from {project-root}/CLAUDE.md Section 4
- Apply Kubernetes Command Safety from {project-root}/CLAUDE.md Section 5
- Apply AIDA Architecture Rules from {project-root}/CLAUDE.md Section 7
```

### 3.2 Interactive Changes
```
For each moderate/risky change:
- Show current vs proposed
- Explain benefits
- Get user approval in Korean
```

## Step 4: Validation

### 4.1 Test Changes
```
After modifications:
- Run tests
- Check build
- Verify functionality
```

## 🔨 Mandatory Build Verification

**CRITICAL**: Follow complete build verification process from {project-root}/CLAUDE.md Section 1.
All steps MUST pass after code improvements.

### 📋 Cleanup Report Template
Use the base template from {project-root}/CLAUDE.md Section 9 with additional cleanup metrics:

```markdown
📊 개선 지표:
- 제거된 'any' 타입: X개
- 추가된 타입 정의: Y개
- 제거된 console.log: Z개
- 개선된 파일: N개
- 추가된 에러 핸들링: M개
- 검증된 Kubernetes 명령어: K개

⚠️ 추가 개선 가능 사항:
- [남은 개선 사항 목록]
```

## Step 5: Report Results

### 5.1 Summary Report
```
Display in Korean:
- Applied changes count
- Improved metrics
- Files modified
- Rollback instructions
```

