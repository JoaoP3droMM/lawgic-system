import { Controller, Post, Body, Get, Param, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { NotificationStatus } from './notification_status.enum'
import { UpdateNotifiedInfoDto } from './dto/update-notification-info.dto'
import { ValidateNotificationDto } from './dto/validate-notification.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger'

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    // Criar a notificação
    @Post()
    @ApiOperation({ summary: 'Cria uma nova notificação judicial' })
    @ApiResponse({ status: 201, description: 'A notificação foi criada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
    @UsePipes(new ValidationPipe)
    create(@Body() createDto: CreateNotificationDto){
        return this.notificationService.create(createDto)
    }

    // Buscar todas as notificações, com busca por status opicional
    @Get()
    @ApiOperation({ summary: 'Lista todas as notificações com filtro opcional por status' })
    @ApiResponse({ status: 200, description: 'Lista de notificações retornada com sucesso.' })
    @ApiQuery({ name: 'status', required: false, enum: NotificationStatus })
    findAll(@Query('status') status?: NotificationStatus) {
        return this.notificationService.findAll(status)
    }

    // Buscar notificações por ID
    @Get(':id')
    @ApiOperation({ summary: 'Busca uma notificação específica por ID' })
    @ApiResponse({ status: 200, description: 'Notificação encontrada.' })
    @ApiResponse({ status: 404, description: 'Notificação não encontrada.' })
    @ApiParam({ name: 'id', description: 'O ID único da notificação' })
    findOne(@Param('id') id: string) {
        return this.notificationService.findOne(id)
    }

    // Atualizar com dados do notificado
    @Patch(':id/notified-info')
    @ApiOperation({ summary: 'Adiciona/atualiza dados do notificado e avança o status para "VALIDACAO"' })
    @ApiResponse({ status: 200, description: 'Notificação atualizada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
    @ApiResponse({ status: 404, description: 'Notificação com o ID fornecido não encontrada.' })
    @ApiParam({ name: 'id', description: 'O ID único da notificação' })
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
    @ApiOperation({ summary: 'Valida uma notificação, alterando seu status para "CONCLUIDO" ou "EM_ANDAMENTO"' })
    @ApiResponse({ status: 200, description: 'Notificação validada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados de entrada inválidos ou notificação não está no status de validação.' })
    @ApiResponse({ status: 404, description: 'Notificação com o ID fornecido não encontrada.' })
    @ApiParam({ name: 'id', description: 'O ID único da notificação' })
    @Patch(':id/validate')
    @UsePipes(new ValidationPipe())
    validate(
        @Param('id') id: string,
        @Body() validateDto: ValidateNotificationDto,
    ) {
        return this.notificationService.validate(id, validateDto)
    }
}
