import { useEffect, useRef, useState } from 'react'
import styles from './css/modal.module.css'
import { useProjects } from '@/app/hooks/useProyects'
import { Toaster, toast } from 'sonner'
import { getLocalStorage } from '@/app/utils/DocEvents'

export default function CreateProjectModal ({ dialogRef }: {
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>
}): JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { tags, createProject, getProjects } = useProjects()
  const selectedTags = Array<string>()

  const [tagList, setTagList] = useState(Array<{ value: any, label: any, color: any, colorText: any }>)
  useEffect(() => {
    const tagListAux = Array<{ value: any, label: any, color: any, colorText: any }>()

    tags.forEach((tag) => {
      tagListAux.push({ value: tag._id, label: tag.name, color: tag.colorBackground, colorText: tag.colorText })
    })
    setTagList(tagListAux)
  }, [tags])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    selectedTags.length = 0
    Array.from(e.target.selectedOptions).forEach((option) => {
      selectedTags.push(option.value)
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name') as string
    const description = data.get('description') as string
    const image = data.get('image') as string
    const tags = selectedTags
    const project = { name, description, image, tags, x: 0, y: 0, w: 2, h: 2, springs: [] }
    const userId = getLocalStorage('user') ?? ''
    createProject(project, userId).then((res) => {
      if (res.project !== null && res.project !== undefined) {
        toast.success('Proyecto creado correctamente')

        getProjects(userId)
        closeModal()
      } else {
        toast.error('Error al crear el proyecto')
      }
    })
  }

  const closeModal = (): void => {
    dialogRef.current?.close()
  }

  return (
    <>
      <dialog ref={dialogRef} className={styles.addProjectTagModel + ' ' + styles.modalBigger}>
        <section ref={sectionRef}>
          <h1>Añadir un nuevo proyecto</h1>
          <form action='submit' onSubmit={handleSubmit}>
            <fieldset>
              <legend>Datos del nuevo proyecto</legend>
              <label htmlFor='name'>Nombre</label>
              <input type='text' id='name' name='name' placeholder='Negocio, Tarea, Presentación.....' />
              <label htmlFor='description'>Descripción</label>
              <textarea id='description' name='description' placeholder='Este es un proyecto enfocado en.....' />
              <label htmlFor='image'>Imagen</label>
              <input type='text' id='image' name='image' placeholder='https://image/stock/.....' />
              {tagList.length > 0
                // eslint-disable-next-line operator-linebreak
                ?
                  <>
                    <label htmlFor='tags'>Tags</label>
                    <select id='tags' name='tags' multiple onChange={handleSelectChange}>
                      {tagList.map((tag, index) => {
                        return (
                          <option key={index} value={tag.value} style={{ backgroundColor: tag.color, color: tag.colorText }}>
                            {tag.label}
                          </option>
                        )
                      })}
                    </select>
                  </>
                : null}

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
