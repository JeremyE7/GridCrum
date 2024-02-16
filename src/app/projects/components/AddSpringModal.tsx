import { useRef } from 'react'
import styles from './css/modal.module.css'
import { useOnClickOutside } from 'usehooks-ts'
import { useProjects } from '@/app/hooks/useProyects'
import { Toaster, toast } from 'sonner'
import { useParams } from 'next/navigation'
import { Spring } from '@/app/types'

export default function AddSpring ({ dialogRef }: {
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>
}): JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { projects, addSpringProject } = useProjects()
  const { id } = useParams()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const project = projects.find(project => project.id.toString() === id.toString())

    console.log(project)

    const form = e.currentTarget
    const name = (form.name as unknown as HTMLInputElement).value
    console.log(name)
    const description = form.description.value
    const startDate = form.startDate.value
    const endDate = form.endDate.value
    const state = form.state.value
    const spring: Omit<Spring, 'proyect' | 'tasks' | 'id'> = {
      name,
      description,
      startDate,
      endDate,
      state,
      proyectId: Number(id)
    }
    addSpringProject(spring).then((res) => {
      if (typeof res.msg === 'string') {
        toast.success(res.msg)
      } else {
        toast.error(res.msg.message)
      }
    }).finally(() => {
      closeModal()
      form.reset()
    })
  }

  const closeModal = (): void => {
    dialogRef.current?.close()
  }

  useOnClickOutside(sectionRef, () => {
    closeModal()
  })

  return (
    <>
      <dialog ref={dialogRef} className={styles.addProjectTagModel}>
        <section ref={sectionRef}>
          <h1>Añadir un nuevo spring para tu proyecto</h1>
          <form action='submit' onSubmit={handleSubmit}>
            <fieldset>
              <legend>Datos del nuevo spring</legend>
              <label htmlFor='name'>Nombre del spring</label>
              <input type='text' id='name' required />
              <label htmlFor='description'>Descripción</label>
              <textarea id='description' required />
              <label htmlFor='startDate'>Fecha de inicio</label>
              <input type='date' id='startDate' required />
              <label htmlFor='endDate'>Fecha de finalización</label>
              <input type='date' id='endDate' required />
              <label htmlFor='state'>Estado</label>
              <select id='state' required>
                <option value='inProgress'>En progreso</option>
                <option value='finished'>Finalizado</option>
                <option value='canceled'>Cancelado</option>
              </select>
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
