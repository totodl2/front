FROM node:14.16

ARG API_URL
ENV NODE_ENV production
ENV PORT 3000

COPY --chown=node:node "." "/home/node/server"

USER node
WORKDIR /home/node/server

RUN touch .env && \
    npm i && npm run build

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]

