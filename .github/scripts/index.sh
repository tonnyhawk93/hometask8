#! /usr/bin/env bash
echo 'Установка зависимостей...'
npm i
if [ $? -ne 0 ]
then
    result='Ошибка установки зависимостей'
    echo $result
    chmod +x ./.github/scripts/add.sh
    ./.github/scripts/add.sh "$result" "$ticketId" "$OAuth" "$OrganizationId"
    exit 1
else
    echo "Зависимости установлены"
fi

echo 'Сборка приложения...'
npm run build

if [ $? -ne 0 ]
then
    result='Ошибка сборки приложения'
    echo $result
    chmod +x ./.github/scripts/add.sh
    ./.github/scripts/add.sh "$result" "$ticketId" "$OAuth" "$OrganizationId"
    exit 1
else
    result="Приложение собрано успешно"
    echo $result
    chmod +x ./.github/scripts/add.sh
    ./.github/scripts/add.sh "$result" "$ticketId" "$OAuth" "$OrganizationId"
    exit 0
fi

