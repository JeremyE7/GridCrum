import { User } from '@/app/types'
import { create } from 'zustand'

interface UserStore {
  user: User & { id: string }
  setUser: (user: User & { id: string }) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: { name: '', email: '', password: '', id: '' },
  setUser: (user: User & { id: string }) => {
    set({ user })
    console.log(user)
  }

}))
