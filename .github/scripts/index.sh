#! /usr/bin/env bash
npm i
npm run build
jest
# selenium-standalone start & echo $! > ./selenium

# pkill -F ./selenium
# rm ./selenium
echo "done"
