import { ProjectItem } from '../types'
import { getLocalStorage } from './DocEvents'
/**
 * Metodo para recuperar los proyectos del servidor
 * @returns Promise<ProjectItem[]> Promesa de lista de proyectos
 */
export async function getProjects (id: string): Promise<{ msg: string, projects: ProjectItem[] }> {
  try {
    const token = getLocalStorage('token')
    console.log(id)

    const projects = await fetch('http://localhost:3001/api/projects/user/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? ''
      }
    })
    const projectsJson = await projects.json()
    console.log(projectsJson)

    return projectsJson
  } catch (error) {
    return {
      msg: 'ERROR, PRESENTANDO ARCHIVOS MUCK',
      projects: [{
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
}

export async function createProject (project: ProjectItem): Promise<{ msg: string, project: ProjectItem | null }> {
  try {
    const token = getLocalStorage('token')

    const newProject = await fetch('http://localhost:3001/api/projects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? ''
      },
      body: JSON.stringify(project)
    })
    const newProjectJson = await newProject.json()
    console.log(newProjectJson)

    return newProjectJson
  } catch (error) {
    return {
      msg: 'ERROR, PRESENTANDO ARCHIVOS MUCK',
      project: null
    }
  }
}

export async function getUserTags (id: string): Promise<{ msg: string, tags: any[] }> {
  try {
    const token = getLocalStorage('token')

    const tags = await fetch('http://localhost:3001/api/projects/tag/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? ''
      }
    })
    const tagsJson = await tags.json()
    return tagsJson
  } catch (error) {
    return {
      msg: 'ERROR, PRESENTANDO ARCHIVOS MUCK',
      tags: []
    }
  }
}

export async function createProjectTag (tag: { name: string, colorBackground: string, colorText: string }, id: string): Promise<{ msg: string, tag: any }> {
  try {
    const token = getLocalStorage('token')
    const newTag = await fetch('http://localhost:3001/api/projects/tag/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? ''
      },
      body: JSON.stringify(tag)
    })
    const newTagJson = await newTag.json()
    console.log(newTagJson)

    return newTagJson
  } catch (error) {
    return {
      msg: 'ERROR, PRESENTANDO ARCHIVOS MUCK',
      tag: null
    }
  }
}
