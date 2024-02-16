import { useEffect } from 'react'
import { useProjectsStore } from '../utils/store/ProjectsStore'
import { createProjectTag, createProject, getUserTags, createSpring, createTask } from '../utils/ProjectsCrud'
import { getLocalStorage } from '../utils/DocEvents'
import { Project, Spring, Task } from '../types'

export interface Tag {
  _id: string
  name: string
  colorBackground: string
  colorText: string
}

export const useProjects = (): {
  projects: Project[]
  addProject: (project: Project) => void
  updateProjects: (projects: Project[], userId: string) => Promise<void>
  createTag: (tag: { name: string, colorBackground: string, colorText: string }) => Promise<{ msg: string, tag: any }>
  createProject: (project: Omit<Project, 'id' | 'userId' | 'user'>, userId: string) => Promise<{ msg: string, project: Project | null }>
  getTags: () => Promise<void>
  tags: Tag[]
  getProjects: (id: string) => Promise<void>
  addSpringProject: (spring: Omit<Spring, 'id' | 'tasks' | 'proyect'>) => Promise<{ msg: string | { error: string, message: string }, spring: Spring | null }>
  addTaskSpring: (task: Omit<Task, 'id' | 'spring' | 'board' | 'reminders' | 'tags' | 'items'>) => Promise<{ msg: string | { error: string, message: string }, task: Task | null }>
} => {
  // Recuperamos los métodos del store
  const { projects, getProjects, addProject, updateProjects, setTags, tags } = useProjectsStore()
  const user = getLocalStorage('user') ?? ''

  useEffect(() => {
    getProjects(user)
  }, [])

  const createTag = async (tag: { name: string, colorBackground: string, colorText: string }): Promise<{ msg: string, tag: any }> => {
    const tagAux = await createProjectTag(tag, user)
    return tagAux
  }

  const getTags = async (): Promise<void> => {
    const id = user
    const tags = await getUserTags(id)
    setTags(tags.tags) // Especificar el tipo para 'tags'
  }

  const addSpringProject = async (spring: Omit<Spring, 'id' | 'tasks' | 'proyect'>): Promise<{ msg: string, spring: Spring | null }> => {
    const springCreated = await createSpring(spring)
    await getProjects(user)

    return springCreated
  }

  const addTaskSpring = async (task: Omit<Task, 'id' | 'spring' | 'board' | 'reminders' | 'tags' | 'items'>): Promise<{ msg: string, task: Task | null }> => {
    const taskCreated = await createTask(task)
    await getProjects(user)
    return taskCreated
  }

  return { projects, addProject, updateProjects, createTag, createProject, getTags, tags, getProjects, addSpringProject, addTaskSpring }
}
