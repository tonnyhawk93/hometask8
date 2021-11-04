#! /usr/bin/env bash

echo $ticketId
echo $bla
npx jest

if [ $? -ne 0 ]
then
    result="ERROR tests don't pass"
    exit 1
else
    result="Tests passed successfully"
fi

echo $result