FROM node:18-alpine3.14

WORKDIR /app

COPY . /app

RUN npm install -g pnpm --registry=https://registry.npmmirror.com

RUN npm install -g pm2 --registry=https://registry.npmmirror.com

RUN pnpm install --registry=https://registry.npmmirror.com

RUN pnpm build:passport

EXPOSE 3000

CMD [ "pnpm", "start:passport" ]
