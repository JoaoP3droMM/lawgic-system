import { useState, useEffect } from 'react'
import { validateEmail, validatePhone } from '../../utils/validators'
import applyPhoneMask from '../../utils/mask'

import './NotificationForm.css'

export default function NotificationForm({ initialData, mode, onSubmit, onClose, onValidate }) {
  const [formData, setFormData] = useState({})
  const [formErrors, setFormErrors] = useState({})

  // Garante que modal seja preenchido quando estiver no modo view
  useEffect(() => {
      if (initialData) {
        const formattedDate = initialData.data_audiencia 
          ? new Date(initialData.data_audiencia).toISOString().split('T')[0] 
          : ''
        setFormData({ ...initialData, data_audiencia: formattedDate })
      } else {
        setFormData({ titulo: '', descricao: '', data_audiencia: '' })
      }
    }, [initialData, mode])

  const handleFormChange = (e) => {
    const { name, value } = e.target

    if (name === 'telefone_notificado') {
      // Se o campo for o de telefone, aplica a máscara
      const maskedValue = applyPhoneMask(value)
      setFormData((prev) => ({ ...prev, [name]: maskedValue }))
    } else {
      // Para todos os outros campos, o comportamento é o normal
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Centraliza a lógica de validação
  const validate = () => {
    const errors = {}

    if (!formData.titulo) errors.titulo = 'O título é obrigatório.'
    if (!formData.descricao) errors.descricao = 'A descrição é obrigatória.'
    if (!formData.data_audiencia) errors.data_audiencia = 'A data é obrigatória.'

    // Validações específicas do notificado
    if (mode === 'updateInfo' || mode === 'create') {
      if (formData.nome_notificado !== undefined) { // Valida campos do notificado apenas se estiverem sendo editados
        if (!formData.nome_notificado) errors.nome_notificado = 'O nome é obrigatório.'
        if (!validateEmail(formData.email_notificado)) errors.email_notificado = 'Email inválido.'
        if (!validatePhone(formData.telefone_notificado)) errors.telefone_notificado = 'Telefone inválido. Use (XX) 9XXXX-XXXX.'
        if (!formData.endereco_notificado) errors.endereco_notificado = 'O endereço é obrigatório.'
      }
    }

    setFormErrors(errors)
    // Retorna true se não houver erros, e false se houver
    return Object.keys(errors).length === 0
  }

  // Valida os dados antes de enviar
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(e, formData)
    }
  }
  
  const isReadOnly = mode === 'validate' || mode === 'view'
  const isCreateMode = mode === 'create'

  return (
    <>
      <h2 className='form-title'>
        {mode === 'create' && 'Criar Nova Notificação (Etapa 1)'}
        {mode === 'updateInfo' && 'Preencher Dados do Notificado (Etapa 2)'}
        {mode === 'validate' && 'Validar Notificação (Etapa 3)'}
        {mode === 'view' && 'Detalhes da Notificação'}
      </h2>
      <form onSubmit={handleSubmit} className='notification-form'>
        {/* Etapa 1: Campos iniciais */}
        <div className='form-group'>
          <label htmlFor='titulo'>Título:</label>
          <input type='text' id='titulo' name='titulo' value={formData.titulo || ''} onChange={handleFormChange} disabled={isReadOnly} required className={formErrors.titulo ? 'input-error' : ''} />
          {formErrors.titulo && <span className="error-message">{formErrors.titulo}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='descricao'>Descrição:</label>
          <textarea id='descricao' name='descricao' value={formData.descricao || ''} onChange={handleFormChange} rows='3' disabled={isReadOnly} required className={formErrors.descricao ? 'input-error' : ''} />
          {formErrors.descricao && <span className="error-message">{formErrors.descricao}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='data_audiencia'>Data da audiência:</label>
          <input type='date' id='data_audiencia' name='data_audiencia' value={formData.data_audiencia || ''} onChange={handleFormChange} disabled={isReadOnly} required className={formErrors.data_audiencia ? 'input-error' : ''} />
          {formErrors.data_audiencia && <span className="error-message">{formErrors.data_audiencia}</span>}
        </div>

        {/* Etapa 2: Campos do Notificado (renderizados condicionalmente) */}
        {(mode === 'updateInfo' || mode === 'validate' || mode === 'view') && (
          <>
            <hr className='form-divider' />
            <h3 className='form-subtitle'>Dados do Notificado</h3>
            <div className='form-group'>
              <label htmlFor='nome_notificado'>Nome Completo:</label>
              <input type='text' id='nome_notificado' name='nome_notificado' value={formData.nome_notificado || ''} onChange={handleFormChange} disabled={isReadOnly} required className={formErrors.nome_notificado ? 'input-error' : ''} />
              {formErrors.nome_notificado && <span className="error-message">{formErrors.nome_notificado}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='email_notificado'>Email:</label>
              <input type='email' id='email_notificado' name='email_notificado' value={formData.email_notificado || ''} onChange={handleFormChange} disabled={isReadOnly} required className={formErrors.email_notificado ? 'input-error' : ''} />
              {formErrors.email_notificado && <span className="error-message">{formErrors.email_notificado}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='telefone_notificado'>Telefone:</label>
              <input type='tel' id='telefone_notificado' name='telefone_notificado' placeholder="(XX) 9XXXX-XXXX" value={formData.telefone_notificado || ''} onChange={handleFormChange} disabled={isReadOnly} required maxLength={15} className={formErrors.telefone_notificado ? 'input-error' : ''} />
              {formErrors.telefone_notificado && <span className="error-message">{formErrors.telefone_notificado}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='endereco_notificado'>Endereço Completo:</label>
              <textarea id='endereco_notificado' name='endereco_notificado' value={formData.endereco_notificado || ''} onChange={handleFormChange} rows='2' disabled={isReadOnly} required className={formErrors.endereco_notificado ? 'input-error' : ''} />
              {formErrors.endereco_notificado && <span className="error-message">{formErrors.endereco_notificado}</span>}
            </div>
          </>
        )}
        
        {/* Botões de Ação */}
        <div className='form-actions'>
          {(isCreateMode || mode === 'updateInfo') && (
            <>
              <button type='button' className='button-cancel' onClick={onClose}>Cancelar</button>
              <button type='submit' className='button-save'>Salvar e Continuar</button>
            </>
          )}

          {mode === 'validate' && (
            <>
              <button type='button' className='button-cancel' onClick={() => onValidate(true)}>Rejeitar (Pedir Ajustes)</button>
              <button type='button' className='button-save' onClick={() => onValidate(false)}>Aprovar Notificação</button>
            </>
          )}
        </div>
      </form>
    </>
  )
}