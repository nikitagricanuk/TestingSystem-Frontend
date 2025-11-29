# Этап сборки
FROM mirror.gcr.io/node:24.5.0-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -D tailwindcss@3
RUN npm install react-toastify

COPY . .
RUN npm run build


# Этап продакшен-сервера
FROM mirror.gcr.io/nginx:alpine

# Копируем кастомный конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
