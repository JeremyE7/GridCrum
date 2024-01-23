import { useRef } from 'react'
import styles from '../page.module.css'
import { useOnClickOutside } from 'usehooks-ts'

export default function AddUserTagsModal ({ dialogRef }: {
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>
}): JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const { name, textColor, backgroundColor } = e.currentTarget.elements as unknown as {
      name: HTMLInputElement
      textColor: HTMLInputElement
      backgroundColor: HTMLInputElement
    }

    console.log(name.value, textColor.value, backgroundColor.value)
  }

  useOnClickOutside(sectionRef, () => {
    dialogRef.current?.close()
  })

  return (
    <dialog ref={dialogRef} className={styles.addProjectTagModel}>
      <section ref={sectionRef}>
        <h1>Añadir un nuevo tag para tu proyecto</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Datos del nuevo tag</legend>
            <label htmlFor='name'>Nombre</label>
            <input type='text' id='name' placeholder='Desarrollo, Personal, Empresarial......' />
            <label htmlFor='color'>Color de texto</label>
            <input type='color' id='textColor' />
            <label htmlFor='color'>Color de fondo</label>
            <input type='color' id='backgroundColor' />
          </fieldset>
          <button type='submit'>Añadir</button>

        </form>
      </section>
    </dialog>
  )
}
