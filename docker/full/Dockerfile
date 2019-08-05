FROM foucdeg/airspaces:api

EXPOSE 8080

RUN apk update && apk add nginx
COPY ./docker/full/nginx.conf /etc/nginx/conf.d/airspaces.conf

COPY ./frontend/package.json /app/frontend/package.json
COPY ./frontend/yarn.lock /app/frontend/yarn.lock
RUN cd frontend && yarn

COPY ./frontend /app/frontend
RUN cd frontend && yarn build
RUN mkdir -p /run/nginx

CMD ["sh", "-c", "yarn server:start & nginx -g \"daemon off;\""]
