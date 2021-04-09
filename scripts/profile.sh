#!/usr/bin/env bash
#profile.sh 쉬고있는 profile 찾기.

function find_idle_profile(){
  RESPONCE_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/profile)

  if [${RESPONCE_CODE} -ge 400] #400보다 크면 에러
  then
    CURRENT_PROFILE=aws2
  else
    CURRENT_PROFILE=$(curl -s http://localhost/profile)
  fi

  if[${CURRENT_PROFILE} == aws1]
  then
    IDLE_PROFILE = aws2
  else
    IDLE_PROFILE = aws1
  fi

  echo "CURRENT_PROFILE : ${CURRENT_PROFILE}"
  echo "IDLE_PROFILE    : ${IDLE_PROFILE}"
}

function find_idle_port(){

  IDLE_PROFILE = $(find_idle_profile)

  if [${IDLE_PROFILE} = aws1]
  then
    echo "8081"
  else
    echo "8082"
  fi

}
