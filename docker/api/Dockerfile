FROM mhart/alpine-node:10

EXPOSE 9000
EXPOSE 49003/udp

WORKDIR /app
RUN npm i -g yarn
COPY ./docker/api/entrypoint.sh /app/entrypoint.sh
RUN chmod u+x /app/entrypoint.sh
COPY ./server/package.json /app/server/package.json
COPY ./server/yarn.lock /app/server/yarn.lock
RUN cd server && yarn
COPY ./server /app/server

RUN rm -rf server/dist
RUN cd server && yarn build

ENTRYPOINT [ "/app/entrypoint.sh" ]
