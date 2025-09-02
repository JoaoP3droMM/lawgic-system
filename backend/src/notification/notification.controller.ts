import { Controller, Post, Body, Get, Param, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { NotificationStatus } from './notification_status.enum'
import { UpdateNotifiedInfoDto } from './dto/update-notification-info.dto'
import { ValidateNotificationDto } from './dto/validate-notification.dto'

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    // Criar a notificação
    @Post()
    @UsePipes(new ValidationPipe)
    create(@Body() createDto: CreateNotificationDto){
        return this.notificationService.create(createDto)
    }

    // Buscar todas as notificações, com busca por status opicional
    @Get()
    findAll(@Query('status') status?: NotificationStatus) {
        return this.notificationService.findAll(status)
    }

    // Buscar notificações por ID
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.notificationService.findOne(id)
    }

    // Atualizar com dados do notificado
    @Patch(':id/notified-info')
    @UsePipes(new ValidationPipe())
    updateNotifiedInfo(
        @Param('id') id: string,
        @Body() updateDto: UpdateNotifiedInfoDto
    ) {
        return this.notificationService.updateNotifiedInfo(id, updateDto)
    }

    // Validar a notificação
    @Patch(':id/validate')
    @UsePipes(new ValidationPipe())
    validate(
        @Param('id') id: string,
        @Body() validateDto: ValidateNotificationDto,
    ) {
        return this.notificationService.validate(id, validateDto);
    }
}
