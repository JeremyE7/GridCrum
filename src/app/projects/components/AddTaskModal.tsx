import { ChangeEvent, useRef, useState } from 'react'
import styles from './css/modal.module.css'
import { useOnClickOutside } from 'usehooks-ts'
import { useProjects } from '@/app/hooks/useProyects'
import { Toaster, toast } from 'sonner'
import { useParams } from 'next/navigation'

export default function AddTask ({ dialogRef }: {
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>
}): JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { projects, addTaskSpring } = useProjects()
  const { id } = useParams()
  const [minMaxDate, setMinMaxDate] = useState({ min: '', max: '' })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log('creando tarea')
    const data = e.currentTarget
    const springId = data.springName.value
    const name = data.taskName.value
    const description = data.taskDescription.value
    const startDate = data.taskStartDate.value
    const endDate = data.taskEndDate.value
    const state = data.taskState.value
    const task = { springId, name, description, startDate, endDate, state }
    console.log(task)
    addTaskSpring(task).then(res => {
      if (typeof res.msg === 'string' && res.task !== null) {
        toast.success(res.msg)
        closeModal()
        data.reset()
      } else {
        if (typeof res.msg !== 'string') {
          toast.error(res.msg.message)
        }
      }
    })
  }

  const closeModal = (): void => {
    dialogRef.current?.close()
  }

  useOnClickOutside(sectionRef, () => {
    closeModal()
  })

  function handleChangeSpring (event: ChangeEvent<HTMLSelectElement>): void {
    const spring = projects?.find(project => project.id.toString() === id.toString())?.springs.find(spring => spring.id.toString() === event.target.value)
    if (spring != null) {
      const min = (spring.startDate as unknown as string).split('T')[0]
      const max = (spring.endDate as unknown as string).split('T')[0]
      setMinMaxDate({ min, max })
      console.log(minMaxDate)
    }
  }

  return (
    <>
      <dialog ref={dialogRef} className={styles.addProjectTagModel}>
        <section ref={sectionRef}>
          <h1>Añadir una nueva tarea a un spring para tu proyecto</h1>
          <form action='submit' onSubmit={handleSubmit}>
            <fieldset>
              <legend>Datos de la nueva tarea</legend>
              <label htmlFor='springName'>Nombre del spring</label>
              <select name='springName' id='springName' onChange={handleChangeSpring}>
                {id !== undefined && projects?.find(project => project.id.toString() === id.toString())?.springs?.map(spring => (
                  <option key={spring.id} value={spring.id}>{spring.name}</option>
                ))}
              </select>
              <label htmlFor='taskName'>Nombre de la Tarea</label>
              <input type='text' id='taskName' required />
              <label htmlFor='taskDescription'>Descripción de la tarea</label>
              <textarea id='taskDescription' required />
              <label htmlFor='taskStartDate'>Fecha de inicio</label>
              <input type='date' id='taskStartDate' required min={minMaxDate.min} max={minMaxDate.max} />
              <label htmlFor='taskEndDate'>Fecha de fin</label>
              <input type='date' id='taskEndDate' required min={minMaxDate.min} max={minMaxDate.max} />
              <label htmlFor='taskState'>Estado de la tarea</label>
              <select id='taskState' required>
                <option value='to-do'>To do</option>
                <option value='in-progress'>In progress</option>
                <option value='done'>Done</option>
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
