type state = 'toDo' | 'inProgress' | 'done'
type typeOfItem = 'proyect' | 'spring' | 'task' | 'reminder' | 'img' | 'video' | 'audio' | 'link'

export interface User {
  name: string
  email: string
  password: string
}

export interface Item {
  id: number
  i: string
  x: number
  y: number
  w: number
  h: number
  minW?: number
  minH?: number
  type?: typeOfItem // Añadir type como propiedad común
}

export interface Proyect {
  id: number
  name: string
  description: string
  image: string
  tags: string[]
  spring?: Spring[]
}

interface Spring {
  id: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  state: state
  tasks?: Task[]
}

interface Task {
  id: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  state: state
  reminders: Reminder[]
  board: Board
  tags: string[]
}

interface Board {
  id: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  state: state
  items: Item[]
}

interface Reminder {
  id: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  state: state
}

interface Img {
  id: number
  name: string
  description: string
  url: string
}

interface Video {
  id: number
  name: string
  description: string
  url: string
}

interface Audio {
  id: number
  name: string
  description: string
  url: string
}

interface Link {
  id: number
  name: string
  description: string
  url: string
}

export type ProjectItem = {
  type: 'proyect' // Discriminante de tipo
  data: Proyect
} & Item

export type SpringItem = {
  type: 'spring' // Discriminante de tipo
  data: Spring
} & Item

export type TaskItem = {
  type: 'task' // Discriminante de tipo
  data: Task
} & Item

export type ReminderItem = {
  type: 'reminder' // Discriminante de tipo
  data: Reminder
} & Item

export type ImgItem = {
  type: 'img' // Discriminante de tipo
  data: Img
} & Item

export type VideoItem = {
  type: 'video' // Discriminante de tipo
  data: Video
} & Item
