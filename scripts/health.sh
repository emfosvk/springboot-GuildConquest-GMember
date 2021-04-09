#!/usr/bin/env bash
#nginx와 연결되지 않은 포트로 스프링부트의 정상 기동 상태 확인
#정상적으로 연결되었으면, 프록시 설정을 swith 진행 (switch.sh)

echo "---------------------------------- [START] health.sh ----------------------------------"

ABSPATH=$(readlink -f $0)
ABSDIR=$(dirname $ABSPATH)
source ${ABSDIR}/profile.sh
source ${ABSDIR}/switch.sh

IDLE_PORT=$(find_idle_port)

echo "> health check Start"
echo "> IDLE_PORT = $IDLE_PORT"
echo "> curl -s http://localhost:$IDLE_PORT/profile"
sleep 10

for RETRY_COUNT in {1..10}
do
  echo "> health check Try ${RETRY_COUNT}/10"

  RESPONSE=$(curl -s http://localhost:${IDLE_PORT}/profile)
  UP_COUNT=$(echo ${RESPONSE} | grep 'aws' | wc -l)

  if [ ${UP_COUNT} -ge 1 ]
  then
    echo "> health check Success"
    switch_proxy
    break
  else
    echo "> health check Cannot find"
    echo "> health check : ${RESPONCE}"
  fi

  if [ ${RETRY_COUNT} -eq 10 ]
  then
     echo "> health check Fail"
     echo "> nginx 연결 없이 배포 종료"
     echo "---------------------------------- [E N D] health.sh ----------------------------------"
     exit 1
  fi

  echo "> health check ReTry"
  sleep 10
done

echo "---------------------------------- [E N D] health.sh ----------------------------------"
