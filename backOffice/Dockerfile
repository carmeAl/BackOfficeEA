FROM node:14.21.3 as node
WORKDIR /app
COPY . . 
RUN npm install
RUN npm run build --configuration=production
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/back-office /usr/share/nginx/html