import { IsBoolean, IsNotEmpty } from 'class-validator'

export class ValidateNotificationDto {
    @IsBoolean()
    @IsNotEmpty()
    needs_more_info: boolean
}