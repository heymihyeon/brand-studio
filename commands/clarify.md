---
title: 'Bug Fix and Feature Clarification Assistant'
read_only: true
type: 'command'
version: '1.0.0'
---

# 🔍 '/clarify 로그인 버그 수정해줘' 같이 모호한 요청을 구체적인 실행 계획으로 변환

**IMPORTANT**: All user-facing messages, questions, and results must be displayed in Korean.

## ⚠️ CRITICAL CONSTRAINT ⚠️
IF the instruction ($ARGUMENTS) is NOT about:
- Bug fixes
- Error resolution  
- Feature implementation
- Code modification
- Program development

THEN you MUST:
1. Output ONLY: "이 명령어는 프로젝트의 버그/오류 및 기능 추가/변경과 관련된 지시사항을 처리할 수 있습니다."
2. STOP immediately

Purpose: Transform abstract user instructions into concrete executable plans
User Instruction: $ARGUMENTS

## Step 1: Instruction Clarity Assessment

### 1.1 Initial Analysis
- Verify if instruction relates to program modification/development
- Evaluate specificity level of the instruction
- Identify technical context and business objectives

### 1.2 Clarification Need Determination
[When instruction is unclear]
Gather information through maximum 3 questions:
- Provide 2-4 options per question
- Focus on situational descriptions
- Classify as: Issue (bug/error) or Enhancement (feature/change)

## Step 2-A: Issue Diagnosis (Bugs/Errors)

### 2-A.1 Symptom Collection
- Document user-experienced phenomena
- Analyze error messages and logs
- Identify occurrence patterns

### 2-A.2 Reproduction Path
- Document reproduction steps
- Verify environment conditions
- Determine affected scope

## Step 3-A: Root Cause Analysis

### 3-A.1 Code Investigation
- Scan relevant source files
- Review recent changes
- Check dependencies

### 3-A.2 Cause Hypothesis
- List possible causes by likelihood
- Define verification methods
- Investigate by priority

## Step 2-B: Enhancement Analysis (Features/Changes)

### 2-B.1 Requirement Specification
- Clarify purpose and outcomes
- Define success criteria
- Identify constraints

### 2-B.2 Impact Assessment
- Identify affected components
- Analyze feature interactions
- Review implications

## Step 4: Execution Plan

### 4.1 Implementation Roadmap
- Create work breakdown structure
- Define deliverables and dependencies
- Specify execution sequence

### 4.2 Implementation Details
For each file:
- File path and change type
- Specific modifications
- Expected impact

## Step 5: Quality Assurance

### 5.1 Standards Compliance
- Check against CLAUDE.md rules
- Verify coding standards
- Apply best practices

### 5.2 Testing Strategy
- Define unit test targets
- Plan regression tests
- Prepare test data

### 5.3 Apply CLAUDE.md Rules
**ENFORCE all rules from {project-root}/CLAUDE.md**:
- TypeScript Safety Rules (Section 2)
- Security Rules (Section 4)
- Kubernetes Command Safety (Section 5)
- AIDA Architecture Rules (Section 7)

## 🔨 Mandatory Build Verification

**CRITICAL**: Follow complete build verification process from {project-root}/CLAUDE.md Section 1.
All steps MUST pass before reporting completion.

### 📋 Task Completion Report Template
Use the template from {project-root}/CLAUDE.md Section 9.

**NEVER** report task as complete without ALL checks passing!

