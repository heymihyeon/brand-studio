#!/bin/bash

# 서버 중지 스크립트

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PID_FILE=".vite-server.pid"

echo -e "${YELLOW}🛑 Brand Studio 서버 중지${NC}"
echo "========================="

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p "$PID" > /dev/null 2>&1; then
        echo -e "${YELLOW}서버를 중지하는 중... (PID: $PID)${NC}"
        kill "$PID"
        sleep 2
        
        if ps -p "$PID" > /dev/null 2>&1; then
            echo -e "${RED}정상 종료 실패. 강제 종료 시도...${NC}"
            kill -9 "$PID"
        fi
        
        rm -f "$PID_FILE"
        echo -e "${GREEN}✅ 서버가 중지되었습니다.${NC}"
    else
        echo -e "${YELLOW}⚠️  서버가 실행 중이지 않습니다.${NC}"
        rm -f "$PID_FILE"
    fi
else
    echo -e "${YELLOW}⚠️  실행 중인 서버를 찾을 수 없습니다.${NC}"
fi

# 포트 확인
if lsof -i :5173 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  포트 5173이 여전히 사용 중입니다.${NC}"
    lsof -i :5173
fi