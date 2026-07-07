# Build context is the repository root (see docker-compose.yml / render.yaml),
# so all paths below are repo-relative.
FROM node:22-alpine AS deps
WORKDIR /app/services/notification-service
COPY services/notification-service/package.json services/notification-service/package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app/services/notification-service
COPY --chown=node:node services/notification-service/ ./
COPY --chown=node:node --from=deps /app/services/notification-service/node_modules ./node_modules
# The file-based mock database lives at the repo root and is imported via
# "../../../database/..." → resolves to /app/database. Copy it into the image.
COPY --chown=node:node database/ /app/database/
USER node
# Render/Compose inject PORT; 3005 is only the local default.
EXPOSE 3005
CMD ["node", "index.js"]
