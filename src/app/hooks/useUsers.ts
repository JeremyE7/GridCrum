import { User } from '../types'
import { saveLocalStorage } from '../utils/DocEvents'
import { login, register } from '../utils/UserCrud'

export const useUsers = (): { loginUser: (user: { email: string, password: string }) => Promise<{ msg: string, user: User | null, token: string }>, registerUser: (newUser: { name: string, email: string, password: string }) => Promise<{ msg: string, user: User } | { error: any }> } => {
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

  return { loginUser, registerUser }
}
