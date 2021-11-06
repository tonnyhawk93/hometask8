#! /usr/bin/env bash

LastTag=$(git tag | sort -V -r | awk 'NR==1')

image="image-$LastTag"

npx docker build . -f Dockerfile -t ${image}


if [ $? -ne 0 ]
then
    result="Ошибка! Docker образ не создан"
    echo $result
    chmod +x ./.github/scripts/add.sh
    ./.github/scripts/add.sh "$result" "$ticketId" "$OAuth" "$OrganizationId"
    exit 1
else
    result="Успешно создан docker образ: ${image}"
    echo $result
    chmod +x ./.github/scripts/add.sh
    ./.github/scripts/add.sh "$result" "$ticketId" "$OAuth" "$OrganizationId"
    exit 0
fi


