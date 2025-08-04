#!/bin/bash

# 경로 정의
REPOSITORY=/home/ec2-user/git
PROJECT_DIR=$REPOSITORY/Workout_together/backend
JAR_SOURCE=$PROJECT_DIR/build/libs
DEPLOY_DIR=$REPOSITORY/deploy

# 배포 디렉토리 생성
mkdir -p "$DEPLOY_DIR"

# 프로젝트 디렉토리로 이동
cd "$PROJECT_DIR" || { echo "디렉토리 이동 실패: $PROJECT_DIR"; exit 1; }

echo "> Git Pull"
git pull || { echo "Git pull 실패"; exit 1; }

echo "> 프로젝트 빌드 시작"
./gradlew build || { echo "빌드 실패"; exit 1; }

echo "> 빌드 파일 복사"
JAR_FILE=$(ls "$JAR_SOURCE"/*.jar 2>/dev/null | tail -n 1)
if [ -z "$JAR_FILE" ]; then
    echo "$JAR_SOURCE에 JAR 파일이 없습니다"
    exit 1
fi
cp "$JAR_FILE" "$DEPLOY_DIR/" || { echo "JAR 복사 실패"; exit 1; }

echo "> 실행 중인 애플리케이션 PID 확인"
CURRENT_PID=$(pgrep -f "$JAR_FILE")
echo "현재 PID: $CURRENT_PID"

if [ -z "$CURRENT_PID" ]; then
    echo "> 실행 중인 애플리케이션이 없으므로 종료 생략"
else
    echo "> PID $CURRENT_PID 종료"
    kill -15 "$CURRENT_PID"
    # 프로세스 종료 대기, 최대 10초
    for i in {1..10}; do
        if ! ps -p "$CURRENT_PID" > /dev/null; then
            echo "프로세스 종료 완료"
            break
        fi
        sleep 1
    done
    # 여전히 실행 중이면 강제 종료
    if ps -p "$CURRENT_PID" > /dev/null; then
        echo "> PID $CURRENT_PID 강제 종료"
        kill -9 "$CURRENT_PID"
    fi
fi

echo "> 새 애플리케이션 배포"
JAR_NAME=$(basename "$JAR_FILE")
echo "> JAR 이름: $JAR_NAME"

# nohup으로 애플리케이션 실행, 로그 파일로 출력 리디렉션
nohup java -jar "$DEPLOY_DIR/$JAR_NAME" > "$DEPLOY_DIR/app.log" 2>&1 &

echo "> 배포 완료"