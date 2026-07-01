# Build context is the repository root (see docker-compose.yml / render.yaml),
# so all paths below are repo-relative.
FROM node:22-alpine AS deps
WORKDIR /app/services/order-service
COPY services/order-service/package.json services/order-service/package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app/services/order-service
COPY --chown=node:node services/order-service/ ./
COPY --chown=node:node --from=deps /app/services/order-service/node_modules ./node_modules
USER node
# Render/Compose inject PORT; 3003 is only the local default.
EXPOSE 3003
CMD ["node", "index.js"]
