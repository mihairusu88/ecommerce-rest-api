# Build context is the repository root (see docker-compose.yml / render.yaml),
# so all paths below are repo-relative.
FROM node:22-alpine AS deps
WORKDIR /app/services/auth-service
COPY services/auth-service/package.json services/auth-service/package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app/services/auth-service
COPY --chown=node:node services/auth-service/ ./
COPY --chown=node:node --from=deps /app/services/auth-service/node_modules ./node_modules
USER node
# Render/Compose inject PORT; 3001 is only the local default.
EXPOSE 3001
CMD ["node", "index.js"]
