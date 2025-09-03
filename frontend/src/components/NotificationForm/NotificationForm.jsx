import { useState, useEffect } from 'react'
import './NotificationForm.css'

export default function NotificationForm({ initialData, mode, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    data_audiencia: '',
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
      })
    } else {
      // Limpa o formulário para o modo 'create'
      setFormData({ titulo: '', descricao: '', data_audiencia: '' })
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