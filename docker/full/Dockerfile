FROM foucdeg/airspaces:api

EXPOSE 8080

RUN apk update && apk add nginx
COPY ./docker/full/nginx.conf /etc/nginx/conf.d/airspaces.conf

RUN cd client && yarn build
RUN mkdir -p /run/nginx

CMD ["sh", "-c", "yarn server:start & nginx -g \"daemon off;\""]
