#!/bin/bash

# Brand Studio 개발 서버 시작 스크립트
# 이 스크립트는 안정적으로 서버를 백그라운드에서 실행합니다.

# 색상 코드
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 서버 설정
HOST="127.0.0.1"
PORT="5173"
LOG_FILE="vite-server.log"
PID_FILE=".vite-server.pid"

echo -e "${GREEN}🚀 Brand Studio 개발 서버 관리${NC}"
echo "================================"

# 기존 서버 확인
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if ps -p "$OLD_PID" > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  서버가 이미 실행 중입니다 (PID: $OLD_PID)${NC}"
        echo "기존 서버를 종료하고 새로 시작하시겠습니까? (y/n)"
        read -r response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            kill "$OLD_PID" 2>/dev/null
            rm -f "$PID_FILE"
            sleep 2
        else
            echo -e "${GREEN}✅ 기존 서버를 유지합니다.${NC}"
            echo -e "${GREEN}📍 서버 주소: http://$HOST:$PORT/${NC}"
            exit 0
        fi
    else
        rm -f "$PID_FILE"
    fi
fi

# 포트 사용 확인
if lsof -i ":$PORT" > /dev/null 2>&1; then
    echo -e "${RED}❌ 포트 $PORT가 이미 사용 중입니다.${NC}"
    echo "포트를 사용 중인 프로세스:"
    lsof -i ":$PORT"
    exit 1
fi

# 로그 파일 초기화
echo "=== Brand Studio Server Log ===" > "$LOG_FILE"
echo "Started at: $(date)" >> "$LOG_FILE"
echo "================================" >> "$LOG_FILE"

# 서버 시작
echo -e "${YELLOW}🔄 서버를 시작하는 중...${NC}"
nohup npx vite --host "$HOST" --port "$PORT" >> "$LOG_FILE" 2>&1 &
SERVER_PID=$!

# PID 저장
echo $SERVER_PID > "$PID_FILE"

# 서버 시작 확인 (최대 10초 대기)
for i in {1..10}; do
    if curl -s "http://$HOST:$PORT" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ 서버가 성공적으로 시작되었습니다!${NC}"
        echo -e "${GREEN}📍 서버 주소: http://$HOST:$PORT/${NC}"
        echo -e "${GREEN}📄 로그 파일: $LOG_FILE${NC}"
        echo -e "${GREEN}🔧 서버 PID: $SERVER_PID${NC}"
        echo ""
        echo "서버 관리 명령어:"
        echo "  - 로그 보기: tail -f $LOG_FILE"
        echo "  - 서버 중지: ./stop-dev.sh"
        echo "  - 서버 상태: ./status-dev.sh"
        exit 0
    fi
    sleep 1
done

echo -e "${RED}❌ 서버 시작에 실패했습니다.${NC}"
echo "로그 확인: tail -20 $LOG_FILE"
exit 1