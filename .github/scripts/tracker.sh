#! /usr/bin/env bash
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

responseId=$(curl -s 'https://api.tracker.yandex.net/v2/issues/' \
-H "Authorization: OAuth $OAuth" \
-H "X-Org-ID: $OrganizationId" \
-H "Content-Type: application/json" \
-d "$Data" \
| jq -r '.id')


if [[ -n "$responseId" ]]
  then 
    echo "ticketId=$responseId" >> $GITHUB_ENV
    echo "В трекере создан релизный тикет с ID = $responseId" 
    exit 0
  else 
    responseId=$(curl -s "https://api.tracker.yandex.net/v2/issues/_search" \
    -H "Authorization: OAuth $OAuth" \
    -H "X-Org-ID: $OrganizationId" \
    -H "Content-Type: application/json" \
    -d '{"filter": {"unique": "'"${Unique}"'"}}' \
    | jq -r '.id'
    )
    if [[ -n "$responseId" ]]
      then 
        echo "ticketId=$responseId" >> $GITHUB_ENV
        responseId=$(curl -s -X PATCH "https://api.tracker.yandex.net/v2/issues/$Id" \
          -H "Authorization: OAuth $OAuth" \
          -H "X-Org-ID: $OrganizationId" \
          -H "Content-Type: application/json" \
          -d "$Data" \
          | jq -r '.id'
          )
        echo "В трекере обновлена тикет с ID = $responseId" 
        exit 0
      else 
        echo "Ошиба создания тикета в трекере" 
        exit 1
      fi
  fi
