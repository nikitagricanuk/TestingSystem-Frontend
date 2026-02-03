FROM mirror.gcr.io/node:24.5.0-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install react-toastify
RUN npm install recharts

COPY . .
RUN npm run build

FROM mirror.gcr.io/nginx:alpine


COPY nginx.conf /etc/nginx/conf.d/default.conf


COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
