#! /usr/bin/env bash
npx jest

if [ $? -ne 0 ]
then
    result="ERROR tests don't pass"
else
    result="Tests passed successfully"
fi

chmod +x ./.github/scripts/add.sh
./.github/scripts/add.sh "$result" "$ticketId" "$OAuth" "$OrganizationId"