FROM node:16.15.1-alpine AS build
RUN apk add curl unzip zip

ARG token="-"
ARG appNameFolderGit="10317Read2TSAngular-master"

RUN curl -H "Authorization: token $token" -L -O https://github.com/PavelK6896/10317Read2TSAngular/archive/refs/heads/master.zip
RUN unzip -d ./source/ master.zip

WORKDIR /source/$appNameFolderGit/
RUN npm install
RUN npm run "build prod static"

ARG deployBuild="https://localhost:8081"
ARG appName="10317-read2-ts-angular"
ARG search="http://localhost:8080"
ARG files="./dist/$appName/*"

RUN for f in $files; do \
         if [[ $search != "" && $deployBuild != "" && "$f" == *"main"* ]]; then \
           sed -i "s+$search+$deployBuild+g" "$f"; \
         fi \
       done


# docker build -t read2-front-v3 -f ops/read2.build3.Dockerfile .
# docker run --name read2-front-v3-c1 -d read2-front-v3 sleep 900
# docker cp read2-front-v3-c1:/source/10317Read2TSAngular-master/dist/. dist