FROM node:18-alpine3.14

WORKDIR /app

COPY . /app

RUN npm install -g pnpm

RUN npm install -g pm2

RUN pnpm install

RUN pnpm build:passport
RUN pnpm build:shop
RUN pm2 start npm --name Passport -- run start:passport
RUN pm2 start npm --name Shop -- run start:shop

EXPOSE 3000
EXPOSE 3001

EXPOSE 3306
EXPOSE 6379

CMD ["pm2-runtime", "ecosystem.config.js"]