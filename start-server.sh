#!/bin/bash

# 색상 코드
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Brand Studio 서버 시작 스크립트${NC}"
echo "================================"

# 현재 디렉토리 확인
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# 기존 프로세스 종료
echo -e "${YELLOW}기존 프로세스 정리 중...${NC}"
pkill -f "vite" 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true
sleep 1

# 포트 확인
PORT=5173
if lsof -i :$PORT > /dev/null 2>&1; then
    echo -e "${RED}포트 $PORT가 이미 사용 중입니다.${NC}"
    echo "다른 포트를 사용하시겠습니까? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        PORT=3000
        echo -e "${GREEN}포트 $PORT를 사용합니다.${NC}"
    else
        echo -e "${RED}서버 시작을 취소합니다.${NC}"
        exit 1
    fi
fi

# node_modules 확인
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}node_modules가 없습니다. npm install을 실행합니다...${NC}"
    npm install
fi

# 캐시 정리
echo -e "${YELLOW}Vite 캐시 정리 중...${NC}"
rm -rf node_modules/.vite 2>/dev/null || true

# 서버 시작
echo -e "${GREEN}서버를 시작합니다... (포트: $PORT)${NC}"
echo "================================"

# 서버 시작 (포트 지정)
if [ "$PORT" -eq 5173 ]; then
    npm run dev
else
    npm run dev -- --port $PORT
fi