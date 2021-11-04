#! /usr/bin/env bash
Text=$1
Id=$2
OAuth=$3
OrganizationId=$4
Data'{
        "text": '${Text}'
    }'
    
responseCode=$(curl --silent  -o /dev/null -s -w "%{http_code}" --location --request PATCH 'https://api.tracker.yandex.net/v2/issues/'${Id}'/comments' \
--header "Authorization: OAuth $OAuth" \
--header "X-Org-ID: $OrganizationId" \
--header "Content-Type: application/json" \
--data-raw "$Data"
)

if [ "$responseCode" = 201 ]
then echo "Comment created successfully!"
else echo "Error!!! Comment not created."
fi