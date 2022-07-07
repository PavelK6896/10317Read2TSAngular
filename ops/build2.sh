#!/bin/bash

cd ..
docker build -t read2-front-v2 -f ops/read2.build2.Dockerfile .
docker run --rm --name read2-front-v2-c1 -d read2-front-v2 sleep 900
docker cp read2-front-v2-c1:/usr/src/app/dist/. dist
docker stop -t 2 read2-front-v2-c1



