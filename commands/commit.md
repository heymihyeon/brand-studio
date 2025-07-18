---
title: 'Conventional Commit Message Generator'
read_only: true
type: 'command'
version: '1.0.0'
---

# 💬 '/commit feat' 같이 변경사항을 분석하여 규칙에 맞는 커밋 메시지 생성

Purpose: Generate conventional commit messages by analyzing staged changes
Target: $ARGUMENTS (commit type hint: 'feat'|'fix'|'docs'|etc. or empty for auto-detection)

**IMPORTANT**: All user-facing messages, questions, and results must be displayed in Korean (한국어).

## Step 1: Pre-Commit Analysis

### 1.1 Check Staged Changes
```
EXECUTE:
git status --porcelain
git diff --cached --stat

VERIFY:
□ Staged files exist
□ No merge conflicts
□ No sensitive data (CLAUDE_API_KEY, GEMINI_API_KEY, OTEL_WEBHOOK_SECRET)
□ Related changes are grouped
□ No 'any' types in TypeScript files
□ Kubernetes commands properly validated
□ LLM API usage tracked (Claude: $100/day, Gemini: $50/day limit)
```

### 1.1.5 Pre-commit Build Verification
```
MANDATORY CHECKS before commit:
Follow complete build verification process from {project-root}/CLAUDE.md Section 1.
All steps MUST pass before proceeding with commit.
```

### 1.2 Categorize Changes
```
ANALYZE staged files:
• New features: Added files, new functions
• Bug fixes: Error handling, logic corrections  
• Documentation: README, comments, docs/
• Style: Formatting, naming conventions
• Refactor: Code restructuring
• Tests: *test*, *spec* files
• Chore: Config, dependencies, build files
```

## Step 2: Change Impact Analysis

### 2.1 Code Diff Analysis
```
FOR EACH staged file:
git diff --cached [file]

IDENTIFY:
• Main purpose of changes
• Functions/classes modified
• Breaking changes
• Dependencies affected
• Test coverage impact
```

### 2.2 Automatic Type Detection
```
IF $ARGUMENTS is empty:
  DETERMINE type based on:
  - New files in src/ → feat
  - Error/bug/fix keywords → fix
  - Test files only → test
  - Docs files only → docs
  - Package.json changes → chore
  - Multiple types → primary type
ELSE:
  Use provided type from $ARGUMENTS
```

## Step 3: Context Extraction

### 3.1 Related Issues
```
SEARCH FOR:
• Issue numbers in branch name
• TODO/FIXME comments removed
• Issue references in code comments
• Recent related commits

Extract: #123, #456 format
```

### 3.2 Scope Identification
```
DETERMINE scope from:
• Directory structure (auth/, api/, ui/)
• File naming patterns
• Module/component names
• Service boundaries

Common scopes (AIDA project):
• orchestrator, executor, analyzer (core modules)
• api, utils, types
• llm (Claude/Gemini integration)
• k8s (Kubernetes operations)
• tests, docs, config
```

## Step 4: Message Generation

### 4.1 Subject Line Construction
```
FORMAT: <type>(<scope>): <subject>

RULES:
□ Lowercase start
□ No period at end
□ Under 72 characters
□ Present tense, imperative mood
□ Specific and meaningful

TYPES (Conventional Commits):
• feat: New feature
• fix: Bug fix
• docs: Documentation changes
• style: Code style changes (formatting, etc)
• refactor: Code refactoring
• test: Test additions or modifications
• chore: Build process or auxiliary tool changes
• perf: Performance improvements
• ci: CI/CD configuration changes
• security: Security improvements

EXAMPLES:
feat(orchestrator): add network issue detection
fix(executor): handle pod not found errors
docs(readme): update installation steps
style(analyzer): format code with prettier
refactor(api): simplify webhook validation
test(analyzer): add gemini retry tests
chore(deps): update typescript to 5.x
perf(llm): implement response caching
security(k8s): validate kubectl commands
```

### 4.2 Body Composition
```
IF changes are complex:

BODY STRUCTURE:
- What: Brief summary of changes
- Why: Reason for changes  
- How: Implementation approach (if not obvious)

BULLET POINTS for multiple changes:
• List each significant change
• Group related modifications
• Mention side effects
• Note breaking changes
```

### 4.3 Footer Addition
```
FOOTER ELEMENTS:
• Closes #<issue-number>
• BREAKING CHANGE: <description>
• Reviewed-by: <reviewer>
• Co-authored-by: <contributor>
```

## Step 5: Quality Validation

### 5.1 Message Compliance Check
```
VALIDATE:
□ Follows conventional format
□ Type is valid
□ Scope is appropriate
□ Subject is clear
□ Length constraints met
□ No typos or grammar issues
```

### 5.2 Change-Message Alignment
```
VERIFY message accurately reflects:
• All staged changes
• Impact and purpose
• Technical accuracy
• Business value
```

## Step 6: Output Generation

### 6.1 Single-line Commit
```
For simple changes:
<type>(<scope>): <subject>

Example:
fix(auth): correct token expiration calculation
```

### 6.2 Multi-line Commit
```
For complex changes:
<type>(<scope>): <subject>

<body paragraph 1>

<body paragraph 2>

• Bullet point 1
• Bullet point 2

<footer>

Example:
feat(api): implement rate limiting middleware

Add configurable rate limiting to protect API endpoints from abuse.
Uses sliding window algorithm with Redis backend for distributed systems.

• Set default limit to 100 requests per minute
• Support custom limits per endpoint
• Add bypass for authenticated admin users
• Include rate limit headers in response

Closes #234
```

### 6.3 Interactive Mode
```
IF multiple valid options exist:
═══════════════════════════════════════════════════
SELECT COMMIT MESSAGE
═══════════════════════════════════════════════════
Based on your changes, here are suggested messages:

[1] feat(auth): implement two-factor authentication
[2] feat(security): add 2FA support for user accounts  
[3] feat(auth): enhance login security with TOTP

Select [1-3] or [e]dit manually: _
═══════════════════════════════════════════════════
```

## Step 7: Special Cases

### 7.1 WIP Commits
```
IF explicitly requested OR many unrelated changes:
wip: [description of partial work]

Note: Should be squashed before merging
```

### 7.2 Hotfix Commits
```
IF critical production fix:
hotfix(<scope>): <urgent fix description>

Include:
• Severity level
• Affected users/systems
• Temporary vs permanent fix
```

### 7.3 Revert Commits
```
IF reverting previous commit:
revert: <original commit subject>

This reverts commit <hash>.
Reason: <explanation>
```

## Execution Example

```
INPUT: /commit
OUTPUT:
═══════════════════════════════════════════════════
COMMIT MESSAGE GENERATED
═══════════════════════════════════════════════════
feat(auth): add password strength validation

Implement comprehensive password validation to enhance account security
and meet compliance requirements.

• Add zxcvbn library for strength calculation
• Require minimum score of 3/5 for new passwords
• Show real-time strength feedback in UI
• Add common password blacklist check
• Include detailed error messages for failures

The validation runs client-side for immediate feedback and server-side
for security. Existing users will be prompted to update weak passwords
on next login.

Closes #456, #478
═══════════════════════════════════════════════════

커밋을 실행하시겠습니까? [y/n/e(dit)]: _
```

## 🚨 Git Push Permission Check

**CRITICAL RULE**: Follow git push permission rules from {project-root}/CLAUDE.md Section 3.

**NEVER** push without explicit user permission.

## Error Handling

### No Staged Changes
```
ERROR: No staged changes found
Run 'git add <files>' to stage changes first
```

### Mixed Change Types
```
WARNING: Multiple change types detected
Consider splitting into separate commits:
- Feature changes in src/
- Test additions in tests/
- Config updates in package.json
```

### Commit Hook Integration
```
Can be used as commit-msg hook:
#!/bin/sh
claude /commit > .git/COMMIT_EDITMSG
```