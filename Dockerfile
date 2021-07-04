FROM node:14.12.0-alpine as builder

ENV APP_ROOT /opt/app
ENV PORT 3000

WORKDIR $APP_ROOT

ADD . .
RUN chmod +x /opt/app/app/app.js
EXPOSE $PORT

RUN apk add git

RUN yarn global add pm2
RUN yarn install --production
RUN yarn build

CMD ["pm2-runtime", "/opt/app/build/app.js"]
