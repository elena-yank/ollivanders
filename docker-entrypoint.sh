#!/bin/sh
# docker-entrypoint.sh — точка входа для Docker-контейнера
# Запускает Nginx и прокси-сервер загрузки VK

set -e

echo "[entrypoint] Starting VK upload proxy on port 3001..."
node /app/upload-proxy.js &
PROXY_PID=$!

echo "[entrypoint] Starting Nginx..."
nginx -g "daemon off;" &
NGINX_PID=$!

# Обработка сигналов завершения
trap "echo '[entrypoint] Stopping...'; kill $PROXY_PID $NGINX_PID 2>/dev/null; exit 0" SIGTERM SIGINT

# Ожидаем любой из процессов
wait -n $PROXY_PID $NGINX_PID

exit $?