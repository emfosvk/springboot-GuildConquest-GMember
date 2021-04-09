#!/usr/bin/env bash

echo "---------------------------------- [START] start.sh ----------------------------------"

ABSPATH=$(readlink -f $0)
ABSDIR=$(dirname $ABSPATH)
source ${ABSDIR}/profile.sh

REPOSITORY=/home/ec2-user/app/step3
PROJECT_NAME=springboot-GuildConquest-GMember

echo "build 파일 복사"
echo "cp $REPOSITORY/zip/*.jar $REPOSITORY/"

cp $REPOSITORY/zip/*.jar $REPOSITORY/

echo "new Application Deploy"
JAR_NAME=$(ls -tr $REPOSITORY/*.jar | tail -n 1)
echo "JAR File Name = $JAR_NAME"
echo "실행권한 추가 = $JAR_NAME"

echo "실행권한 추가 / chmod +x $JAR_NAME"
chmod +x $JAR_NAME

echo "JAR 실행 = $JAR_NAME / profile : $IDLE_PROFILE"

IDLE_PROFILE=$(find_idle_profile)

nohup java -jar \
    -Dspring.config.location=classpath:/application.properties,classpath:/application-$IDLE_PROFILE.properties,/home/ec2-user/app/application-oauth.properties,/home/ec2-user/app/application-aws-db.properties \
    -Dspring.profiles.active=$IDLE_PROFILE \
    $JAR_NAME > $REPOSITORY/nohup.out 2>&1 &


echo "---------------------------------- [E N D] start.sh ----------------------------------"