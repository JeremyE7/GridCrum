import { ProjectItem } from '@/app/types'
import { create } from 'zustand'
import { getProjects } from '../ProjectsCrud'

/**
 * Interface del store de proyectos
 */
interface ProjectsStore {
  projects: ProjectItem[]
  getProjects: () => Promise<void>
  addProject: (project: ProjectItem) => void
  updateProjects: (projects: ProjectItem[]) => void
}

/**
 * Contexto global de proyectos usando Zustand
 * @returns
 * projects: ProjectItem[] Lista de Proyectos
 * addProject: (project: ProjectItem) => void Agrega un proyecto a la lista
 * updateProjects: (projects: ProjectItem[]) => void Actualiza la lista de proyectos
 * getProjects: () => Promise<void> Recupera los proyectos del servidor
 */
export const useProjectsStore = create<ProjectsStore>((set) => ({
  projects: [],
  /**
   * Recupera los proyectos del servidor
   * @returns
   * projects: ProjectItem[] Lista de Proyectos
   */
  getProjects: async () => {
    const projectsAux = await getProjects()
    const projects = projectsAux.projects
    set({ projects })
  },
  /**
   * Metodo para agregar un proyecto a la lista
   * @param project ProjectItem Proyecto a agregar
   */
  addProject: (project: ProjectItem) => set((state) => ({ projects: [...state.projects, project] })),
  /**
   * Metodo para actualizar la lista de proyectos
   * @param projects ProjectItem[] Lista de proyectos
   */
  updateProjects: (projects: ProjectItem[]) => set({ projects })
}))
