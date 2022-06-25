token="-"
appNameFolderGit="10317Read2TSAngular-master"
curl -H "Authorization: token $token" -L -O https://github.com/PavelK6896/10317Read2TSAngular/archive/refs/heads/master.zip
unzip -d ./source/ master.zip
cat ./source/$appNameFolderGit/package.json
