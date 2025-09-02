import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Notification, NotificationDocument } from './notification.schema'

@Injectable()
export class NotificationService {
    constructor( @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument> ) {}

    // Criando uma notificação
    async create(createDto: any): Promise<Notification> {
        const createdNotification = new this.notificationModel(createDto)
        return createdNotification.save()
    }

    // Busca todas as notificações
    async findAll(): Promise<Notification[]> {
        return this.notificationModel.find().exec()
    }

    // Busca notificação por ID
    async findOne(id: string): Promise<Notification> {
        const notification = await this.notificationModel.findById(id).exec()

        if(!notification) {
            throw new NotFoundException(`Notificação de ID: "${id}" não encontrada`)
        }

        return notification
    }
}
