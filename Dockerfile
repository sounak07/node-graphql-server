FROM node:15.10.0

WORKDIR -p /home/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5070

CMD [ "node", "build/index.js" ]
