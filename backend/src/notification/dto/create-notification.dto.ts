import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({ example: 'Audiência de Custódia - Caso 789/25' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 'Intimação para audiência referente ao processo de tutela.' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: '2025-11-20' })
  @IsDateString()
  @IsNotEmpty()
  data_audiencia: string;
}