'use client'
// import DeleteIcon from '@/app/components/DeleteIcon'
import styles from './css/dropdown.module.css'
// import EditIcon from '@/app/components/EditIcon'
import Divider from '@/app/components/Divider'
import React from 'react'
import { useModalsStore } from '@/app/utils/store/ModalsStore'
import { useProjects } from '@/app/hooks/useProyects'
import { useParams } from 'next/navigation'
import { IoIosAdd } from 'react-icons/io'
import { ImExit } from 'react-icons/im'
import { MdAddComment, MdPlaylistAdd } from 'react-icons/md'
import { AiOutlineFileAdd } from 'react-icons/ai'

export default function DropDown (): JSX.Element {
  const { openModal, modalAddUserTag, modalAddProject, modalAddSpring, modalAddTask, modalAddItem } = useModalsStore()
  const { getTags } = useProjects()
  const { id, taskId } = useParams()

  const handleShowAddUserTagModal = (): void => {
    openModal(modalAddUserTag.current)
  }

  const handleShowAddProjectModal = (): void => {
    getTags().then(() => {
      openModal(modalAddProject.current)
    })
  }

  const handleShowAddSpringModal = (): void => {
    console.log('Añadir Spring', modalAddSpring.current)

    openModal(modalAddSpring.current)
  }

  const handleShowAddTaskModal = (): void => {
    openModal(modalAddTask.current)
  }

  const handleShowAddItemModal = (): void => {
    openModal(modalAddItem.current)
  }

  const handleCloseSesion = (): void => {
    console.log('Cerrar Sesión')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  return (
    <>
      <nav className={styles.dropdown}>
        <ul>
          <li>
            <button onClick={handleShowAddUserTagModal}><MdAddComment size={70} /> Nuevo tag</button>
          </li>
          <Divider />
          <li>
            <button onClick={handleShowAddProjectModal}><IoIosAdd size={70} /> Nuevo Proyecto</button>
          </li>
          {/* <li>
            <button><DeleteIcon />Eliminar Proyecto</button>
          </li>
          <li>
            <button><EditIcon /> Editar Proyecto</button>
          </li> */}
          {id !== undefined && (
            <>
              <Divider />
              <li>
                <button onClick={handleShowAddSpringModal}><MdPlaylistAdd size={70} /> Añadir Spring</button>
              </li>
              <Divider />
              <li>
                <button onClick={handleShowAddTaskModal}><AiOutlineFileAdd size={70} /> Añadir Tarea</button>
              </li>
            </>

          )}
          {taskId !== undefined && (
            <>
              <Divider />
              <li>
                <button onClick={handleShowAddItemModal}><MdPlaylistAdd size={70} /> Añadir Item</button>
              </li>
            </>
          )}
          <Divider />
          <li>
            <button onClick={handleCloseSesion}><ImExit size={70} /> Cerrar Sesión</button>
          </li>
        </ul>
      </nav>
    </>
  )
}
