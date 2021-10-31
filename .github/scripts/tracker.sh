#! /usr/bin/env bash

LastTag=$(git tag | sort -V -r | awk 'NR==1')
PreviousTag=$(git tag | sort -V -r | awk 'NR==2')
echo $LastTag 
echo $PreviousTag
Date=`git log -1 --format=%ai $CurrentGitTag`
Author=`git show $CurrentGitTag --pretty=format:"%an %ae" --no-patch`
ChangeLog=`git log --pretty=”%s” $PreviousGitTag..$CurrentGitTag`


Summary="Release ${CurrentGitTag}"
Description="Date: ${Date}\nAuthor: ${Author}\nChangelog:\n${ChangeLog}" 
Unique="${Author}_${CurrentGitTag}_"

Data='{
        "queue": "TONNY",
        "summary": "'"${Summary}"'",
        "description": "'"${Description}"'",
        "unique": "'"${Unique}"'"
    }'

responseCode=$(curl -s -w "%{http_code}" -X POST 'https://api.tracker.yandex.net/v2/issues/' \
--header "Authorization: OAuth $OAUTH_ID" \
--header "X-Org-ID: $ORGANIZATION_ID" \
--header "Content-Type: application/json" \
--data-raw "$Data"
)

if [ "$responseCode" = 200 ]
  then echo "OK!" 
  else echo "Error!" 
  fi

