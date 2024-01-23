import { create } from 'zustand'

/**
 * Interface del store de modales
 */
interface ModalsStore {
  modalAddUserTag: React.MutableRefObject<HTMLDialogElement | null>

  openModal: (modal: HTMLDialogElement | null) => void
  closeModal: (modal: HTMLDialogElement | null) => void
}

export const useModalsStore = create<ModalsStore>((set) => ({
  modalAddUserTag: { current: null },

  openModal: (modal: HTMLDialogElement | null) => {
    modal?.showModal()
  },
  closeModal: (modal: HTMLDialogElement | null) => {
    modal?.close()
  }
}))
