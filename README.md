# Poll App (NestJS + Fastify)


## Setup local


1. Copie `.env.example` para `.env` e ajuste DATABASE_URL
2. Instale dependências: `npm ci`
3. Gere client Prisma: `npx prisma generate`
4. Rode migração: `npx prisma migrate dev --name init`
5. Inicie app: `npm run start:dev`

Ou com Docker:
`docker-compose up --build`


Docs: http://localhost:3000/docs
WebSocket endpoint padrão: socket.io client conectando em http://localhost:3000