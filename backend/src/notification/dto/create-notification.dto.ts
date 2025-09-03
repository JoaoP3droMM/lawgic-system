import { IsString, IsNotEmpty, IsDateString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateNotificationDto {
    @ApiProperty({
        description: 'O título principal da notificação',
        example: 'Audiência de Custódia - Caso 789/25',
    })
    @IsString()
    @IsNotEmpty()
    titulo: string

    @ApiProperty({
        description: 'Uma descrição detalhada do conteúdo da notificação',
        example: 'Intimação para audiência referente ao processo de tutela.',
    })
    @IsString()
    @IsNotEmpty()
    descricao: string

    @ApiProperty({
        description: 'A data e hora da audiência no formato ISO 8601',
        example: '2025-11-20T10:30:00.000Z',
    })
    @IsDateString()
    @IsNotEmpty()
    data_audiencia: string
}