import { useEffect } from 'react'
import { useProjectsStore } from '../utils/store/ProjectsStore'
import { ProjectItem } from '../types'

/**
 * Hook para recuperar los proyectos del store
 * @returns
 * projects: ProjectItem[] Lista de Proyectos
 * addProject: (project: ProjectItem) => void Agrega un proyecto a la lista
 * updateProjects: (projects: ProjectItem[]) => void Actualiza la lista de proyectos
 */
export const useProjects = (): { projects: ProjectItem[], addProject: (project: ProjectItem) => void, updateProjects: (projects: ProjectItem[]) => void } => {
  // Recuperamos los metodos del store
  const { projects, getProjects, addProject, updateProjects } = useProjectsStore()

  useEffect(() => {
    getProjects()
  }, [])

  return { projects, addProject, updateProjects }
}
