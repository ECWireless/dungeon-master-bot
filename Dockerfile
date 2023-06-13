FROM node:16

WORKDIR /src

COPY yarn.lock .
COPY package.json .
COPY tsconfig.json .
COPY src ./src

RUN yarn install --frozen-lockfile

ENV PORT=8080

EXPOSE 8080

CMD ["yarn", "start"]
