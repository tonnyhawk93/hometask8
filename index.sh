#! /usr/bin/env bash
npm i
npm run build
selenium-standalone start & echo $! > ./selenium
npm test
pkill -F ./selenium
rm ./selenium
echo "done"
