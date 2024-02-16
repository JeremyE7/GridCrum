import { Project, Spring } from '@/app/types'
import { create } from 'zustand'
import { getProjects, updateProjects } from '../ProjectsCrud'
import { Tag } from '@/app/hooks/useProyects'

/**
 * Interface del store de proyectos
 */
interface ProjectsStore {
  projects: Project[]
  tags: Tag[]
  getProjects: (id: string) => Promise<void>
  addProject: (project: Project) => void
  updateProjects: (projects: Project[], userId: string) => Promise<void>
  setTags: (tags: Tag[]) => void
  addSpring: (spring: Spring, projectId: string) => void
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
  getProjects: async (id: string) => {
    const projectsAux = await getProjects(id)
    const projects = projectsAux.projects
    set({ projects })
  },
  /**
   * Metodo para agregar un proyecto a la lista
   * @param project ProjectItem Proyecto a agregar
   */
  addProject: (project: Project) => set((state) => ({ projects: [...state.projects, project] })),
  /**
   * Metodo para actualizar la lista de proyectos
   * @param projects ProjectItem[] Lista de proyectos
   */
  updateProjects: async (projects: Project[], userId: string) => {
    const updatedProjects = await updateProjects(projects, userId)
    set({ projects: updatedProjects.projects })
  },
  tags: [],
  setTags: (tags: Tag[]) => set({ tags }),
  addSpring: (spring: Spring, projectId: string) => set((state) => {
    const project = state.projects.find(project => project.id.toString() === projectId.toString())
    if (project != null) {
      project.springs.push(spring)
    }
    console.log(state.projects)
    return state // Return the updated state
  })
}))
