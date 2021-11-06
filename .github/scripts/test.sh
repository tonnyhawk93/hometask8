#! /usr/bin/env bash
echo "Запуск тестов"
npx jest

if [ $? -ne 0 ]
then
    result="Ошибка! Тесты не прошли"
    echo $result
    chmod +x ./.github/scripts/add.sh
    ./.github/scripts/add.sh "$result" "$ticketId" "$OAuth" "$OrganizationId"
    exit 1
else
    result="Тесты прошли успешно"
    echo $result
    chmod +x ./.github/scripts/add.sh
    ./.github/scripts/add.sh "$result" "$ticketId" "$OAuth" "$OrganizationId"
    exit 0
fi

