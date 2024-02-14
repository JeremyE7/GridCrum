export interface User {
  id: number
  name: string
  email: string
  password: string
  projects: Project[]
  projectTags: ProjectTag[]
  taskTags: TaskTag[]
}

export interface ProjectTag {
  id: number
  name: string
  colorBackground: string
  colorText: string
  projectId?: number
  project?: Project
  userId: number
  user: User
}

export interface Project {
  id: number
  x: number
  y: number
  w: number
  h: number
  name: string
  description: string
  image: string
  springs: Spring[]
  tags: ProjectTag[] | string[]
  user: User
  userId: number
}

export interface Spring {
  id: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  state: string
  proyectId: number
  proyect: Project
  tasks: Task[]
}

export interface TaskTag {
  id: number
  name: string
  color: string
  taskId: number
  task: Task
  userId: number
  user: User
}

export interface Task {
  id: number
  x: number
  y: number
  w: number
  h: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  state: string
  springId: number
  spring: Spring
  board?: Board
  reminders: Reminder[]
  tags: TaskTag[]
}

export interface Reminder {
  id: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  state: string
  taskId: number
  task: Task
}

export interface Board {
  id: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  state: string
  items: Item[]
  task: Task
  taskId: number
}

export interface Item {
  id: number
  x: number
  y: number
  w: number
  h: number
  board: Board
  boardId: number
  imgId?: number
  videoId?: number
  audioId?: number
  linkId?: number
  link?: Link
  audio?: Audio
  video?: Video
  img?: Img
}

export interface Img {
  id: number
  name: string
  description: string
  url: string
  item?: Item
}

export interface Video {
  id: number
  name: string
  description: string
  url: string
  item?: Item
}

export interface Audio {
  id: number
  name: string
  description: string
  url: string
  item?: Item
}

export interface Link {
  id: number
  name: string
  description: string
  url: string
  item?: Item
}
