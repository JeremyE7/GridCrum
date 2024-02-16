'use client'

import { useProjects } from '@/app/hooks/useProyects'
import styles from './css/breadcrum.module.css'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function BreadCrum (): JSX.Element {
  // Recuperar la ruta de la página

  let project
  let spring
  let task
  const { projects } = useProjects()

  const { id, springId, taskId } = useParams()
  if (id !== undefined) {
    console.log('projectId', id)
    if (projects === undefined) return (<div>loading...</div>)
    project = projects.find((project) => project.id === Number(id))
  }
  if (springId !== undefined) {
    console.log('springId', springId)
    if (project === undefined) return (<div>loading...</div>)
    spring = project.springs.find((spring) => spring.id === Number(springId))
  }

  if (taskId !== undefined) {
    console.log('taskId', taskId)
    if (spring === undefined) return (<div>loading...</div>)
    task = spring.tasks.find((task) => task.id === Number(taskId))
  }

  return (
    <nav aria-label='Breadcrumb' className={styles.breadcrumb}>
      <ul>
        <li><span aria-current='page'><Link href='/projects'> Proyectos</Link></span></li>
        {id !== undefined && <li><span aria-current='page'><Link href={`/projects/${id.toString()}`}>{project?.name}</Link></span></li>}
        {springId !== undefined && <li><span aria-current='page'>{spring?.name}</span></li>}
        {taskId !== undefined && <li><span aria-current='page'><Link href={`/projects/${id.toString()}/${springId.toString()}/${taskId.toString()}`}>{task?.name}</Link></span></li>}
      </ul>
    </nav>
  )
}
