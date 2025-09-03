import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // A porta do backend NestJS, se fosse um serviço em produção, estaria no .env
})

// Rota para buscar todas as notificações, com filtro opcional de status
export const getNotifications = async (status) => {
  const response = await api.get('/notifications', {
    params: { status },
  })
  return response.data
}

// Rota para buscar UMA notificação pelo ID
export const getNotificationById = async (id) => {
  const response = await api.get(`/notifications/${id}`)
  return response.data
}

// Rota para criar uma notificação
export const createNotification = async (data) => {
  const response = await api.post('/notifications', data)
  return response.data
}

export default api