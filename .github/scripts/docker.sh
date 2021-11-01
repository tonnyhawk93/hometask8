#! /usr/bin/env bash

LastTag=$(git tag | sort -V -r | awk 'NR==1')

image="image-$LastTag"

docker build . -f Dockerfile -t ${image}

if [ $? -ne 0 ]
then
    result="!!ERROR with create docker image!!"
    exit 1
else
    result="Created docker image: ${image}"
fi

echo $result