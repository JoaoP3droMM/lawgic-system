import { IsBoolean, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ValidateNotificationDto {
    @ApiProperty({
        description:
        'Indica o resultado da validação. `false` aprova e conclui a notificação. `true` a rejeita e a retorna para o status "EM_ANDAMENTO" para correção.',
        example: false,
    })
    @IsBoolean()
    @IsNotEmpty()
    needs_more_info: boolean
}