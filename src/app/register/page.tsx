'use client'
import Link from 'next/link'
import styles from './page.module.css'
import AnimatedBackground from '../components/AnimatedBackground'
import { useUsers } from '../hooks/useUsers'
import { Toaster, toast } from 'sonner'
import { useState } from 'react'
import Loading from '../components/Loading'
import { useRouter } from 'next/navigation'

export default function Register (): JSX.Element {
  const { registerUser } = useUsers()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const username = data.get('username')
    const email = data.get('email')
    const password = data.get('password')
    registerUser({ name: username as string, email: email as string, password: password as string }).then((data) => {
      if ('error' in data) {
        console.log(data.error)
        toast.error(data.error)
      } else {
        toast.success('Usuario registrado')
        form.reset()
        router.push('/')
      }
    }).finally(() => setLoading(false))
    setLoading(true)
  }
  return (
    <main className={styles.main}>
      <AnimatedBackground />
      <form action='submit' onSubmit={handleSubmit} className={styles.addProjectTagModal}>
        <fieldset>
          <legend>Register</legend>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' required />
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' required />
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' required minLength={6} />
        </fieldset>
        <span>
          <Link href='/' className={styles.link}>Cancel</Link>
          <button type='submit'>Register</button>
        </span>
      </form>
      <Toaster
        richColors toastOptions={{
          style: {
            backgroundColor: 'var(--primary-ts)'
          }
        }}
      />
      {loading && <Loading />}
    </main>
  )
}
