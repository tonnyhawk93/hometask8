#! /usr/bin/env bash
Text=$1
Id=$2
OAuth=$3
OrganizationId=$4
    
responseCode=$(curl --silent -s -w "%{http_code}" "https://api.tracker.yandex.net/v2/issues/$Id/comments" \
--header "Authorization: OAuth $OAuth" \
--header "X-Org-ID: $OrganizationId" \
--header "Content-Type: application/json" \
--data-raw '{"text": "'"$Text"'"}'
)
echo $responseCode
if [ "$responseCode" = 201 ]
then echo "Comment created successfully!"
else echo "Error!!! Comment not created."
fi