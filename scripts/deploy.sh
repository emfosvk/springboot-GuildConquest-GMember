#!/bin/bash

REPOSITORY=/home/ec2-user/app/step2
PROJECT_NAME=springboot-GuildConquest-GMember

echo "---------------------------------- [START] Deploy ----------------------------------"
echo "> [01 - START] Build File Copy"

cp $REPOSITORY/zip/*.jar $REPOSITORY/

echo "> [01 - E N D] Build File Copy"
echo "> [02 - START] Find Service PID activating now"

CURRENT_PID= $(pgrep -fl springboot-GuildConquest-GMember | grep jar | awk '{print $1}')
echo "> 현재기동중인 PID : $CURRENT_PID"

echo "> [02 - E N D] Build Project"
echo "> [03 - START] Shutdown Project"

if [ -z "$CURRENT_PID" ]; then
        echo "> 실행중 프로세스 발견 못함. 중지작업 pass"
else
        echo "> kill -15 $CURRENT_PID"
        kill -15 $CURRENT_PID
        sleep 5
fi

echo "> [03 - E N D] Shutdown Project"
echo "> [04 - START] Deploy Application File"

JAR_NAME=$(ls -tr $REPOSITORY/ | grep jar | tail -n 1)

echo "> Jar File Name : $JAR_NAME"

chmod +x $JAR_NAME

echo "> Changed Permition : $JAR_NAME"

echo "> [04 - E N D] Deploy Application File"
echo "> [05 - START] Startup Project"

echo "> Jar Excute : $JAR_NAME"

nohup java -jar \
        -Dspring.config.location=classpath:/application.properties,classpath:/application-aws.properties,/home/ec2-user/app/application-oauth.properties,/home/ec2-user/app/application-real-db.properties \
        -Dspring.profiles.active=aws \
        $JAR_NAME > $REPOSITORY/nohup.out 2>&1 &

echo "> [05 - E N D] Startup Project"


echo "---------------------------------- [E N D] Deploy ----------------------------------"
