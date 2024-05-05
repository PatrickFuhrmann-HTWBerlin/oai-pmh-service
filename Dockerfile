FROM node:18-alpine

WORKDIR /home/node/app

COPY package*.json /home/node/app/
COPY . /home/node/app/
COPY ENV_EXAMPLE /home/node/app/.env

RUN npm install
RUN ./node_modules/.bin/tsc 

CMD ["node", "src/index.js"]
