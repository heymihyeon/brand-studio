const { spawn } = require('child_process');
const http = require('http');

let serverProcess = null;
let retryCount = 0;
const MAX_RETRIES = 3;
const PORT = process.env.PORT || 5173;

// 색상 코드
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 서버 상태 확인
function checkServer() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: '/',
      method: 'GET',
      timeout: 2000
    };

    const req = http.request(options, (res) => {
      resolve(res.statusCode === 200);
    });

    req.on('error', () => {
      resolve(false);
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// 서버 시작
function startServer() {
  log(`\n🚀 Brand Studio 서버를 시작합니다... (포트: ${PORT})`, 'green');
  
  // 환경 변수 설정
  const env = { ...process.env };
  
  // Vite 서버 시작
  serverProcess = spawn('npm', ['run', 'dev', '--', '--port', PORT.toString()], {
    env,
    stdio: 'pipe',
    shell: true
  });

  // 서버 출력 처리
  serverProcess.stdout.on('data', (data) => {
    const output = data.toString();
    
    // 서버 준비 완료 감지
    if (output.includes('ready in') || output.includes('Local:')) {
      log('\n✅ 서버가 성공적으로 시작되었습니다!', 'green');
      log(`📍 http://localhost:${PORT}/`, 'blue');
      retryCount = 0;
    }
    
    process.stdout.write(output);
  });

  serverProcess.stderr.on('data', (data) => {
    const error = data.toString();
    
    // 일반적인 경고는 무시
    if (error.includes('warning') || error.includes('WARN')) {
      process.stderr.write(colors.yellow + error + colors.reset);
    } else {
      process.stderr.write(colors.red + error + colors.reset);
    }
  });

  // 서버 프로세스 종료 처리
  serverProcess.on('close', (code) => {
    if (code !== 0 && code !== null) {
      log(`\n❌ 서버가 비정상적으로 종료되었습니다 (코드: ${code})`, 'red');
      
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        log(`🔄 재시작 시도 중... (${retryCount}/${MAX_RETRIES})`, 'yellow');
        setTimeout(startServer, 2000);
      } else {
        log('❌ 서버 시작에 실패했습니다. 로그를 확인해주세요.', 'red');
        process.exit(1);
      }
    }
  });

  serverProcess.on('error', (err) => {
    log(`\n❌ 서버 시작 오류: ${err.message}`, 'red');
    process.exit(1);
  });
}

// 서버 종료
function stopServer() {
  if (serverProcess) {
    log('\n🛑 서버를 종료합니다...', 'yellow');
    serverProcess.kill('SIGTERM');
    serverProcess = null;
  }
}

// 프로세스 종료 처리
process.on('SIGINT', () => {
  log('\n\n👋 서버를 종료합니다...', 'yellow');
  stopServer();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopServer();
  process.exit(0);
});

// 서버 상태 모니터링
async function monitorServer() {
  setInterval(async () => {
    if (serverProcess) {
      const isRunning = await checkServer();
      if (!isRunning && retryCount === 0) {
        log('\n⚠️  서버 응답이 없습니다. 상태를 확인하는 중...', 'yellow');
      }
    }
  }, 30000); // 30초마다 확인
}

// 메인 실행
async function main() {
  log('🎯 Brand Studio 서버 관리자', 'bright');
  log('================================\n', 'bright');
  
  // 포트 확인
  const isPortInUse = await checkServer();
  if (isPortInUse) {
    log(`⚠️  포트 ${PORT}가 이미 사용 중입니다.`, 'yellow');
    log('기존 서버를 종료하고 새로 시작하시겠습니까? (Ctrl+C로 취소)', 'yellow');
    
    // 3초 대기
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  // 서버 시작
  startServer();
  
  // 모니터링 시작
  setTimeout(monitorServer, 5000);
}

// 실행
main().catch((err) => {
  log(`❌ 오류 발생: ${err.message}`, 'red');
  process.exit(1);
});