import { useEffect, useRef } from 'react'

interface ModalProps {
  title: string
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ title, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    ref.current?.showModal()
  }, [])

  return (
    <dialog ref={ref} className="modal" onClose={onClose}>
      <header className="modal-header">
        <h2>{title}</h2>
        <button type="button" className="icon-button" onClick={() => ref.current?.close()}>
          &times;
        </button>
      </header>
      <div className="modal-body">{children}</div>
    </dialog>
  )
}
