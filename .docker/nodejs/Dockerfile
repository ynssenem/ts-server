FROM node:17-alpine
LABEL maintenance="yunussenem@icloud.com" 
WORKDIR /usr/app

COPY package.json yarn.lock /usr/app/

RUN yarn install
RUN yarn prisma:generate

COPY . .

EXPOSE 3000
CMD [ "yarn", "server:dev" ]
