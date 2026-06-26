# ============================================================
# Dockerfile — Волшебная палочка (Wand Test App)
#
# Многоступенчатая сборка:
#   1. builder — копирует все статические файлы
#   2. nginx + Node.js — раздача статики + прокси для VK upload
# ============================================================

# ---- Stage 1: Builder ----
FROM alpine:3.19 AS builder

WORKDIR /build

# Копируем все статические файлы проекта
COPY index.html .
COPY css/ css/
COPY js/ js/
COPY fonts/ fonts/
COPY bg/ bg/

# ---- Stage 2: Production (Nginx + Node.js) ----
FROM nginx:1.25-alpine

# Устанавливаем Node.js 20 для прокси-сервера загрузки
RUN apk add --no-cache nodejs

# Метка с информацией о приложении
LABEL org.opencontainers.image.title="Волшебная палочка — тест Олливандера"
LABEL org.opencontainers.image.description="Тест на определение волшебной палочки в стиле Гарри Поттера"
LABEL org.opencontainers.image.version="2.0.0"

# Удаляем дефолтные конфиги Nginx
RUN rm -f /etc/nginx/conf.d/default.conf

# Копируем наш конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/wand.conf

# Копируем статические файлы из builder-стадии
COPY --from=builder /build /usr/share/nginx/html

# Копируем прокси-сервер
COPY server/upload-proxy.js /app/upload-proxy.js

# Настройки Nginx: не демонизироваться (запуск в foreground)
# и писать логи в stdout/stderr для Docker
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

# Порт для Nginx
EXPOSE 80

# Запускаем Nginx и прокси-сервер через supervisord-like скрипт
# Используем shell-скрипт для запуска обоих процессов
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

CMD ["/docker-entrypoint.sh"]