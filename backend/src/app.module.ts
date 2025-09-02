// Em um projeto real, os dados de conexão com o banco estariam em um arquivo .env separado para maior segurança, aqui optei por deixar em código mesmo

import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { NotificationModule } from './notification/notification.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://lawgic_user:vsxPv61tQ63q9uue@lawgiccluster.dljynyj.mongodb.net/?retryWrites=true&w=majority&appName=lawgicCluster'),
    NotificationModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}