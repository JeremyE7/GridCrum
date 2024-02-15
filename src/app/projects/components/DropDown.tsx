
import DeleteIcon from '@/app/components/DeleteIcon'
import styles from './css/dropdown.module.css'
import AddIcon from '@/app/components/AddIcon'
import EditIcon from '@/app/components/EditIcon'
import Divider from '@/app/components/Divider'
import AddTagIcon from '@/app/components/AddTagIcon'
import React from 'react'
import { useModalsStore } from '@/app/utils/store/ModalsStore'
import { useProjects } from '@/app/hooks/useProyects'
import { useRouter } from 'next/navigation'

export default function DropDown (): JSX.Element {
  const { openModal, modalAddUserTag, modalAddProject } = useModalsStore()
  const { getTags } = useProjects()
  const router = useRouter()

  const handleShowAddUserTagModal = (): void => {
    openModal(modalAddUserTag.current)
  }

  const handleShowAddProjectModal = (): void => {
    getTags().then(() => {
      openModal(modalAddProject.current)
    })
  }

  const handleCloseSesion = (): void => {
    console.log('Cerrar Sesión')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
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
            <button onClick={handleShowAddProjectModal}><AddIcon /> Nuevo Proyecto</button>
          </li>
          <li>
            <button><DeleteIcon />Eliminar Proyecto</button>
          </li>
          <li>
            <button><EditIcon /> Editar Proyecto</button>
          </li>
          <Divider />
          <li>
            <button onClick={handleCloseSesion}>Cerrar Sesión</button>
          </li>
        </ul>
      </nav>
    </>
  )
}
