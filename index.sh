#! /usr/bin/env bash
chmod +x ./index.sh
npm ci
# npm run build
# jest
# selenium-standalone start & echo $! > ./selenium

# pkill -F ./selenium
# rm ./selenium
echo "done"
