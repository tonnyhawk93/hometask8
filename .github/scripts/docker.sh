#! /usr/bin/env bash

LastTag=$(git tag | sort -V -r | awk 'NR==1')

image="image-$LastTag"

npx docker build . -f Dockerfile -t ${image}

if [ $? -ne 0 ]
then
    result="!!ERROR with create docker image!!"
    exit 1
else
    result="Created docker image: ${image}"
fi

chmod +x ./.github/scripts/add.sh
./.github/scripts/add.sh "$result" "$ticketId" "$OAuth" "$OrganizationId"