FROM node:lts

WORKDIR /app
COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

RUN npm install -g pnpm

RUN pnpm i

COPY . /app

ENV PORT=3000

EXPOSE 3000

CMD [ "pnpm", "run", "start" ]