import { useEffect } from 'react'
import { useProjectsStore } from '../utils/store/ProjectsStore'
import { createProjectTag, createProject, getUserTags } from '../utils/ProjectsCrud'
import { getLocalStorage } from '../utils/DocEvents'
import { Project } from '../types'

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

  return { projects, addProject, updateProjects, createTag, createProject, getTags, tags, getProjects }
}
