import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // A porta do backend NestJS, se fosse um serviço em produção, estaria no .env
})

// Define a "forma" de uma Notificação
export interface Notification {
  _id: string
  titulo: string
  descricao: string
  data_audiencia: string
  nome_notificado: string
  status: string
  createdAt: string
  updatedAt: string
}

// Rota para buscar todas as notificações, com filtro opcional de status
export const getNotifications = async (status?: string): Promise<Notification[]> => {
  const response = await api.get('/notifications', {
    params: { status },
  })
  return response.data
}

export default api