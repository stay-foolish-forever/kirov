FROM node:20-bookworm-slim AS DEPS
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:20-bookworm-slim AS BUILDER
WORKDIR /app
COPY . .
COPY --from=DEPS /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

FROM node:20-bookworm-slim AS PRODUCT
EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV production
WORKDIR /app
COPY --from=BUILDER /app/public ./public
COPY --from=BUILDER /app/.next ./.next
COPY --from=BUILDER /app/node_modules ./node_modules
COPY --from=BUILDER /app/package.json ./
CMD ["node_modules/.bin/next", "start"]
