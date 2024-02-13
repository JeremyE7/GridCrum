import { useEffect } from 'react'
import { useProjectsStore } from '../utils/store/ProjectsStore'
import { ProjectItem } from '../types'
import { createProjectTag, createProject, getUserTags } from '../utils/ProjectsCrud'
import { useUserStore } from '../utils/store/userStore'

/**
 * Hook para recuperar los proyectos del store
 * @returns
 * projects: ProjectItem[] Lista de Proyectos
 * addProject: (project: ProjectItem) => void Agrega un proyecto a la lista
 * updateProjects: (projects: ProjectItem[]) => void Actualiza la lista de proyectos
 */
export const useProjects = (): { projects: ProjectItem[], addProject: (project: ProjectItem) => void, updateProjects: (projects: ProjectItem[]) => void, createTag: (tag: { name: string, colorBackground: string, colorText: string }) => Promise<{ msg: string, tag: any }>, createProject: (project: ProjectItem, userId: string) => Promise<{ msg: string, project: ProjectItem | null }>, getTags: () => Promise<any> } => {
  // Recuperamos los metodos del store
  const { projects, getProjects, addProject, updateProjects } = useProjectsStore()
  const { user } = useUserStore()

  useEffect(() => {
    console.log(user)

    getProjects(user.id)
  }, [])

  const createTag = async (tag: { name: string, colorBackground: string, colorText: string }): Promise<{ msg: string, tag: any }> => {
    const tagAux = await createProjectTag(tag, user.id)
    return tagAux
  }

  const getTags = async (): Promise<any> => {
    const id = user.id
    const tags = await getUserTags(id)
    return tags
  }

  return { projects, addProject, updateProjects, createTag, createProject, getTags }
}
