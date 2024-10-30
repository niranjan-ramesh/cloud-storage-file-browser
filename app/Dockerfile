FROM node:lts-alpine3.19@sha256:2d8c24d9104bda27e07dced6d7110aa728dd917dde8255d8af3678e532b339d6 AS build

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci

COPY . /app
RUN npm run build

FROM node:lts-alpine3.19@sha256:2d8c24d9104bda27e07dced6d7110aa728dd917dde8255d8af3678e532b339d6
WORKDIR /app
COPY --from=build /app/build .

RUN npm install -g serve

CMD ["serve", "-s", ".", "-l", "3000"]

EXPOSE 3000