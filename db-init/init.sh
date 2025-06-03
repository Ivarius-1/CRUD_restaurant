#!/bin/bash

# Ожидание доступности PostgreSQL
echo "Ожидание запуска PostgreSQL..."
while ! pg_isready -U "${POSTGRES_USER}" -d "${POSTGRES_DB}"; do
  sleep 1
done

# Проверка существования файла резервной копии
BACKUP_FILE="/docker-entrypoint-initdb.d/restaurant.backup"
if [ -f "$BACKUP_FILE" ]; then
  echo "Восстановление базы данных из $BACKUP_FILE..."
  pg_restore -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" --no-owner --no-privileges --verbose "$BACKUP_FILE"
  if [ $? -eq 0 ]; then
    echo "Восстановление завершено успешно."
  else
    echo "Ошибка при восстановлении базы данных."
    exit 1
  fi
else
  echo "Файл резервной копии $BACKUP_FILE не найден."
  exit 1
fi