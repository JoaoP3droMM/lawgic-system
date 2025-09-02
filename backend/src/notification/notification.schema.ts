import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { NotificationStatus } from './notification_status.enum'

// Define o tipo do documento
export type NotificationDocument = HydratedDocument<Notification>

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  titulo: string

  @Prop({ required: true })
  descricao: string

  @Prop({ required: true })
  data_audiencia: Date

  @Prop({ required: false })
  nome_notificado: string

  @Prop({ required: false })
  email_notificado: string

  @Prop({ required: false })
  telefone_notificado: string

  @Prop({ required: false })
  endereco_notificado: string

  @Prop({
    type: String,
    enum: NotificationStatus,
    default: NotificationStatus.EM_ANDAMENTO,
  })

  status: NotificationStatus

}

export const NotificationSchema = SchemaFactory.createForClass(Notification)