FROM mhart/alpine-node:10

WORKDIR /app
COPY . /app

EXPOSE 9000
EXPOSE 49003/udp

RUN npm i -g yarn
RUN yarn

CMD ["npm", "run", "server:start"]
