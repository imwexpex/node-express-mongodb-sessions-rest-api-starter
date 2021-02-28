FROM node:12-alpine

ENV APP_ROOT /opt/app
ENV PORT 3000

WORKDIR $APP_ROOT

ADD . .
RUN chmod +x /opt/app/app/app.js
EXPOSE $PORT

RUN yarn global add pm2
RUN yarn
CMD ["pm2-runtime", "/opt/app/app/app.js", "--interpreter", "/opt/app/node_modules/.bin/babel-node"]
