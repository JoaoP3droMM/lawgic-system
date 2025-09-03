import { useState, useEffect } from 'react'
import './NotificationForm.css'

export default function NotificationForm({ initialData, mode, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    data_audiencia: '',
    nome_notificado: '',
    email_notificado: '',
    telefone_notificado: '',
    endereco_notificado: '',
  })

  // Garante que modal seja preenchido quando estiver no modo view
  useEffect(() => {
    if (initialData) {
      const formattedDate = initialData.data_audiencia 
        ? new Date(initialData.data_audiencia).toISOString().split('T')[0] 
        : ''

      setFormData({
        titulo: initialData.titulo || '',
        descricao: initialData.descricao || '',
        data_audiencia: formattedDate,
        nome_notificado: initialData.nome_notificado || '',
        email_notificado: initialData.email_notificado || '',
        telefone_notificado: initialData.telefone_notificado || '',
        endereco_notificado: initialData.endereco_notificado || '',
      })
    } else {
      // Limpa o formulário para o modo 'create'
      setFormData({
        titulo: '',
        descricao: '',
        data_audiencia: '',
        nome_notificado: '',
        email_notificado: '',
        telefone_notificado: '',
        endereco_notificado: '',
      })
    }
  }, [initialData])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  
  const isViewMode = mode === 'view'

  return (
    <>
      <h2 className='form-title'>
        {isViewMode ? 'Detalhes da Notificação' : 'Criar Nova Notificação'}
      </h2>
      <form onSubmit={(e) => onSubmit(e, formData)} className='notification-form'>
        <div className='form-group'>
          <label htmlFor='titulo'>Título:</label>
          <input
            type='text'
            id='titulo'
            name='titulo'
            value={formData.titulo}
            onChange={handleFormChange}
            disabled={isViewMode}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='descricao'>Descrição:</label>
          <textarea
            id='descricao'
            name='descricao'
            value={formData.descricao}
            onChange={handleFormChange}
            rows='3'
            disabled={isViewMode}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='data_audiencia'>Data da audiência:</label>
          <input
            type='date'
            id='data_audiencia'
            name='data_audiencia'
            value={formData.data_audiencia}
            onChange={handleFormChange}
            disabled={isViewMode}
            required
          />
        </div>

        <hr className="form-divider" />
        <h3 className="form-subtitle">Dados do Notificado</h3>
        <div className='form-group'>
          <label htmlFor='nome_notificado'>Nome Completo:</label>
          <input 
            type='text' 
            id='nome_notificado' 
            name='nome_notificado' 
            value={formData.nome_notificado} 
            onChange={handleFormChange} 
            disabled={isViewMode} 
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email_notificado'>Email:</label>
          <input 
            type='email' 
            id='email_notificado' 
            name='email_notificado' 
            value={formData.email_notificado} 
            onChange={handleFormChange} 
            disabled={isViewMode} 
            required 
          />
        </div>
        <div className='form-group'>
          <label htmlFor='telefone_notificado'>Telefone:</label>
          <input 
            type='tel' 
            id='telefone_notificado' 
            name='telefone_notificado' 
            value={formData.telefone_notificado} 
            onChange={handleFormChange} 
            disabled={isViewMode} 
            required 
          />
        </div>
        <div className='form-group'>
          <label htmlFor='endereco_notificado'>Endereço Completo:</label>
          <textarea 
            id='endereco_notificado' 
            name='endereco_notificado' 
            value={formData.endereco_notificado} 
            onChange={handleFormChange} 
            rows='2' 
            disabled={isViewMode} 
            required 
          />
        </div>
        <div className='form-actions'>
          {!isViewMode && (
            <>
              <button type='button' className='button-cancel' onClick={onClose}>Cancelar</button>
              <button type='submit' className='button-save'>Salvar</button>
            </>
          )}
        </div>
      </form>
    </>
  )
}