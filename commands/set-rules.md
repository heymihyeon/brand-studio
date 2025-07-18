---
title: 'Project Rules Management System'
read_only: true
type: 'command'
version: '1.0.0'
---

# 📏 '/set-rules security' 같이 CLAUDE.md 규칙을 검토하고 필수 규칙 추가

Purpose: Analyze project's CLAUDE.md file and entire source code to identify missing essential rules and suggest improvements
Target: $ARGUMENTS (analysis scope: 'all'|'security'|'testing'|'architecture'|'commands' etc)

**IMPORTANT**: All user-facing messages, questions, and results must be displayed in Korean.

## Step 1: Initial State Assessment

### 1.1 Determine Analysis Scope
```
IF $ARGUMENTS == empty OR 'all':
  Analysis scope: Comprehensive project analysis
ELSE:
  Analysis scope: Focused on $ARGUMENTS area
```

### 1.2 Check Existing CLAUDE.md
```
CHECK:
• CLAUDE.md file existence
• Custom Command System section presence
• Basic structure validation

IF CLAUDE.md not exists:
  Create new from template
ELSE:
  Analyze existing file
```

## Step 2: Project Analysis

### 2.1 Code and Documentation Scan
```
ANALYZE:
• Source code patterns
• Configuration files (.env.example, tsconfig.json)
• Documentation content
• Development conventions
• Code quality metrics
• Kubernetes command patterns
• LLM API usage patterns
• Module boundaries and dependencies
```

### 2.2 Quality Assessment
```
COLLECT:
• Test coverage percentage
• Linter issues count
• Type safety status
• Security vulnerabilities
• Build/deployment setup
```

## Step 3: Essential Rules Check

### 3.1 Identify Missing Essential Rules
```
CHECK for essential sections:
1. Custom Command System (CRITICAL)
   - Required for /commands to work
   
2. All Essential Rules (CRITICAL)
   Reference {project-root}/CLAUDE.md for complete rule definitions:
   - Build Verification (Section 1)
   - TypeScript Safety Rules (Section 2)
   - Git Push Permission (Section 3)
   - Security Rules (Section 4)
   - Kubernetes Command Safety (Section 5)
   - Language Requirements (Section 6)
   - AIDA Architecture Rules (Section 7)
   - Coverage Requirements (Section 8)
   - Performance targets (< 3 min processing, < 1GB memory)
   
7. Git Workflow (HIGH)
   - Commit conventions
   - Branch naming
   - Push permissions
```

### 3.2 Present Essential Rules Plan
```
Present findings in Korean:
• List missing essential rules
• Explain impact of each
• Propose implementation plan
• Ask for user approval: "이 계획을 진행하시겠습니까? (yes/no)"
```

## Step 4: Apply Essential Rules

### 4.1 Backup Current CLAUDE.md
```
IF user approved:
  Create versioned backup: .claude/backups/CLAUDE.md.v[X]
ELSE:
  Exit with message: "필수 규칙 적용을 취소했습니다."
```

### 4.2 Update CLAUDE.md
```
ADD essential sections:
• Custom Command System at top
• Security rules
• Error handling standards
• Build/test requirements

OPTIMIZE structure for clarity
```

## Step 5: Recommendations

### 5.1 Analyze Additional Improvements
```
IDENTIFY optional enhancements:
• TDD workflow enforcement (Write Test → Implement → Refactor)
• Code style automation (ESLint + Prettier)
• Performance monitoring (alert processing time, memory usage)
• AIDA-specific patterns:
  - OpenTelemetry alert handling
  - LLM budget management
  - Kubernetes operation safety
  - 24/7 operation reliability
```

### 5.2 Present Recommendations
```
Present in Korean:
• Benefits of each recommendation
• Implementation effort
• Ask: "권고 사항도 적용하시겠습니까? (yes/no)"
```

## Step 6: Final Report

### 6.1 Summary Report
```
Report in Korean including:
• Applied changes
• Immediate actions needed
• Backup location
• Next steps for team
```

## Error Handling

### On Any Error
```
• Provide partial results
• Suggest manual alternatives
• Ensure rollback capability
```