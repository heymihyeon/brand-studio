---
title: 'AIDA Project Task Planning System'
read_only: true
type: 'command'
version: '2.0.0'
---

# 📋 '/plan API Refactoring' - Decompose work into 10-30 minute atomic tasks with implementation details

Purpose: Transform any instruction into atomic, executable tasks with complete implementation specifications
User Instruction: $ARGUMENTS

**IMPORTANT**: All user-facing messages, questions, and results must be displayed in Korean (한국어).

## Step 1: Instruction Analysis & Source Code Review

### 1.1 Core Analysis
1. Parse instruction into primary objective
2. **Full codebase scan**: Analyze ALL relevant source files
3. Identify all components and dependencies  
4. Determine scope boundaries
5. Load relevant project rules from {project-root}/CLAUDE.md
6. Estimate total effort and complexity
7. **Duplicate prevention**: Check for existing implementations
8. Identify modification targets with specific line numbers

### 1.2 Source Code Mapping
For each task, identify:
```
SOURCE ANALYSIS:
• Target files: [exact file paths]
• Current implementation: [current code state]
• Modification plan: [specific changes with line numbers]
• Impact analysis: [affected modules and dependencies]
```

### 1.3 Atomic Task Creation
Break down into smallest meaningful units:
- Each task: 10-30 minutes maximum
- Single, verifiable outcome per task
- **Complete implementation code included**
- Clear input → process → output flow
- Independent execution capability
- Measurable completion criteria

## Step 2: Enhanced Task Card Specification

```
TASK ID: [T###]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Title: [Verb + Specific Object]
Duration: [Minutes]
Category: [Development|Testing|Documentation|Configuration|Analysis]

INPUT REQUIREMENTS:
• Resources: [Files/APIs/Data needed]
• Prerequisites: [Completed task IDs]
• Environment: [Required state/setup]
• Git Permissions: [push access required: yes/no]

SOURCE ANALYSIS & MODIFICATION PLAN:
• Files to create:
  - path/to/new/file.ts (new file)
  
• Files to modify:
  - path/to/existing/file.ts
    - Current state: [description of current implementation]
    - Modification: [specific changes with line numbers]

DUPLICATE CHECK:
□ Scanned existing codebase for similar functionality
□ Reviewed git history for previous implementations
□ Checked related modules for reusable patterns
□ Confirmed no conflicting implementations exist

EXECUTION STEPS:
1. [Concrete action with specific target]
2. [Next action with measurable progress]
3. [Continue until deliverable complete]

IMPLEMENTATION CODE:
```[language]
// Complete implementation code here
// Include all necessary imports
// Show exact code to be written
```

DELIVERABLE:
• Output: [Specific file/feature/result]
• Format: [Code/Document/Configuration/Report]
• Location: [Where output will be stored]

VERIFICATION METHOD:
• Check: [Specific test or validation command]
• Expected: [Precise success criteria]
• Measure: [Quantifiable metric]

QUALITY STANDARDS:
• Project Rules: [Applicable CLAUDE.md sections]
• Coverage Target: [Specific percentage if applicable]
• Performance: [Response time, memory usage]
• Error Handling: [Required error classes]
```

## Step 3: Implementation Details Format

### 3.1 Code Generation Standards
For each development task, include:
```
COMPLETE IMPLEMENTATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File: [exact/path/to/file.ts]
Action: [CREATE|MODIFY|DELETE]

```typescript
// Full implementation code
// Include all imports
// Complete function/class definitions
// Proper error handling
// TypeScript types
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 3.2 File Modification Format
For modifications to existing files:
```
MODIFICATION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File: [path/to/existing/file.ts]
Current State: [description]

// Line X: Add after this line
[new code to insert]

// Line Y-Z: Replace these lines
[replacement code]

// Line W: Delete this line
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 4: Execution Timeline with Dependencies

### 4.1 Task Sequencing
```
EXECUTION FLOW:
Foundation → Core Implementation → Integration → Testing → Finalization

Detailed Dependencies:
T001 ──→ T002 ──→ T004
         ↘
          T003 ──→ T005 ──→ T006
                    ↘
                     T007 ══╗
                     T008 ══╬══→ T010
                     T009 ══╝
```

### 4.2 Progress Checkpoints
```
MILESTONE CHECKPOINTS:
□ 25% - Foundation complete (infrastructure ready)
□ 50% - Core functionality implemented
□ 75% - Integration verified
□ 90% - Tests passing
□ 100% - All deliverables validated

Risk indicators:
• Behind schedule: [Task IDs]
• Quality issues: [Task IDs]
• Blocked items: [Task IDs]
```

## Step 5: Quality Assurance Integration

### 5.1 Testing Requirements
For each development task, include corresponding test task:
```
TESTING SPECIFICATION:
• Unit tests: [specific test files]
• Integration tests: [test scenarios]
• Coverage target: [percentage]
• Performance criteria: [metrics]
```

### 5.2 Build Verification Task
```
TASK ID: [T###-VERIFY]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Title: Execute Mandatory Build Verification
Duration: 15-20 minutes
Category: Quality Assurance

EXECUTION COMMANDS:
Follow complete build verification process from {project-root}/CLAUDE.md Section 1.

COVERAGE REQUIREMENTS:
Reference {project-root}/CLAUDE.md Section 8.

DELIVERABLE:
• Output: Verification Report
• Format: Use template from {project-root}/CLAUDE.md Section 9
• Location: Console output
```

## Step 6: Configuration and Documentation Tasks

### 6.1 Configuration File Templates
For configuration tasks, include complete file contents:
```
CONFIGURATION FILES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File: .env.example
```env
# Complete environment variable template
# Include all required variables
# Add helpful comments
```

File: docker-compose.yaml
```yaml
# Complete docker-compose configuration
# Include all services
# Health checks configured
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Output Format

```
═══════════════════════════════════════════════════
PROJECT EXECUTION PLAN
═══════════════════════════════════════════════════
Objective: [Parsed from $ARGUMENTS]
Total Tasks: [Count]
Estimated Duration: [Hours:Minutes]
Complexity: [Low|Medium|High]
Git Push Required: [Yes/No - with permission check]

SOURCE CODE ANALYSIS SUMMARY:
• Files to create: [count]
• Files to modify: [count]
• Test coverage impact: [percentage change]
• Dependencies affected: [list]

TASK BREAKDOWN:
[Detailed task cards with full implementation code]

CRITICAL PATH:
[Tasks that directly impact completion time]

RISK MITIGATION:
• Duplicate code: [prevention strategy]
• Breaking changes: [mitigation plan]
• Performance impact: [optimization approach]

QUALITY GATES:
□ Pre-implementation review
□ Code implementation
□ Unit test creation
□ Integration testing
□ Performance validation
□ Security review
□ Documentation update
□ Final verification
═══════════════════════════════════════════════════
```

## Execution Guidelines

1. **Always include complete implementation code**
2. Every instruction becomes actionable tasks with code
3. No task exceeds 30-minute duration
4. Each task has measurable outcomes and verification
5. Source code analysis is mandatory for each task
6. Duplicate prevention check is non-negotiable
7. Dependencies are explicitly mapped
8. Progress is continuously tracked
9. Git permissions checked before commits
10. Full test coverage for all new code
11. **테스트 단위 유지 및 원인 추적의 명확성을 확보하기 위해 한 번에 하나의 수정을 하는 것을 원칙으로 한다**

## Critical Requirements

### TypeScript Standards
Reference {project-root}/CLAUDE.md Section 2 for complete TypeScript safety rules.

### Code Organization
- Follow modular architecture
- Clear separation of concerns
- Reusable utility functions
- Consistent naming conventions

### Testing Requirements
- Unit tests for all new functions
- Integration tests for API endpoints
- Performance tests for critical paths
- Error scenario coverage

### Documentation Standards
- JSDoc comments for public APIs
- README updates for new features
- API documentation for endpoints
- Configuration examples