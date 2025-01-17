FROM node:20.18.1-alpine AS base

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static
COPY --chown=nextjs:nodejs public public

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD HOSTNAME="0.0.0.0" node server.js


#FROM node:20.17.0-alpine AS base
#
#FROM base AS deps
#
#ARG HTTP_PROXY
#ARG HTTPS_PROXY
#
#ENV HTTP_PROXY=$HTTP_PROXY
#ENV HTTPS_PROXY=$HTTPS_PROXY
#
#RUN apk add --no-cache libc6-compat
#WORKDIR /app
#
#COPY package.json package-lock.json* ./
#RUN npm ci
#
#FROM base AS builder
#WORKDIR /app
#COPY --from=deps /app/node_modules ./node_modules
#COPY . .
#
#ENV NEXT_TELEMETRY_DISABLED=1
#
#RUN npx prisma generate
#COPY prisma ./prisma/
#
#RUN npm run build
#
#FROM base AS runner
#WORKDIR /app
#
#ENV NODE_ENV=production
#ENV NEXT_TELEMETRY_DISABLED=1
#
#RUN npm install prisma@5.21.1
#
#RUN addgroup --system --gid 1001 nodejs
#RUN adduser --system --uid 1001 nextjs
#
#RUN mkdir .next && mkdir db
#RUN chown nextjs:nodejs .next
#RUN chown nextjs:nodejs db
#
#COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
#COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
#COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
#COPY --from=builder --chown=nextjs:nodejs /app/db ./db
#COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
#
#USER nextjs
#
#EXPOSE 3000
#
#ENV PORT=3000
#
#CMD ["npm", "run", "start:production"]
