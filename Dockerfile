FROM node:16

WORKDIR /src

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["yarn", "start"]
