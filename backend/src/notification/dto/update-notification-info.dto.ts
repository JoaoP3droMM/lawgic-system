import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateNotifiedInfoDto {
    @ApiProperty({
        description: 'O título principal da notificação (opcional para edição)',
        example: 'Correção: Audiência de Custódia - Caso 456/25',
        required: false,
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    titulo: string

    @ApiProperty({
        description: 'Uma descrição detalhada da notificação (opcional para edição)',
        example: 'Correção na descrição da intimação.',
        required: false,
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    descricao: string

    @ApiProperty({
        description: 'O nome completo da pessoa a ser notificada',
        example: 'José Carlos Pereira',
    })
    @IsString()
    @IsNotEmpty()
    nome_notificado: string

    @ApiProperty({
        description: 'O endereço de e-mail da pessoa a ser notificada',
        example: 'jose.pereira@emailcliente.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email_notificado: string

    @ApiProperty({
        description: 'O número de telefone para contato do notificado',
        example: '21998877665',
    })
    @IsString()
    @IsNotEmpty()
    telefone_notificado: string
    
    @ApiProperty({
        description: 'O endereço completo do notificado para correspondência',
        example: 'Avenida Central, 45, Apartamento 101, Rio de Janeiro, RJ',
    })
    @IsString()
    @IsNotEmpty()
    endereco_notificado: string
}