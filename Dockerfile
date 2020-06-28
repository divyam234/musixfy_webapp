FROM node:14-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/package.json

COPY ./package-lock.json /app/package-lock.json

RUN npm ci --silent

COPY . /app/

RUN npm run build

# production environment

FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html
# new

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]