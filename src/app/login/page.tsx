'use client'

import Link from 'next/link'
import styles from './page.module.css'
import AnimatedBackground from '../components/AnimatedBackground'
import { FormEvent } from 'react'
import { useUsers } from '../hooks/useUsers'
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { saveLocalStorage } from '../utils/DocEvents'

export default function Login (): JSX.Element {
  const { loginUser } = useUsers()
  const router = useRouter()

  function handleSubmit (event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const email = form.email.value
    const password = form.password.value
    loginUser({ email, password }).then((user) => {
      if (user.token === '') {
        toast.error('User or password incorrect')
      } else {
        toast.success(user.msg)
        saveLocalStorage(user.user?.id.toString() ?? '', 'user')
        form.reset()
        router.push('/projects')
      }
    })
  }

  return (
    <main className={styles.main}>
      <AnimatedBackground />
      <form action='submit' onSubmit={handleSubmit}>
        <fieldset>
          <legend>Login</legend>
          <label htmlFor='username'>Email</label>
          <input type='text' id='email' name='email' required />
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' required minLength={6} />
        </fieldset>
        <span>
          <Link href='/' className={styles.link}>Cancel</Link>
          <button type='submit'>Login</button>
        </span>
      </form>
      <Toaster richColors />
    </main>
  )
}
