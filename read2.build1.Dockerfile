FROM node:16.15.1-alpine AS build
WORKDIR /usr/src/app
ADD package.json package-lock.json ./
RUN npm install
ADD . .
RUN npm run "build prod static"

#run sh ./build3.sh


# docker build -t read2-front-v1 -f read2.build1.Dockerfile .
# docker run --name read2-front-v1-c1 -d read2-front-v1 sleep 900
# docker cp read2-front-v1-c1:/usr/src/app/dist/. dist