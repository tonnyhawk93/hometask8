#! /usr/bin/env bash
Text=$1
Id=$2
OAuth=$3
OrganizationId=$4
    
responseId=$(curl -s "https://api.tracker.yandex.net/v2/issues/$Id/comments" \
 "Authorization: OAuth $OAuth" \
-H "X-Org-ID: $OrganizationId" \
-H "Content-Type: application/json" \
-d'{"text": "'"$Text"'"}' \
| jq -r '.id'
)

if [[ "$responseId" != "null" ]]
then 
    echo "Добавлен коментарий в тикет"
    exit 0
else 
    echo "Ошибка добавления коментария в тикет"
    exit 0
fi