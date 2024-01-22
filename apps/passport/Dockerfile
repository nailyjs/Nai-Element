FROM node:18-alpine3.14

WORKDIR /app

COPY . /app

RUN npm install -g pnpm

RUN npm install -g pm2

RUN pnpm install

RUN pnpm build:passport

EXPOSE 3000

CMD [ "pnpm", "start:passport" ]
