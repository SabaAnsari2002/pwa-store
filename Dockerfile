FROM node:18 as build

WORKDIR /app

COPY Frontend/package*.json ./
RUN npm install

COPY Frontend/ ./
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
