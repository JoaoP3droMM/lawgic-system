import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  // Criando configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Lawgic - API de Notificações Judiciais')
    .setDescription('Documentação completa da API para o desafio técnico da Lawgic.')
    .setVersion('1.0')
    .addTag('Notifications')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe())
  
  // Aqui eu também poderia colocar env.PORT ao invés de inserir direto em código
  await app.listen(3000)
}

bootstrap()