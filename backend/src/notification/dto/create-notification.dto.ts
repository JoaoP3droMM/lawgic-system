import { IsString, IsNotEmpty, IsDateString } from 'class-validator'

export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    titulo: string

    @IsString()
    @IsNotEmpty()
    descricao: string

    @IsDateString()
    @IsNotEmpty()
    data_audiencia: string
}