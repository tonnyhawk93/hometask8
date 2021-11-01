#! /usr/bin/env bash

npm i
npm run build

if [ $? -ne 0 ]
then
    result="ERROR app build!!"
    exit 1
else
    result="App build successfully"
fi
