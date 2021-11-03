#! /usr/bin/env bash
Text = $1
LastTag=$(git tag | sort -V -r | awk 'NR==1')
${{ steps.taskId.outputs.upload_url }}
Unique="tonnyhawk93/hometask8/${LastTag}"

Data'{
        "text": '${Text}'
    }'
    
responseCode=$(curl --silent  -o /dev/null -s -w "%{http_code}" --location --request PATCH 'https://api.tracker.yandex.net/v2/issues/'${Unique}'/comments' \
--header "Authorization: OAuth $OAuth" \
--header "X-Org-ID: $OrganizationId" \
--header "Content-Type: application/json" \
--data-raw "$Data"
)