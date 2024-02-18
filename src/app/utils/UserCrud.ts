import { User } from '../types'

export async function register (newUser: { name: string, email: string, password: string }): Promise<{ msg: string, user: User, error?: string }> {
  const register = await fetch('http://localhost:3001/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })

  const registerUser = await register.json()
  return registerUser
}

export async function login (user: { email: string, password: string }): Promise<{ user: User, token: string, msg: string }> {
  const login = await fetch('http://localhost:3001/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  const loginUser = await login.json()
  return loginUser
}

export async function validateToken (token: string): Promise<{ user: User, msg: string }> {
  const validate = await fetch('http://localhost:3001/api/user/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    }
  })

  const validateUser = await validate.json()
  console.log('validateUser', validateUser)

  return validateUser
}
