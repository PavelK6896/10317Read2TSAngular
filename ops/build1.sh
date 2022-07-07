#!/bin/bash
deployBuild="https://localhost:8081"

appName="10317-read2-ts-angular"
search="http://localhost:8080"
files="./dist/$appName/*"
cd ..
echo 'Build 1'
npm run "build prod static"

for f in $files; do
  if [[ $search != "" && $deployBuild != "" && "$f" == *"main"* ]]; then
    sed -i "s+$search+$deployBuild+g" "$f"
  fi
done

echo 'Build 1 ok'
exit
