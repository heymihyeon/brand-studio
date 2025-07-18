---
title: 'CLAUDE.md Rules Synchronization System'
read_only: true
type: 'command'
version: '1.0.0'
---

# 🚨 '/sync' 같이 CLAUDE.md 규칙을 모든 명령 파일에 완벽하게 동기화

Purpose: Ensure complete and perfect synchronization between CLAUDE.md rules and all command files
Target: $ARGUMENTS (specific command or 'all' for full sync)

## ⚠️ ENHANCED EXECUTION GUIDELINES ⚠️

### 🚨 CRITICAL: CLAUDE.md LOCATION CHECK 🚨
**MANDATORY**: Always verify and read CLAUDE.md from the PROJECT ROOT directory!
- ✅ CORRECT: `/path/to/project/CLAUDE.md` (project root)
- ❌ WRONG: `.claude/CLAUDE.md` or any subdirectory
- **VERIFY**: Run `ls CLAUDE.md` from project root before starting

### CORE PRINCIPLES:
1. **MAINTAIN CORE PURPOSE**: Preserve each command's fundamental objective
2. **INTEGRATE MANDATORY RULES**: Apply ALL critical rules from CLAUDE.md
3. **SMART ENHANCEMENT**: Add necessary sections while maintaining clarity
4. **QUALITY ASSURANCE**: Verify complete compliance after integration
5. **PRESERVE CLARITY**: Keep commands readable and well-structured

### DYNAMIC RULE EXTRACTION FROM CLAUDE.md:
```
IMPORTANT: Every project's CLAUDE.md is different. DO NOT assume fixed line numbers or structure.
Instead, dynamically search for rules using these patterns:

1. Build/Test Verification:
   - Search for: "build", "test", "npm run", "verification", "mandatory"
   - Look for command sequences like: npm run build → npm test → npm run lint
   - May be scattered across different sections

2. Git Push Permission:
   - Search for: "git push", "permission", "confirm", "ask"
   - Look for rules about confirming before push operations
   - Check both security and workflow sections

3. TypeScript Safety:
   - Search for: "any type", "typescript", "type safety", "never use any"
   - Look for type definition requirements
   - May be in coding standards or architecture sections

4. Environment Variables:
   - Search for: "env", "environment", "API_KEY", "secret"
   - Check security sections and configuration guidelines
   - Look for .env validation rules

5. Database/RLS Rules (if applicable):
   - Search for: "database", "RLS", "row level security", "migration"
   - May not exist in all projects
   - Check data access and security sections

6. React Patterns (if applicable):
   - Search for: "react", "query", "state management", "component"
   - Project-specific - may not exist in non-React projects
   - Check architecture and UI sections

7. Component Architecture (if applicable):
   - Search for: "server component", "client component", "architecture"
   - React/Next.js specific - skip if not applicable
   - Check UI/frontend sections

8. Language Requirements:
   - Search for: "korean", "한국어", "language", "user-facing"
   - Check documentation and UI guidelines
   - Apply to commands with user interaction
```

---

## Phase 1: Dynamic Analysis

### 1.1 CLAUDE.md Discovery and Analysis
```
PROCESS:
1. Read entire CLAUDE.md file from project root
2. Parse and identify all sections dynamically
3. Extract rules based on content, not line numbers
4. Build a project-specific rule map

EXTRACTION METHOD:
FOR each potential rule category:
  - Use regex and keyword matching
  - Consider context around matches
  - Handle scattered or non-contiguous rules
  - Account for project-specific variations
```

### 1.2 Intelligent Rule Detection
```
DETECT rules by patterns, not positions:

# Example pattern matching
if content.contains(["build", "test", "verification"]):
    extract_build_verification_rules()
    
if content.contains(["git push", "permission", "confirm"]):
    extract_git_permission_rules()
    
if content.contains(["any type", "typescript", "type safety"]):
    extract_typescript_rules()

# Continue for all rule categories...
```

### 1.3 Command File Analysis
```
FOR each command in [clarify, plan, qa, clean-code, commit, test-all, set-rules, new-project, manage-docs, check-complete]:
  ANALYZE:
  - Current structure and sections
  - Missing mandatory elements (based on discovered rules)
  - Incorrect or outdated rules
  - Compliance gaps with discovered CLAUDE.md rules
```

## Phase 2: Adaptive Integration Planning

### 2.1 Dynamic Rule Mapping
```
CREATE rule mapping based on discovered content:

discovered_rules = analyze_claude_md()

FOR each discovered_rule:
  DETERMINE:
  - Which commands need this rule
  - Where to insert it in each command
  - How to adapt it to command context
  
EXAMPLE:
if discovered_rules.has("build_verification"):
  applicable_commands = identify_code_modifying_commands()
  integration_point = "after_implementation_section"
```

### 2.2 Project-Specific Template Generation
```
GENERATE templates based on actual CLAUDE.md content:

# Instead of hardcoded templates, create dynamically:
def generate_build_verification_template():
    claude_rules = extract_from_claude_md("build", "test", "verification")
    return format_as_template(claude_rules)

def generate_git_permission_template():
    claude_rules = extract_from_claude_md("git push", "permission")
    return format_as_template(claude_rules)

# Continue for all rule types...
```

## Phase 3: Smart Execution

### 3.1 Backup Creation
```
timestamp=$(date +%Y%m%d_%H%M%S)
mkdir -p .claude/commands/.backup/$timestamp
cp .claude/commands/*.md .claude/commands/.backup/$timestamp/
```

### 3.2 Adaptive Integration
```
FOR each target command:
  
  # Read current command file
  current_content = read_command_file(command)
  
  # Identify applicable rules from CLAUDE.md
  applicable_rules = match_rules_to_command(discovered_rules, command)
  
  # Integrate rules intelligently
  FOR each rule in applicable_rules:
    IF rule not already present in command:
      INSERT rule at appropriate location
      ADAPT rule language to command context
      PRESERVE command's core functionality
```

### 3.3 Command-Specific Integration Logic
```
# Example adaptive integration
IF command involves code modification:
  IF build_verification_rule found in CLAUDE.md:
    ADD build verification section
    USE exact commands from CLAUDE.md
    ADAPT to command's workflow

IF command involves git operations:
  IF git_permission_rule found in CLAUDE.md:
    ADD permission check
    USE project's specific permission flow

IF command has user interaction:
  IF korean_language_rule found in CLAUDE.md:
    ADD korean language directive
    ENSURE all user messages comply

# Continue adaptive logic for each command type...
```

## Phase 4: Quality Verification

### 4.1 Dynamic Compliance Check
```
FOR each modified command:
  
  # Build dynamic checklist from discovered rules
  compliance_checklist = {}
  
  FOR each rule in discovered_rules:
    IF rule.applies_to(command):
      compliance_checklist[rule.name] = check_rule_integration(command, rule)
  
  # Calculate compliance
  compliance_score = calculate_compliance(compliance_checklist)
  
  # Fix any gaps
  IF compliance_score < 100%:
    missing_rules = identify_missing_rules(compliance_checklist)
    apply_missing_rules(command, missing_rules)
    RERUN verification
```

### 4.2 Validation Testing
```
# Test with discovered rules, not hardcoded scenarios
test_scenarios = generate_test_scenarios_from_rules(discovered_rules)

FOR each command:
  FOR each applicable_scenario in test_scenarios:
    SIMULATE execution
    VERIFY rule compliance
    CONFIRM CLAUDE.md alignment
```

## Phase 5: Comprehensive Report

### 5.1 Generate Adaptive Report
```
═══════════════════════════════════════════════════
CLAUDE.md 동기화 완료 보고서
═══════════════════════════════════════════════════
실행 시간: [timestamp]
대상 명령어: $ARGUMENTS
CLAUDE.md 위치: [actual path]

📊 발견된 규칙:
[List dynamically discovered rules, not hardcoded]

📋 적용 결과:
┌─────────────────┬─────────┬─────────┬──────────┐
│ 명령어          │ 이전(%) │ 이후(%) │ 상태     │
├─────────────────┼─────────┼─────────┼──────────┤
│ clarify.md      │   XX    │   100   │ ✅ 완료  │
│ plan.md         │   XX    │   100   │ ✅ 완료  │
│ qa.md           │   XX    │   100   │ ✅ 완료  │
│ clean-code.md   │   XX    │   100   │ ✅ 완료  │
│ commit.md       │   XX    │   100   │ ✅ 완료  │
│ test-all.md     │   XX    │   100   │ ✅ 완료  │
│ set-rules.md    │   XX    │   100   │ ✅ 완료  │
│ new-project.md  │   XX    │   100   │ ✅ 완료  │
│ manage-docs.md  │   XX    │   100   │ ✅ 완료  │
│ check-complete.md│   XX    │   100   │ ✅ 완료  │
└─────────────────┴─────────┴─────────┴──────────┘

🔧 적용된 프로젝트별 규칙:
[List actually applied rules based on CLAUDE.md content]

📝 주요 변경사항:
[Detail changes made to each command]

⚠️ 프로젝트 특이사항:
[Note any project-specific adaptations]

백업 위치: .claude/commands/.backup/[timestamp]/
═══════════════════════════════════════════════════
```

### 5.2 Recommendations
```
PROVIDE project-specific recommendations:
- Based on discovered rules
- Suggest missing rules if gaps found
- Recommend regular sync schedule
- Note any ambiguous rules needing clarification
```

## Error Handling

### CLAUDE.md Not Found
```
ERROR: CLAUDE.md not found in project root
ACTION:
- Check correct directory
- Suggest creating CLAUDE.md
- Provide template if needed
```

### Rule Extraction Failure
```
IF unable to extract specific rule type:
- Log warning, not error
- Continue with other rules
- Report in final summary
- Suggest manual review
```

### Ambiguous Rules
```
IF rule interpretation unclear:
- Flag for manual review
- Provide multiple interpretations
- Apply most conservative option
- Document in report
```

## Usage

```bash
# Sync all commands with project's CLAUDE.md
/sync all

# Sync specific command
/sync commit

# This will:
# 1. Dynamically analyze your project's CLAUDE.md
# 2. Extract rules based on content, not line numbers
# 3. Intelligently apply rules to appropriate commands
# 4. Preserve each command's core functionality
# 5. Report complete compliance status
```