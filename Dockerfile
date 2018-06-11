FROM node:9-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install --only=prod

COPY src /usr/src/app/src
COPY index.html /usr/src/app

RUN npm run build

FROM nginx:1.15.0-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/src/app
