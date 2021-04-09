#!/usr/bin/env bash

echo "---------------------------------- [START] stop.sh ----------------------------------"

ABSPATH=$(readlink -f $0)
ABSDIR=$(dirname $ABSPATH)
source ${ABSDIR}/profile.sh

IDLE_PORT= $(find_idle_port)

echo "> $IDLE_PORT 에서 구동중인 PID 확인"
IDLE_PID=$(lsof -ti tcp:${IDLE_PORT})

if [ -z ${IDLE_PID}]
then
  echo "> PID 발견 못함. Kill 작업 패스"
else
  echo "> kill -15 ${IDLE_PID}"
  kill -15 ${IDLE_PID}
  sleep 5
fi

echo "---------------------------------- [E N D] stop.sh ----------------------------------"