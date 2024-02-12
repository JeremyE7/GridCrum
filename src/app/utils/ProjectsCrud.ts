import { ProjectItem } from '../types'
/**
 * Metodo para recuperar los proyectos del servidor
 * @returns Promise<ProjectItem[]> Promesa de lista de proyectos
 */
export async function getProjects (): Promise<ProjectItem[]> {
  try {
    const projects = await fetch('http://localhost:3001/api/projects/')
    return await projects.json()
  } catch (error) {
    return [{
      i: '1',
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      type: 'proyect',
      data: {
        id: 1,
        name: 'Project 1',
        description: 'This is a project description',
        image: 'https://picsum.photos/1080/720',
        tags: [
          'Develpment',
          'Design',
          'Marketing'
        ]
      }
    }]
  }
}
