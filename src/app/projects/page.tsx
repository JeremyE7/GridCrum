'use client'

import React, { useEffect, useRef } from 'react'
import styles from './page.module.css'
import gridItemStyles from './components/css/gridItem.module.css'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import { Project } from '../types'
import { useProjects } from '../hooks/useProyects'
import ProjectCard from './components/ProjectCard'

import './layout.css'
import { getLocalStorage } from '../utils/DocEvents'
import { redirect, useRouter } from 'next/navigation'

const ResponsiveGridLayout = WidthProvider(Responsive)

export default function Home (): JSX.Element {
  const { projects, updateProjects } = useProjects()
  const router = useRouter()

  if (projects === undefined) redirect('/')
  const clickRef = useRef<number>(0)

  const handleItemMoved = (
    newItem: Layout[],
    e: any
  ): void => {
    const currentTime = new Date().getTime()
    const timeDiff = currentTime - clickRef.current

    if (timeDiff < 300) {
      // Doble clic detectado
      handleOpenProject(parseInt(e.i))
    } else {
      // Un solo clic, actualiza la referencia de tiempo
      clickRef.current = currentTime
    }
    // Actualiza el estado solo después de que se ha completado el movimiento
    const updatedProjects = projects.map((project) => {
      const itemMoved = newItem.find((item) => item.i === project.id.toString()) // Update the type of itemMoved
      if (itemMoved != null) {
        // Actualiza la posición del elemento

        return {
          ...project,
          x: itemMoved.x,
          y: itemMoved.y,
          w: itemMoved.w,
          h: itemMoved.h
        }
      }
      return project
    })
    const user = getLocalStorage('user') ?? ''
    updateProjects(updatedProjects, user)
  }

  function handleOpenProject (projectId: number): void {
    console.log('Open project', projectId)
    router.push(`/projects/${projectId}`)
  }

  return (
    <main>
      <ResponsiveGridLayout
        className={styles.grid}
        layouts={{ lg: projects.map((project, index) => ({ ...project, i: project.id.toString() })) }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        onDragStop={handleItemMoved}
        onResizeStop={handleItemMoved}
      >
        {projects.map((project: Project, index) => {
          return (
            <section key={project.id} className={gridItemStyles.gridItem}>
              <ProjectCard project={project} />
            </section>
          )
        })}
      </ResponsiveGridLayout>

    </main>
  )
}
