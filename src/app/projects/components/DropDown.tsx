
import DeleteIcon from '@/app/components/DeleteIcon'
import styles from './css/dropdown.module.css'
import AddIcon from '@/app/components/AddIcon'
import EditIcon from '@/app/components/EditIcon'
import Divider from '@/app/components/Divider'
import AddTagIcon from '@/app/components/AddTagIcon'
import React from 'react'
import { useModalsStore } from '@/app/utils/store/ModalsStore'

export default function DropDown (): JSX.Element {
  const { openModal, modalAddUserTag } = useModalsStore()

  const handleShowAddUserTagModal = (): void => {
    openModal(modalAddUserTag.current)
  }
  return (
    <>
      <nav className={styles.dropdown}>
        <ul>
          <li>
            <button onClick={handleShowAddUserTagModal}><AddTagIcon /> Nuevo tag</button>
          </li>
          <Divider />
          <li>
            <button><AddIcon /> Nuevo Proyecto</button>
          </li>
          <li>
            <button><DeleteIcon />Eliminar Proyecto</button>
          </li>
          <li>
            <button><EditIcon /> Editar Proyecto</button>
          </li>
        </ul>
      </nav>
    </>
  )
}
