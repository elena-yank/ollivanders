# ============================================================
# Dockerfile — Волшебная палочка (Wand Test App)
# 
# Многоступенчатая сборка:
#   1. builder — копирует все статические файлы
#   2. nginx — минимальный образ для раздачи статики
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

# ---- Stage 2: Nginx ----
FROM nginx:1.25-alpine

# Метка с информацией о приложении
LABEL org.opencontainers.image.title="Волшебная палочка — тест Олливандера"
LABEL org.opencontainers.image.description="Тест на определение волшебной палочки в стиле Гарри Поттера"
LABEL org.opencontainers.image.version="1.0.0"

# Удаляем дефолтные конфиги Nginx
RUN rm -f /etc/nginx/conf.d/default.conf

# Копируем наш конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/wand.conf

# Копируем статические файлы из builder-стадии
COPY --from=builder /build /usr/share/nginx/html

# Настройки Nginx: не демонизироваться (запуск в foreground)
# и писать логи в stdout/stderr для Docker
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

# Порт, который слушает Nginx
EXPOSE 80

# Запуск Nginx в foreground
CMD ["nginx", "-g", "daemon off;"]