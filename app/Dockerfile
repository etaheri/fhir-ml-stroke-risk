FROM node:lts

WORKDIR /app
COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

RUN npm install -g pnpm

RUN pnpm i

COPY . /app

RUN pnpm run build

ENV PORT=3000

EXPOSE 3000

ENV NODE_ENV production

CMD [ "npx", "serve", "build" ]