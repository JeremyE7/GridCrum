import { useRef } from 'react'
import styles from './css/modal.module.css'
import { useOnClickOutside } from 'usehooks-ts'
import { useProjects } from '@/app/hooks/useProyects'
import { Toaster, toast } from 'sonner'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

export default function CreateProjectModal ({ dialogRef }: {
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>
}): JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { createProject, getTags } = useProjects()
  const animatedComponents = makeAnimated()

  const tagList: Array<{ value: any, label: any, color: any, colorText: any }> = []
  getTags().then((tags) => {
    tags.tags.forEach((tag: { _id: any, name: any, colorBackground: string, colorText: string }) => {
      tagList.push({ value: tag._id, label: tag.name, color: tag.colorBackground, colorText: tag.colorText })
    })
  })

  const customStyles = {
    option: (provided: any, state: { data: { color: any, colorText: any } }) => ({
      ...provided,
      backgroundColor: state.data.color, // Usa el color especificado en el objeto de opciones
      color: state.data.colorText
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
  }

  const closeModal = (): void => {
    dialogRef.current?.close()
  }

  const portalTarget = document.body // Elige el elemento donde deseas renderizar el menú

  return (
    <>
      <dialog ref={dialogRef} className={styles.addProjectTagModel + ' ' + styles.modalBigger}>
        <section ref={sectionRef}>
          <h1>Añadir un nuevo proyecto</h1>
          <form action='submit' onSubmit={handleSubmit}>
            <fieldset>
              <legend>Datos del nuevo proyecto</legend>
              <label htmlFor='name'>Nombre</label>
              <input type='text' id='name' placeholder='Negocio, Tarea, Presentación.....' />
              <label htmlFor='description'>Descripción</label>
              <textarea id='description' placeholder='Este es un proyecto enfocado en.....' />
              <label htmlFor='image'>Imagen</label>
              <input type='text' id='image' placeholder='https://image/stock/.....' />
              <label htmlFor='tags'>Tags</label>
              <Select
                components={animatedComponents}
                options={tagList}
                styles={customStyles}
                menuPortalTarget={dialogRef}
              />
            </fieldset>
            <button type='button' className={styles.closeButton} onClick={closeModal}>Cancelar</button>
            <button type='submit'>Añadir</button>
          </form>
        </section>
      </dialog>
      <Toaster richColors />
    </>
  )
}
