#! /usr/bin/env bash
Text=$1
Id=$2
OAuth=$3
OrganizationId=$4
    
responseId=$(curl --silent -s "https://api.tracker.yandex.net/v2/issues/$Id/comments" \
--header "Authorization: OAuth $OAuth" \
--header "X-Org-ID: $OrganizationId" \
--header "Content-Type: application/json" \
--data-raw '{"text": "'"$Text"'"}' \
| jq -r '.id'
)

if [[ ! -z $responseId ]]
then 
    echo "Добавлен коментарий в тикет"
    exit 0
else 
    echo "Ошибка добавления коментария в тикет"
    exit 0
fi