#! /usr/bin/env bash
echo ${env.OAuth}
echo ${env.OrganizationId}
LastTag=$(git tag | sort -V -r | awk 'NR==1')
PreviousTag=$(git tag | sort -V -r | awk 'NR==2')
Tags=$(git tag | sort -V -r)
Date=`git log -1 --format=%ai ${LastTag}`
Author=`git show ${LastTag} --pretty=format:"%an %ae" --no-patch`
ChangeLog=`git log --pretty=format:"%h - %an, %cd : %s" --date=short ${PreviousTag}..${LastTag}`
Summary="Release ${LastTag}"
Description="Date: ${Date}\nAuthor: ${Author}\nChangelog:\n${ChangeLog}" 
Unique="tonnyhawk93/hometask8/${LastTag}"

Data='{
        "queue": "TMP",
        "summary": "'"${Summary}"'",
        "description": "'"${Description}"'",
        "unique": "'"${Unique}"'"
    }'

responseId=$(curl --silent -s 'https://api.tracker.yandex.net/v2/issues/' \
--header "Authorization: OAuth ${env.OAuth}" \
--header "X-Org-ID: ${env.OrganizationId}" \
--header "Content-Type: application/json" \
--data-raw "$Data" \
| jq -r '.id')

echo ::set-env name=ticketId::$responseId

if [ -n $responseId]
  then echo "OK!" 
  echo $responseId
  else echo "Error!" 
  fi
