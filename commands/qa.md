---
title: 'Project Quality Audit System'
read_only: true
type: 'command'
version: '1.0.0'
---

# 🔍 '/qa full' 또는 '/qa security' 같이 프로젝트 품질을 종합적으로 검사

Purpose: Comprehensive quality audit of the project based on CLAUDE.md standards
Target: $ARGUMENTS (specific area or 'full' for complete audit)

**IMPORTANT**: All user-facing messages, questions, and results must be displayed in Korean (한국어).

## Step 1: Audit Scope Determination

### 1.1 Parse Audit Target
- If $ARGUMENTS is empty or 'full' → Complete project audit
- If $ARGUMENTS specifies area (e.g., 'security', 'tests') → Focused audit
- If $ARGUMENTS is a file/directory path → Targeted audit

### 1.2 Load Quality Standards
Apply all quality standards from {project-root}/CLAUDE.md:
- Build Verification (Section 1)
- TypeScript Safety (Section 2)
- Security Rules (Section 4)
- Coverage Requirements (Section 8)

## Step 2: Quality Metrics Collection

### 2.1 Test Coverage Analysis
```
EXECUTE:
npm run coverage 2>&1 || echo "No test coverage configured"

COLLECT:
• Overall coverage percentage (Current: 0%)
• Statement coverage
• Branch coverage
• Function coverage
• Uncovered files list

SCORING (AIDA Project Targets):
• 95%+ → 10/10 (Excellent)
• 90-94% → 9/10 (Core modules target: 90%)
• 80-89% → 8/10 (Overall target: 80%)
• 70-79% → 7/10 (Acceptable)
• 60-69% → 6/10 (Below target)
• 40-59% → 4/10 (Poor)
• <40% → 2/10 (Critical)
• 0% → 0/10 (No tests)

SPECIAL REQUIREMENT:
• Safety-critical code (Command validation): 100% required
```

### 2.2 Code Quality Analysis
```
EXECUTE:
npm run lint        # ESLint check
npm run typecheck   # TypeScript validation

COLLECT:
• ESLint errors count
• ESLint warnings count
• TypeScript errors count
• Any 'any' type usage (PROHIBITED per CLAUDE.md)
• Console.log statements (only console.warn/error allowed)
• Kubernetes command validation patterns
• LLM API key exposure risks

SCORING:
• 0 errors, 0 warnings → 10/10
• 0 errors, 1-5 warnings → 8/10
• 0 errors, 6-10 warnings → 6/10
• 1-5 errors → 4/10
• 6+ errors → 2/10
```

### 2.3 Build Health Check
```
EXECUTE:
npm run build       # TypeScript compilation
npm run docker:build # Docker image build
npm run docker:run   # Container verification

COLLECT:
• Build success/failure
• Build time
• Docker image size
• Build warnings
• Missing dependencies
• Container health status

SCORING:
• Clean build <30s → 10/10
• Clean build <60s → 8/10
• Build with warnings → 6/10
• Build >60s → 4/10
• Build failure → 0/10
```

### 2.4 Security Audit
```
EXECUTE:
npm audit
grep -r "apiKey\|secret\|password" --include="*.ts" --include="*.tsx"

CHECK:
• Vulnerable dependencies
• Hardcoded secrets (CLAUDE_API_KEY, GEMINI_API_KEY)
• API key exposure in logs
• Kubectl command injection risks
• Environment variable validation (.env.local)
• OpenTelemetry webhook secret
• Kubernetes namespace whitelist
• LLM daily budget limits

SCORING:
• 0 vulnerabilities, no issues → 10/10
• Low severity only → 8/10
• Moderate severity → 6/10
• High severity → 3/10
• Critical severity → 0/10
```

### 2.5 Documentation Quality
```
ANALYZE:
• README completeness
• API documentation
• Code comments coverage
• JSDoc/TSDoc usage
• CHANGELOG maintenance

SCORING:
• All components documented → 10/10
• Core components documented → 8/10
• Basic README only → 6/10
• Minimal documentation → 4/10
• No documentation → 2/10
```

### 2.6 Performance Metrics
```
CHECK:
• Alert processing time (target: < 3 minutes)
• Concurrent alert handling (target: 3 alerts)
• Memory usage (target: < 1GB)
• CPU usage (target: < 2 cores)
• LLM API response times
• Kubernetes command execution times

SCORING:
• All metrics optimal → 10/10
• Minor issues → 8/10
• Some concerns → 6/10
• Performance problems → 4/10
• Critical issues → 2/10
```

### 2.7 Dependency Health
```
EXECUTE:
npm outdated
npm ls --depth=0

CHECK:
• Outdated packages count
• Major version behind
• Deprecated packages
• Security advisories
• License compliance

SCORING:
• All current, no issues → 10/10
• Minor updates needed → 8/10
• Some major updates → 6/10
• Many outdated → 4/10
• Critical updates needed → 2/10
```

### 2.8 Git Repository Health
```
EXECUTE:
git status
git log --oneline -10
git branch -a
git log --format="%h %s" -20

CHECK:
• Uncommitted changes
• Commit message convention compliance
• Branch naming convention
• .gitignore completeness
• Merge conflicts
• Recent commit quality

COMMIT MESSAGE CONVENTION (per CLAUDE.md):
Format: <type>(<scope>): <subject>

Valid Types:
• feat - New feature
• fix - Bug fix
• docs - Documentation only
• test - Tests addition/modification
• refactor - Code refactoring
• perf - Performance improvements
• chore - Maintenance tasks

Examples:
✅ CORRECT:
• feat(orchestrator): add network issue detection
• fix(executor): handle pod not found errors
• docs(readme): update installation steps
• test(analyzer): add gemini retry tests
• refactor(api): simplify webhook validation
• perf(llm): implement response caching
• chore(deps): update typescript to 5.x

❌ INCORRECT:
• Updated code (no type/scope)
• fix: bug (no scope)
• FEAT(api): add endpoint (wrong case)
• feat(api) add endpoint (missing colon)

BRANCH NAMING CONVENTION:
• feature/mvp-core-modules
• bugfix/fallback-strategy-fix
• hotfix/api-key-exposure
• chore/update-dependencies

Pattern: <type>/<description-with-hyphens>

VALIDATION:
grep -E "^(feat|fix|docs|test|refactor|perf|chore)\([a-z]+\): .+" 
for commit in $(git log --format="%s" -10); do
  if ! echo "$commit" | grep -qE "^(feat|fix|docs|test|refactor|perf|chore)\([a-z]+\): .+"; then
    echo "Invalid commit: $commit"
  fi
done

SCORING:
• Clean repo + all conventions followed → 10/10
• Clean repo + >90% convention compliance → 8/10
• Some uncommitted + >70% compliance → 6/10
• Many issues + <50% compliance → 4/10
• Chaotic state + no conventions → 2/10
```

## Step 3: Error Pattern Analysis

### 3.1 Common Issues Detection
```
PATTERNS TO CHECK:
• Unhandled promise rejections
• Silent error catching
• Missing error boundaries
• Inadequate validation
• Type assertion abuse
```

### 3.2 Architecture Violations
```
VERIFY AGAINST CLAUDE.md:
• Modular monolith structure (modules/orchestrator, executor, analyzer)
• Custom error classes (ValidationError, KubernetesError, LLMError)
• LLM retry policies and rate limiting
• Kubernetes safety patterns (read-only operations)
• Fallback strategies implementation
• Performance targets (< 3 min processing, < 1GB memory)
```

## Step 4: Report Generation

### 4.1 Overall Score Calculation
```
QUALITY SCORE: [Average of all categories]/10

GRADE ASSIGNMENT:
• 9.0-10.0 → A+ (Production Ready)
• 8.0-8.9 → A (Excellent)
• 7.0-7.9 → B (Good)
• 6.0-6.9 → C (Acceptable)
• 5.0-5.9 → D (Needs Work)
• <5.0 → F (Critical Issues)
```

### 4.2 Detailed Report Format
```
═══════════════════════════════════════════════════
PROJECT QUALITY AUDIT REPORT
═══════════════════════════════════════════════════
Date: [Current Date]
Scope: $ARGUMENTS

OVERALL GRADE: [Letter] ([Score]/10)

CATEGORY BREAKDOWN:
┌─────────────────────┬────────┬─────────────────┐
│ Category            │ Score  │ Status          │
├─────────────────────┼────────┼─────────────────┤
│ Test Coverage       │ X/10   │ [Status Icon]   │
│ Code Quality        │ X/10   │ [Status Icon]   │
│ Build Health        │ X/10   │ [Status Icon]   │
│ Security            │ X/10   │ [Status Icon]   │
│ Documentation       │ X/10   │ [Status Icon]   │
│ Performance         │ X/10   │ [Status Icon]   │
│ Dependencies        │ X/10   │ [Status Icon]   │
│ Git Management      │ X/10   │ [Status Icon]   │
└─────────────────────┴────────┴─────────────────┘

Status Icons:
✅ Excellent (9-10)
🟢 Good (7-8)
🟡 Warning (5-6)
🔴 Critical (0-4)

CRITICAL ISSUES:
[List any scores below 5/10 with details]

HIGH PRIORITY FIXES:
1. [Most critical issue]
2. [Second priority]
3. [Third priority]

DETAILED FINDINGS:
[Category-by-category breakdown with specific issues]

GIT WORKFLOW COMPLIANCE:
• Commit Message Convention: X/Y commits compliant
• Branch Naming Convention: X/Y branches compliant
• Non-compliant commits:
  [List specific commits that don't follow convention]
• Non-compliant branches:
  [List specific branches that don't follow convention]

IMPROVEMENT ROADMAP:
Phase 1 (Immediate):
• [Quick wins]

Phase 2 (This Week):
• [Important fixes]

Phase 3 (This Sprint):
• [Long-term improvements]

COMMANDS TO RUN:
# Development
npm run dev         # Start with hot reload
npm run dev:debug   # Start with debug logging

# Testing (TDD Workflow)
npm run test:watch  # TDD mode - watch for changes
npm test            # Run all tests
npm run test:unit   # Unit tests only
npm run test:integration # Integration tests
npm run test:e2e    # End-to-end tests (requires test cluster)
npm run coverage    # Generate coverage report

# Code Quality
npm run lint        # ESLint check
npm run lint:fix    # Auto-fix linting issues
npm run typecheck   # TypeScript type validation
npm run format      # Prettier formatting
npm run format:check # Check formatting without changes

# Build & Production
npm run build       # TypeScript compilation
npm run start       # Production server
npm run docker:build # Build Docker image
npm run docker:run  # Run in Docker

# Database
npm run db:init     # Create SQLite database
npm run db:migrate  # Run migrations
═══════════════════════════════════════════════════
```

## Step 5: Continuous Monitoring Setup

### 5.1 Suggest Automation
```
RECOMMEND:
• Pre-commit hooks setup
  - Commit message validation hook
  - Branch name validation
  - ESLint and TypeScript checks
  - Test execution before commit
• CI/CD quality gates
  - Automated commit convention checks
  - Branch protection rules
  - PR title validation
• Automated testing
• Regular audit scheduling
• Quality dashboards

GIT HOOKS SETUP:
# .git/hooks/commit-msg
#!/bin/bash
commit_regex='^(feat|fix|docs|test|refactor|perf|chore)\([a-z]+\): .+'
if ! grep -qE "$commit_regex" "$1"; then
    echo "Invalid commit message format!"
    echo "Format: <type>(<scope>): <subject>"
    echo "Example: feat(orchestrator): add network issue detection"
    exit 1
fi

# .git/hooks/pre-push
#!/bin/bash
branch=$(git rev-parse --abbrev-ref HEAD)
valid_branch_regex="^(feature|bugfix|hotfix|chore)\/[a-z0-9-]+$"
if ! echo "$branch" | grep -qE "$valid_branch_regex"; then
    echo "Branch name '$branch' does not follow naming convention!"
    echo "Use: feature/*, bugfix/*, hotfix/*, or chore/*"
    exit 1
fi
```

### 5.2 Track Progress
```
BASELINE:
• Current scores recorded
• Improvement targets set
• Timeline established
• Team responsibilities assigned
```