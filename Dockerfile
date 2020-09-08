FROM alpine:latest

RUN apk add --no-cache --update nodejs nodejs-npm

COPY . .

RUN npm install

CMD npm run start
