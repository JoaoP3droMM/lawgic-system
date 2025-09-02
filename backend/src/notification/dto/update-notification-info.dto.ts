import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator'

export class UpdateNotifiedInfoDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    titulo: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    descricao: string

    @IsString()
    @IsNotEmpty()
    nome_notificado: string

    @IsEmail()
    @IsNotEmpty()
    email_notificado: string

    @IsString()
    @IsNotEmpty()
    telefone_notificado: string
    
    @IsString()
    @IsNotEmpty()
    endereco_notificado: string
}