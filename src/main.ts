import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as path from 'path';
import handlebars from 'handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
  );

  // Configura pasta de views e engine handlebars
    const fastify = app.getHttpAdapter().getInstance();
    await fastify.register(require('@fastify/view'), {
  engine: { handlebars },
  root: path.join(__dirname, 'views'),
  includeViewExtension: true,
});

  // Servir arquivos estáticos (imagens, favicon, css)
    await fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  // Rota inicial renderizando index.hbs
    fastify.get('/', (_req, reply) => {
  (reply as any).view('index.hbs', { version: '1.0' });
});

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();