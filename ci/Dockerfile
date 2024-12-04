FROM node:12.18.3

WORKDIR /app

# where to write the app
VOLUME [ "/app/build" ]

COPY public /app/public
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

COPY scripts /app/scripts
COPY src /app/src

RUN chmod +x /app/scripts/*

CMD [ "scripts/build_in_docker.sh" ]