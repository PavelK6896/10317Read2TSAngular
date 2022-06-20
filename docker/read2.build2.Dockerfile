FROM node:16.15.1-alpine AS build
WORKDIR /usr/src/app
ADD ../package.json package-lock.json ./
RUN npm install
ADD .. .
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


# docker build -t read2-front-v2 -f read2.build2.Dockerfile .
# docker run --name read2-front-v2-c1 -d read2-front-v2 sleep 900
# docker cp read2-front-v2-c1:/usr/src/app/dist/. dist