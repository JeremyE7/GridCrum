'use client'

import { useProjects } from '@/app/hooks/useProyects'
import styles from './css/breadcrum.module.css'
import { useParams } from 'next/navigation'

export default function BreadCrum (): JSX.Element {
  // Recuperar la ruta de la página

  const { id } = useParams()
  console.log('projectId', id)
  const { projects } = useProjects()
  if (projects === undefined) return (<div>loading...</div>)
  const project = projects.find((project) => project.id === Number(id))

  return (
    <nav aria-label='Breadcrumb' className={styles.breadcrumb}>
      <ul>
        <li><span aria-current='page'>Proyectos</span></li>
        <li><span aria-current='page'>{project?.name}</span></li>
      </ul>
    </nav>
  )
}
