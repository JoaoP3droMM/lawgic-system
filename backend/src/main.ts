import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  
  // Aqui eu também poderia colocar env.PORT ao invés de inserir direto em código
  await app.listen(3000)
}

bootstrap()