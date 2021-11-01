#! /usr/bin/env bash

LastTag=$(git tag | sort -V -r | awk 'NR==1')
Unique="tonnyhawk93/hometask8/${LastTag}"

Data='{
        "queue": {
            "key" : "TMP",
            "id" : "'"${Unique}"'"
        }
        "summary": "'"${Summary}"'",
        "description": "'"${Description}"'",
        "unique": "'"${Unique}"'"
    }'

responseCode=$(curl --silent  -o /dev/null -s -w "%{http_code}" --location --request PATCH 'https://api.tracker.yandex.net/v2/issues/${Unique}' \
--header "Authorization: OAuth $OAuth" \
--header "X-Org-ID: $OrganizationId" \
--header "Content-Type: application/json" \
--data-raw "$Data"
)