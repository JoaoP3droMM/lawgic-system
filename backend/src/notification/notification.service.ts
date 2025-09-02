import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Notification, NotificationDocument } from './notification.schema'
import { NotificationStatus } from './notification_status.enum'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { UpdateNotifiedInfoDto } from './dto/update-notification-info.dto'
import { ValidateNotificationDto } from './dto/validate-notification.dto'

@Injectable()
export class NotificationService {
    constructor( @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument> ) {}

    // Criando uma notificação
    async create(createDto: CreateNotificationDto): Promise<NotificationDocument> {
        const createdNotification = new this.notificationModel(createDto)
        return createdNotification.save()
    }

    // Buscar todas as notificações, com busca por status opicional
    async findAll(status?: NotificationStatus): Promise<NotificationDocument[]> {
        const query = status ? { status } : {}
        return this.notificationModel.find(query).exec()
    }

    // Busca notificação por ID
    async findOne(id: string): Promise<NotificationDocument> {
        const notification = await this.notificationModel.findById(id).exec()

        if(!notification) {
            throw new NotFoundException(`Notificação de ID: "${id}" não encontrada`)
        }

        return notification
    }

    // Atualiza com dados do notificado
    async updateNotifiedInfo(id: string, updateDto: UpdateNotifiedInfoDto): Promise<Notification> {
        const notification = await this.findOne(id)

        // Atualiza os campos do DTO
        Object.assign(notification, updateDto)
        notification.status = NotificationStatus.VALIDACAO

        return notification.save()
    }

    // Valida a notificação
    async validate(id: string, validateDto: ValidateNotificationDto): Promise<Notification> {
        const notification = await this.findOne(id)

        if (notification.status !== NotificationStatus.VALIDACAO) {
            throw new BadRequestException(`Notification is not in VALIDAÇÃO status.`)
        }

        if (validateDto.needs_more_info) {
            notification.status = NotificationStatus.EM_ANDAMENTO
        } else {
            notification.status = NotificationStatus.CONCLUIDO
        }

        return notification.save()
    }
}
