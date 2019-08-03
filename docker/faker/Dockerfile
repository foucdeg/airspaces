FROM mhart/alpine-node:10

WORKDIR /app
COPY ./tools /app
COPY ./docker/faker/entry_point.sh .

CMD ["sh", "entry_point.sh"]
