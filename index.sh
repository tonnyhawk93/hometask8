#! /usr/bin/env bash
npm run build
selenium-standalone start & $!> ./selenium
npm test
pkill -F ./selenium && rm ./selenium
echo "done"
