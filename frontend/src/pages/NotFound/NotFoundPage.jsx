import { useNavigate } from 'react-router-dom'
import './NotFoundPage.css'

export default function PageNotFound() {
  const navigate = useNavigate()

  return (
    <div className="page-not-found">
      <title>Lawgic System</title>
      <div className="rocket">🚀</div>
      <h1 className="title">404 - Página não encontrada</h1>
      <p className="description">
        Opa! Parece que você tentou acessar algo que não existe.
        Não se preocupe, vamos te levar de volta para o início!
      </p>
      <button
        onClick={() => navigate('/home')}
        className="back-button"
      >
        Voltar para Home
      </button>
    </div>
  )
}