import { ChangeEvent, useRef, useState } from 'react'
import styles from './css/modal.module.css'
import { useOnClickOutside } from 'usehooks-ts'
import { Toaster, toast } from 'sonner'
import { useParams } from 'next/navigation'
import { useItems } from '@/app/hooks/useItems'
import { getLocalStorage } from '@/app/utils/DocEvents'

export default function AddItem ({ dialogRef }: {
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>
}): JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { createNewItem } = useItems()
  const [itemType, setItemType] = useState('img')
  const { taskId } = useParams()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const userId = getLocalStorage('user') ?? ''
    const form = e.currentTarget
    const name = (form.name as unknown as HTMLInputElement).value
    const description = form.description.value
    const videoValue = form.video?.value
    const documentValue = form.document?.value
    const imgValue = form.img?.value

    if (itemType === 'video' && videoValue !== '') {
      createNewItem({
        taskId: Number(taskId),
        video: {
          id: 0,
          name,
          description,
          url: videoValue
        }
      },
      userId).then(res => {
        if (res.msg === 'Item creado') {
          toast.success('Item creado')
          closeModal()
        } else {
          toast.error('Error al crear el item')
        }
      })
    }

    if (itemType === 'document' && documentValue !== '') {
      createNewItem({
        taskId: Number(taskId),
        document: {
          id: 0,
          name,
          description,
          url: documentValue
        }
      },
      userId).then(res => {
        if (res.msg === 'Item creado') {
          toast.success('Item creado')
          closeModal()
        } else {
          toast.error('Error al crear el item')
        }
      })
    }

    if (itemType === 'img' && imgValue !== '') {
      createNewItem({
        taskId: Number(taskId),
        img: {
          id: 0,
          name,
          description,
          url: imgValue
        }
      },
      userId).then(res => {
        if (res.msg === 'Item creado') {
          toast.success('Item creado')
          closeModal()
          form.reset()
        } else {
          toast.error('Error al crear el item')
        }
      })
    }

    console.log('añadiendo item')
  }

  const closeModal = (): void => {
    dialogRef.current?.close()
  }

  useOnClickOutside(sectionRef, () => {
    closeModal()
  })

  function handleChange (event: ChangeEvent<HTMLSelectElement>): void {
    setItemType(event.currentTarget.value)
  }

  return (
    <>
      <dialog ref={dialogRef} className={styles.addProjectTagModel}>
        <section ref={sectionRef}>
          <h1>Añadir un nuevo item para tu tarea</h1>
          <form action='submit' onSubmit={handleSubmit}>
            <fieldset>
              <legend>Datos del nuevo item</legend>
              <label htmlFor='name'>Nombre del item</label>
              <input type='text' name='name' required />
              <label htmlFor='description'>Descripción del item</label>
              <textarea name='description' required />
              <label htmlFor='itemType'>Tipo de item</label>
              <select name='itemType' required onChange={handleChange} value={itemType}>
                <option value='video'>Video</option>
                <option value='document'>Document</option>
                <option value='img'>Image</option>
              </select>
              {itemType === 'video' && (
                <>
                  <label htmlFor='video'>URL del video</label>
                  <input type='url' name='video' required />
                </>
              )}
              {itemType === 'document' && (
                <>
                  <label htmlFor='document'>Documento</label>
                  <input type='url' name='document' required />
                </>
              )}
              {itemType === 'img' && (
                <>
                  <label htmlFor='img'>Imagen</label>
                  <input type='url' name='img' required />
                </>
              )}
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
