FROM node:15.10.0

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "node", "build/index.js" ]
