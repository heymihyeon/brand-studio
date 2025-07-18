---
title: 'Simple Test Command'
read_only: true
type: 'command'
version: '1.0.0'
---

# 👋 '/hello-world 안녕하세요' 같이 입력한 텍스트를 단순 출력 (테스트용)

Purpose: Display the provided argument as a greeting message
Target: $ARGUMENTS (any text to be displayed)

**IMPORTANT**: All user-facing messages, questions, and results must be displayed in Korean (한국어).

## 작업 내용

입력받은 인자를 확인하고 인사 메시지로 표시합니다:

1. 받은 인자: "$ARGUMENTS"
2. 다음 메시지를 출력합니다:

---
🌟 안녕하세요! 
입력하신 메시지: "$ARGUMENTS"
---

이 명령어는 단순히 입력받은 텍스트를 표시하는 테스트 명령어입니다.