import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PollApp API')
    .setDescription('Documentação da API PollApp')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const expressInstance = app.getHttpAdapter().getInstance();
  const path = require('path');
  expressInstance.set('views', path.join(process.cwd(), 'src', 'views'));
  expressInstance.set('view engine', 'hbs');
  expressInstance.use(
    '/public',
    express.static(path.join(process.cwd(), 'public')),
  );

  expressInstance.get('/', (req, res) => {
    res.render('index', { version: '1.0' });
  });

  app.enableCors({
    origin: 'http://localhost:5173', // ou use '*' para liberar para todos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log(`App running at http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();
