import { useEffect } from 'react'
import { useProjectsStore } from '../utils/store/ProjectsStore'
import { ProjectItem } from '../types'
import { createProjectTag } from '../utils/ProjectsCrud'

/**
 * Hook para recuperar los proyectos del store
 * @returns
 * projects: ProjectItem[] Lista de Proyectos
 * addProject: (project: ProjectItem) => void Agrega un proyecto a la lista
 * updateProjects: (projects: ProjectItem[]) => void Actualiza la lista de proyectos
 */
export const useProjects = (): { projects: ProjectItem[], addProject: (project: ProjectItem) => void, updateProjects: (projects: ProjectItem[]) => void, createTag: (tag: { name: string, colorBackground: string, colorText: string }) => Promise<{ msg: string, tag: any }> } => {
  // Recuperamos los metodos del store
  const { projects, getProjects, addProject, updateProjects } = useProjectsStore()

  useEffect(() => {
    getProjects()
  }, [])

  const createTag = async (tag: { name: string, colorBackground: string, colorText: string }): Promise<{ msg: string, tag: any }> => {
    const tagAux = await createProjectTag(tag)
    console.log(tagAux)

    return tagAux
  }

  return { projects, addProject, updateProjects, createTag }
}
