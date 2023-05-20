FROM node:18 AS builder

WORKDIR /builder

COPY yarn.lock package.json .
RUN yarn install --frozen-lockfile

ENV MODE standalone
COPY . .
RUN yarn build

FROM node:18-slim

ENV NODE_ENV production
WORKDIR /app

COPY --from=builder --chown=node:node /builder/next.config.js ./
COPY --from=builder --chown=node:node /builder/public ./public
COPY --from=builder --chown=node:node /builder/.next/standalone ./
COPY --from=builder --chown=node:node /builder/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]