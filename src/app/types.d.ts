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
  name: string
  description: string
  startDate: Date
  endDate: Date
  state: string
  springId: number
  spring: Spring
  reminders: Reminder[]
  tags: TaskTag[]
  items: Item[]
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

export interface Item {
  id: number
  x: number
  y: number
  w: number
  h: number
  imgId?: number
  videoId?: number
  video?: Video
  img?: Img
  documentId?: number
  document?: DocumentType
  taskId: number
  task: Task
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

export interface DocumentType {
  id: number
  name: string
  description: string
  url: string
  item?: Item
}
