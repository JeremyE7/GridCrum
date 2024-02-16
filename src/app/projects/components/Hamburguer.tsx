'use client'

import { addKeyEscapeListener } from '@/app/utils/DocEvents'
import styles from './css/dropdown.module.css'
import DropDown from './DropDown'
import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { useModalsStore } from '@/app/utils/store/ModalsStore'
import CreateProjectModal from './CreateProjectModal'
import AddSpring from './AddSpringModal'
import AddUserTagsModal from './AddUserTagsModal'
import AddTask from './AddTaskModal'
import AddItem from './AddItemModal'

export default function Hamburguer (): JSX.Element {
  const hamburguerRef = useRef<HTMLLabelElement>(null)
  // Cerrar el menu al presionar la tecla escape
  addKeyEscapeListener(() => {
    const checkbox = document.querySelector('input[type="checkbox"]') as HTMLInputElement
    checkbox.checked = false
  })

  useOnClickOutside(hamburguerRef, () => {
    const checkbox = document.querySelector('input[type="checkbox"]') as HTMLInputElement
    checkbox.checked = false
  })

  const { modalAddUserTag, modalAddProject, modalAddSpring, modalAddTask, modalAddItem } = useModalsStore()

  return (
    <>
      <label className={styles.hamburger} ref={hamburguerRef} htmlFor='hamburguer-checkbox'>
        <input type='checkbox' id='hamburguer-checkbox' />
        <svg viewBox='0 0 32 32'>
          <path className={styles.line + ' ' + styles.lineTopBottom} d='M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22' />
          <path className={styles.line} d='M7 16 27 16' />
        </svg>
        <DropDown />
      </label>
      <AddSpring dialogRef={modalAddSpring} />
      <AddUserTagsModal dialogRef={modalAddUserTag} />
      <CreateProjectModal dialogRef={modalAddProject} />
      <AddTask dialogRef={modalAddTask} />
      <AddItem dialogRef={modalAddItem} />
    </>
  )
}
