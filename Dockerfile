FROM node:8

ENV DB_HOST=mongo 

WORKDIR /usr/push-demo/

COPY ./server/package.json .
COPY ./server/yarn.lock .

RUN yarn

COPY ./server .

EXPOSE 3000

CMD [ "npm", "start" ]
