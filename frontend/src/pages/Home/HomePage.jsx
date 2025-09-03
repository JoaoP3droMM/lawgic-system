import { useState, useEffect } from 'react'
import CustomCheckBox from '../../components/CustomCheckBox'
import NotificationForm from '../../components/NotificationForm/NotificationForm'
import Modal from '../../components/Modal/Modal'
import { getNotifications, getNotificationById, createNotification } from '../../services/api'

import './HomePage.css'

export default function HomePage() {
  const [notifications, setNotifications] = useState([])
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Estados para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [refetchTrigger, setRefetchTrigger] = useState(false)

  // Faz a busca pelos dados na API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Passa o filtro selecionado para a função da API.
        const data = await getNotifications(selectedFilter)
        setNotifications(data)

      } catch (err) {
        setError('Falha ao buscar as notificações. Verifique se o backend está rodando.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [refetchTrigger, selectedFilter])

  const handleCreateClick = () => {
    setModalMode('create')
    setSelectedNotification(null)
    setIsModalOpen(true)
  }

  const handleViewClick = async (id) => {
    try {
      const data = await getNotificationById(id)
      setModalMode('view')
      setSelectedNotification(data)
      setIsModalOpen(true)
    } catch (err) {
      alert('Erro ao buscar detalhes da notificação.')
      console.error(err)
    }
  }

  const handleFormSubmit = async (e, formData) => {
    e.preventDefault()
    try {
      await createNotification(formData)
      setIsModalOpen(false)
      setRefetchTrigger(prev => !prev)
    } catch (err) {
      alert('Erro ao criar notificação.')
      console.error(err)
    }
  }

  const handleFilterChange = (filter) => {
    setSelectedFilter((prev) => (prev === filter ? null : filter))
  }

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('pt-BR')

  // Função para renderizar a tabela para cada condição
  const renderTableContent = () => {
    if (isLoading) return <tr><td colSpan={4} className='message-cell'>Carregando...</td></tr>
    if (error) return <tr><td colSpan={4} className='message-cell error-cell'>{error}</td></tr>
    if (notifications.length === 0) return <tr><td colSpan={4} className='message-cell'>Nenhuma notificação encontrada.</td></tr>

    return notifications.map((notification) => (
      <tr key={notification._id}>
        <td>{notification.titulo}</td>
        <td>{notification.descricao}</td>
        <td>{notification.nome_notificado || '---'}</td>
        <td>
          <span className={`status-badge status-${notification.status.toLowerCase()}`}>
            {notification.status.replace('_', ' ')}
          </span>
        </td>
        <td>{formatDate(notification.data_audiencia)}</td>
        <td>
          <button className='action-button' onClick={() => handleViewClick(notification._id)}>Visualizar</button>
        </td>
      </tr>
    ))
  }


  return (
    <div className='home-container'>
      <header className='header-section'>
        <h1>Notificações Judiciais</h1>
        <button className='create-button' onClick={handleCreateClick}>
          {/* SVG para o ícone de 'criar' */}
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M12 5v14M5 12h14'></path></svg>
          Criar Nova Notificação
        </button>
      </header>

      <div className='filter-bar'>
        <div className='filter-group'>
            {/* SVG para o ícone de filtro */}
            <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3'></polygon></svg>
            <span>Filtros</span>
        </div>
        <div className='filter-group'>
          <CustomCheckBox checked={selectedFilter === 'EM_ANDAMENTO'} onChange={() => handleFilterChange('EM_ANDAMENTO')} />
          <label htmlFor='em-andamento'>Em andamento</label>
        </div>
        <div className='filter-group'>
          <CustomCheckBox checked={selectedFilter === 'VALIDACAO'} onChange={() => handleFilterChange('VALIDACAO')} />
          <label htmlFor='validacao'>Validação</label>
        </div>
        <div className='filter-group'>
          <CustomCheckBox checked={selectedFilter === 'CONCLUIDO'} onChange={() => handleFilterChange('CONCLUIDO')} />
          <label htmlFor='concluido'>Concluído</label>
        </div>
      </div>

      <main>
        <table className='notifications-table'>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Notificado (Nome)</th>
              <th>Status</th>
              <th>Data da Audiência</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {renderTableContent()}
          </tbody>
        </table>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NotificationForm
          mode={modalMode}
          initialData={selectedNotification}
          onSubmit={handleFormSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}