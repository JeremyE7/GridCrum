import { User } from '../types'
import { saveLocalStorage } from '../utils/DocEvents'
import { login, register, validateToken } from '../utils/UserCrud'

export const useUsers = (): {
  loginUser: (user: { email: string, password: string }) => Promise<{ msg: string, user: User | null, token: string }>
  registerUser: (newUser: { name: string, email: string, password: string }) => Promise<{ msg: string, user: User } | { error: any }>
  validateUser: (token: string | null) => Promise<{ user: User | null, msg: string }>
} => {
  const loginUser = async (user: { email: string, password: string }): Promise<{ msg: string, user: User | null, token: string }> => {
    const userLoged = await login(user)
    if (userLoged.token === undefined) return { msg: userLoged.msg, user: null, token: '' }
    saveLocalStorage(userLoged.token, 'token')
    return { msg: userLoged.msg, user: userLoged.user, token: userLoged.token }
  }

  const registerUser = async (newUser: { name: string, email: string, password: string }): Promise<{ msg: string, user: User } | { error: any }> => {
    try {
      const userRegisted = await register(newUser)
      if (userRegisted.user === null) return { error: userRegisted.msg }
      return userRegisted
    } catch (error: any) {
      return { error }
    }
  }

  const validateUser = async (token: string | null): Promise<{ user: User | null, msg: string }> => {
    if (token === null) return { user: null, msg: 'Token not found' }
    const res = await validateToken(token)
    if (res.user === null) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    return res
  }

  return { loginUser, registerUser, validateUser }
}
