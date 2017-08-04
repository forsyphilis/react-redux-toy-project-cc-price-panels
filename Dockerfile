FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package_server.json /usr/src/app/package.json
RUN npm install

COPY ./server/main.js /usr/src/app/main.js
COPY ./build /usr/src/app/build

EXPOSE 3000

CMD ["node", "/usr/src/app/main.js"]