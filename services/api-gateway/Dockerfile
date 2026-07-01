# Build context is the repository root (see docker-compose.yml / render.yaml),
# so all paths below are repo-relative.
FROM node:22-alpine AS deps
WORKDIR /app/services/api-gateway
COPY services/api-gateway/package.json services/api-gateway/package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app/services/api-gateway
COPY --chown=node:node services/api-gateway/ ./
COPY --chown=node:node --from=deps /app/services/api-gateway/node_modules ./node_modules
# config/swagger.js imports the repo-root package.json ("../../../package.json")
# for the aggregated spec version; place it where that relative path resolves.
COPY --chown=node:node package.json /app/package.json
USER node
# Render/Compose inject PORT; 3000 is only the local default.
EXPOSE 3000
CMD ["node", "index.js"]
