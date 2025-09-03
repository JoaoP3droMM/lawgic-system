import './Modal.css'

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <header className='modal-header'>
          <button className='close-button' onClick={onClose}>X</button>
        </header>
        <hr className='modal-divider' />
        <main className='modal-body'>
          {children}
        </main>
      </div>
    </div>
  )
}