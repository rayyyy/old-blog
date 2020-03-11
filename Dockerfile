FROM node:13.10.1-alpine

# RUN npm install -g @angular/cli

WORKDIR /app
COPY . /app

RUN apk add zsh git