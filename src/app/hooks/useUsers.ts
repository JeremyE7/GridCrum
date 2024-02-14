import { User } from '../types'
import { saveLocalStorage } from '../utils/DocEvents'
import { login, register } from '../utils/UserCrud'
import { useUserStore } from '../utils/store/userStore'

export const useUsers = (): { loginUser: (user: { email: string, password: string }) => Promise<{ msg: string, user: User | null, token: string }>, registerUser: (newUser: User) => Promise<{ msg: string, user: User } | { error: any }>, setUser: (user: User & { id: string }) => void, user: User & { id: string } } => {
  const { setUser, user } = useUserStore()
  const loginUser = async (user: { email: string, password: string }): Promise<{ msg: string, user: User | null, token: string }> => {
    const userLoged = await login(user)
    saveLocalStorage(userLoged.token, 'token')
    return { msg: userLoged.msg, user: userLoged.user, token: userLoged.token }
  }

  const registerUser = async (newUser: User): Promise<{ msg: string, user: User } | { error: any }> => {
    try {
      const userRegisted = await register(newUser)
      console.log(userRegisted)
      if (userRegisted.user === null) return { error: userRegisted.msg }
      return userRegisted
    } catch (error: any) {
      return { error }
    }
  }

  return { loginUser, registerUser, setUser, user }
}
