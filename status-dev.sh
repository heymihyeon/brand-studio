#!/bin/bash

# 서버 상태 확인 스크립트

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

PID_FILE=".vite-server.pid"
LOG_FILE="vite-server.log"
HOST="127.0.0.1"
PORT="5173"

echo -e "${GREEN}📊 Brand Studio 서버 상태${NC}"
echo "========================"

# PID 파일 확인
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p "$PID" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ 서버 실행 중${NC}"
        echo -e "   PID: $PID"
        echo -e "   주소: http://$HOST:$PORT/"
        
        # 프로세스 정보
        echo -e "\n프로세스 정보:"
        ps -p "$PID" -o pid,ppid,user,%cpu,%mem,start,time,command | head -2
        
        # 최근 로그
        if [ -f "$LOG_FILE" ]; then
            echo -e "\n최근 로그:"
            tail -5 "$LOG_FILE"
        fi
        
        # 연결 테스트
        echo -e "\n연결 테스트:"
        if curl -s -o /dev/null -w "응답 시간: %{time_total}초\n" "http://$HOST:$PORT/"; then
            echo -e "${GREEN}✅ 서버 응답 정상${NC}"
        else
            echo -e "${RED}❌ 서버 응답 없음${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  PID 파일은 있지만 프로세스가 없습니다.${NC}"
        rm -f "$PID_FILE"
    fi
else
    echo -e "${RED}❌ 서버가 실행되지 않고 있습니다.${NC}"
fi

# 포트 상태
echo -e "\n포트 $PORT 상태:"
if lsof -i ":$PORT" > /dev/null 2>&1; then
    lsof -i ":$PORT" | head -5
else
    echo "포트가 사용되지 않고 있습니다."
fi