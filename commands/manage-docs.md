---
title: 'Documentation Management System with NLP Support'
read_only: true
type: 'command'
version: '2.0.0'
---

# 📝 '/manage-docs API 계획 문서로 생성해줘' 같이 문서 생성, 정리, 이동 등을 한꺼번에 처리
Intelligently manage project documentation with natural language support.

## Arguments
- $ARGUMENTS: Natural language request or structured command

## Process

### 1. Natural Language Processing and Intent Detection
```
ANALYZE $ARGUMENTS:
  raw_input = $ARGUMENTS
  
  # Check for structured command first
  IF raw_input matches pattern 'create|move|archive|log|report':
    USE structured_command_handler()
  ELSE:
    USE natural_language_handler()
```

### 2. Natural Language Handler
```
DEFINE intent_patterns:
  CREATE_PLAN_PATTERNS = [
    "계획.*생성", "계획.*만들", "plan.*생성", "plan.*만들",
    "플랜.*만들", "계획서.*작성", ".*계획.*문서.*생성"
  ]
  
  CREATE_KNOWLEDGE_PATTERNS = [
    "지식.*생성", "지식.*만들", "knowledge.*생성", 
    "문서.*만들", "자료.*생성", ".*지식.*문서.*"
  ]
  
  ARCHIVE_PATTERNS = [
    "아카이브", "보관", "정리", ".*오래된.*", "archive"
  ]
  
  REPORT_PATTERNS = [
    "현황", "보고", "리포트", "상태", "report", "status"
  ]
  
  MOVE_PATTERNS = [
    "이동", "옮기", "move", "transfer"
  ]

EXTRACT intent and parameters:
  FOR pattern in all_patterns:
    IF raw_input matches pattern:
      intent = pattern.category
      EXTRACT entities from input:
        - title/name (quoted text or noun phrases)
        - category (after "카테고리:", "분류:", etc.)
        - source/destination paths
      BREAK
  
  IF no pattern matched:
    ANALYZE context clues:
      - Check for file paths → likely MOVE
      - Check for document title → likely CREATE
      - Check for status words → likely REPORT
```

### 3. Intent Confirmation and Clarification
```
IF intent detected with high confidence:
  DISPLAY: "다음과 같이 이해했습니다:"
  SHOW interpreted_command
  
  IF missing required parameters:
    ASK for clarification:
      "📝 문서 제목을 입력해주세요:"
      "📁 어떤 카테고리로 분류할까요? (development/design/etc):"
ELSE:
  DISPLAY: "요청을 정확히 이해하지 못했습니다. 다음 중 원하시는 작업을 선택해주세요:"
  SHOW menu:
    1. 계획 문서 생성 (plan)
    2. 지식 문서 생성 (knowledge)
    3. 문서 이동 (move)
    4. 오래된 문서 정리 (archive)
    5. 현황 보고서 (report)
```

### 4. Smart Parameter Extraction
```
FUNCTION extract_document_title(input):
  # Check for quoted text first
  quoted = find_quoted_text(input)
  IF quoted:
    RETURN quoted
  
  # Extract noun phrases that could be titles
  candidates = extract_noun_phrases(input)
  
  # Filter out command words
  filtered = remove_command_words(candidates)
  
  # Return longest meaningful phrase
  RETURN select_best_title(filtered)

FUNCTION infer_document_type(input):
  IF contains("계획", "plan", "플랜", "기획"):
    RETURN "plan"
  IF contains("지식", "knowledge", "가이드", "문서"):
    RETURN "knowledge"
  IF contains_technical_terms():
    RETURN "knowledge" with category="development"
  ELSE:
    RETURN "etc"
```

### 5. Enhanced Directory Structure Management
```
ENSURE docs structure exists:
  docs/
  ├── plan/
  │   ├── active/      # 진행 중인 계획
  │   ├── complete/    # 완료된 계획
  │   └── archive/     # 보관된 계획
  ├── knowledge/
  │   ├── development/ # 개발 관련
  │   ├── design/      # 디자인 관련
  │   ├── business/    # 비즈니스 관련
  │   └── general/     # 일반
  ├── etc/            # 기타 문서
  └── log/            # 작업 로그
```

### 6. Intelligent Command Execution

#### 6.1 Smart CREATE Handler
```
FUNCTION handle_create(intent_data):
  type = intent_data.type or infer_document_type(intent_data.input)
  title = intent_data.title or extract_document_title(intent_data.input)
  
  IF not title:
    ASK: "📝 문서 제목을 입력해주세요:"
    title = wait_for_input()
  
  IF type == 'plan':
    # Auto-detect if it's about current conversation
    IF input contains "네가", "너가", "방금", "이전":
      content = extract_recent_conversation_context()
      title = title or "Claude 제안 계획"
    
    CREATE plan with smart defaults
    
  IF type == 'knowledge':
    category = intent_data.category or suggest_category(title)
    IF not category:
      SHOW: "📁 카테고리를 선택해주세요:"
      SHOW category_menu
    
    CREATE knowledge document
```

#### 6.2 Context-Aware Archive
```
FUNCTION handle_archive(intent_data):
  IF input contains "모든", "전체", "all":
    target = "all_eligible"
  ELIF input contains specific_date_reference:
    target = parse_date_criteria(input)
  ELSE:
    target = "standard_3_days"
  
  EXECUTE archive with target criteria
```

#### 6.3 Customizable Report
```
FUNCTION handle_report(intent_data):
  report_type = detect_report_type(input)
  
  IF report_type == "detailed":
    GENERATE comprehensive report
  ELIF report_type == "summary":
    GENERATE brief summary
  ELSE:
    GENERATE standard report
  
  # Add natural language summary
  ADD narrative_summary:
    "현재 {active_count}개의 계획이 진행 중이며,
     이번 주에 {completed_count}개를 완료했습니다.
     가장 활발한 카테고리는 {top_category}입니다."
```

### 7. Error Recovery and Suggestions
```
ON ambiguous_input:
  ANALYZE similar_past_commands
  SUGGEST: "혹시 이런 작업을 원하셨나요?"
  SHOW top_3_suggestions
  
ON partial_failure:
  SAVE progress
  DISPLAY: "⚠️ 일부 작업이 완료되지 않았습니다:"
  SHOW completed_steps
  SHOW failed_steps
  ASK: "계속 진행하시겠습니까?"
```

### 8. Learning from Context
```
MAINTAIN session_context:
  recent_creates = []
  recent_searches = []
  user_vocabulary = {}
  
FUNCTION update_context(command, result):
  ADD to appropriate context list
  LEARN user's preferred terms
  
FUNCTION use_context_for_inference():
  # If user frequently creates plans on Mondays
  IF is_monday and no_clear_type:
    SUGGEST: "새로운 주간 계획을 생성하시겠습니까?"
```

## Enhanced Templates

### Contextual Plan Template
```markdown
---
title: '{title}'
status: 'active'
created: '{date}'
author: '{user}'
context: '{conversation_context}'
tags: []
---

# {title}

## 배경
{auto_filled_context_if_available}

## 목표
[작업 목표를 명확히 설명하세요]

## 진행 계획
- [ ] 단계 1: [설명]
- [ ] 단계 2: [설명]
- [ ] 단계 3: [설명]

## 예상 일정
- 시작일: {suggested_start}
- 종료일: {suggested_end}

## 참고 사항
{related_documents_if_found}
```

## Usage Examples with Natural Language
```bash
# Natural Korean requests
> /manage-docs 네가 제안한 API 리팩토링 계획을 문서로 만들어줘
✅ "API 리팩토링 계획" 문서가 생성되었습니다: docs/plan/active/api-refactoring-plan.md

> /manage-docs TypeScript 베스트 프랙티스에 대한 지식 문서 생성
📁 카테고리를 선택해주세요:
1. development (추천)
2. general
3. 새 카테고리 입력
> 1
✅ 지식 문서가 생성되었습니다: docs/knowledge/development/typescript-best-practices.md

> /manage-docs 오래된 거 정리 좀 해줘
🔍 3일 이상 된 완료 문서를 검색 중...
✅ 4개의 계획이 아카이브되었습니다

> /manage-docs 이번 주 뭐했는지 보고서 만들어
📊 문서 현황 리포트를 생성합니다...
[Displays comprehensive weekly report]

# Still supports structured commands
> /manage-docs create plan "Q4 Planning"
✅ 계획 문서가 생성되었습니다: docs/plan/active/q4-planning.md
```

## Implementation Notes
- Use regex with Korean Unicode ranges for pattern matching
- Implement fuzzy matching for common typos
- Cache user preferences for better predictions
- Support both structured and natural language inputs
- Gracefully handle mixed language inputs
- Always confirm interpretation before executing
- Maintain backward compatibility with v1.0 structured commands