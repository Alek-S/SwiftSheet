FROM node:11.15.0

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/package.json
RUN npm run clean-install

COPY . /app

RUN npm run build

EXPOSE 5000

CMD [ "npm","run", "start:prod" ]