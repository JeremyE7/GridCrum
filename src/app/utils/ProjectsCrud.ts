import { Project, Spring, Task } from '../types'
import { getLocalStorage } from './DocEvents'
/**
 * Metodo para recuperar los proyectos del servidor
 * @returns Promise<ProjectItem[]> Promesa de lista de proyectos
 */
export async function getProjects (id: string): Promise<{ msg: string, projects: Project[] }> {
  try {
    const token = getLocalStorage('token')

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
      projects: []
    }
  }
}

export async function createProject (project: Omit<Project, 'id' | 'userId' | 'user'>, userId: string): Promise<{ msg: string, project: Project | null }> {
  try {
    const token = getLocalStorage('token')

    const newProject = await fetch('http://localhost:3001/api/projects/' + userId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? ''
      },
      body: JSON.stringify(project)
    })
    const newProjectJson = await newProject.json()

    return newProjectJson
  } catch (error) {
    return {
      msg: 'ERROR, PRESENTANDO ARCHIVOS MUCK',
      project: null
    }
  }
}

export async function updateProjects (projects: Project[], id: string): Promise<{ msg: string, projects: Project[] }> {
  try {
    const token = getLocalStorage('token')

    const newProjects = await fetch('http://localhost:3001/api/projects/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? ''
      },
      body: JSON.stringify(projects)
    })
    const newProjectsJson = await newProjects.json()

    return newProjectsJson
  } catch (error) {
    return {
      msg: 'ERROR, PRESENTANDO ARCHIVOS MUCK',
      projects: []
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

    return newTagJson
  } catch (error) {
    return {
      msg: 'ERROR, PRESENTANDO ARCHIVOS MUCK',
      tag: null
    }
  }
}

export async function createSpring (spring: Omit<Spring, 'id' | 'tasks' | 'proyect'>): Promise<{ msg: string, spring: Spring | null }> {
  const token = getLocalStorage('token')
  const createSpring = await fetch('http://localhost:3001/api/project/spring', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ?? ''
    },
    body: JSON.stringify(spring)
  })

  const springCreated = await createSpring.json()
  console.log(springCreated)

  return springCreated
}

export async function createTask (task: Omit<Task, 'id' | 'spring' | 'board' | 'reminders' | 'tags' | 'items'>): Promise<{ msg: string, task: Task }> {
  const token = getLocalStorage('token')
  const createTask = await fetch('http://localhost:3001/api/project/spring/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ?? ''
    },
    body: JSON.stringify(task)
  })

  const taskCreated = await createTask.json()
  console.log(taskCreated)

  return taskCreated
}
