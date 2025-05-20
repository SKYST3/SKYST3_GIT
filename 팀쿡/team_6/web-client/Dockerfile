FROM node:20.11-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

ENV NODE_ENV=production

RUN npm ci

COPY . .

RUN npm run build

FROM node:20.11-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public

CMD ["npm", "run", "start:prod"]
