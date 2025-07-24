#!/bin/bash

# 360도 이미지 다운로드 스크립트
# EV9 스노우 화이트 펄 (swp) 이미지 다운로드

echo "🚗 EV9 360도 이미지 다운로드 시작..."

# 색상 코드
COLOR="swp"
BASE_URL="https://www.kia.com/content/dam/kwp/kr/ko/configurator/ev9/trim/exterior/ev9-air"
OUTPUT_DIR="public/images/360/ev9/${COLOR}"

# 디렉토리 생성
mkdir -p "$OUTPUT_DIR"

# 이미지 다운로드 (1-72번 전체 다운로드)
for i in $(seq -f "%02g" 1 72); do
    IMAGE_URL="${BASE_URL}/${COLOR}/${COLOR}_${i}.png"
    OUTPUT_FILE="${OUTPUT_DIR}/${COLOR}_${i}.png"
    
    echo "다운로드 중: ${COLOR}_${i}.png"
    curl -s -o "$OUTPUT_FILE" "$IMAGE_URL"
    
    # 다운로드 성공 여부 확인
    if [ -s "$OUTPUT_FILE" ]; then
        echo "✅ ${COLOR}_${i}.png 다운로드 완료"
    else
        echo "❌ ${COLOR}_${i}.png 다운로드 실패"
        rm -f "$OUTPUT_FILE"
    fi
done

echo "✨ 다운로드 완료!"
echo "📁 저장 위치: $OUTPUT_DIR"