FROM node:23-alpine3.20

WORKDIR /app

COPY ./package.json  .

RUN npm install

COPY . .

CMD [ "node", "server.js" ]