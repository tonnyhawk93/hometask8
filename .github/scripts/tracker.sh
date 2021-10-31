#! /usr/bin/env bash

LastTag=$(git tag | sort -V -r | awk 'NR==1')
PreviousTag=$(git tag | sort -V -r | awk 'NR==2')
Tags=$(git tag | sort -V -r)
echo $LastTag 
echo $PreviousTag
Date=`git log -1 --format=%ai ${LastTag}`
Author=`git show ${LastTag} --pretty=format:"%an %ae" --no-patch`
ChangeLog=`git log --pretty=”%s” ${PreviousTag}..${LastTag}`


Summary="Release ${LastTag}"
Description="Date: ${Date}\nAuthor: ${Author}\nChangelog:\n${ChangeLog}" 
Unique="${Author}_${LastTag}_"

Data='{
        "queue": "TMP",
        "summary": "'"${Summary}"'",
        "description": "'"${Description}"'",
        "unique": "'"${Unique}"'"
    }'

responseCode=$(curl --silent  -o /dev/null -s -w "%{http_code}" --location --request POST 'https://api.tracker.yandex.net/v2/issues/' \
--header "Authorization: OAuth $OAUTH_ID" \
--header "X-Org-ID: $ORGANIZATION_ID" \
--header "Content-Type: application/json" \
--data-raw "$Data"
)

if [ "$responseCode" = 200 ]
  then echo "OK!" 
  else echo "Error!" 
  fi

