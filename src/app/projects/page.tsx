'use client'

import React from 'react'
import styles from './page.module.css'
import gridItemStyles from './components/css/gridItem.module.css'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { Item, ProjectItem } from '../types'
import { useProjects } from '../hooks/useProyects'
import ProjectCard from './components/ProjectCard'
import AddUserTagsModal from './components/AddUserTagsModal'
import { useModalsStore } from '../utils/store/ModalsStore'
import './layout.css'
import { getLocalStorage } from '../utils/DocEvents'
import { redirect } from 'next/navigation'
import CreateProjectModal from './components/CreateProjectModal'

const ResponsiveGridLayout = WidthProvider(Responsive)

export default function Home (): JSX.Element {
  const { projects, updateProjects } = useProjects()
  if (getLocalStorage('token') === null) redirect('/')

  const handleItemMoved = (
    newItem: Item[]
  ): void => {
    // Actualiza el estado solo después de que se ha completado el movimiento
    const updatedProjects = projects.map((project) => {
      const itemMoved = newItem.find((item: Item) => item.i === project.i)
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
    updateProjects(updatedProjects)
  }

  const { modalAddUserTag, modalAddProject } = useModalsStore()

  return (
    <main>
      <ResponsiveGridLayout
        className={styles.grid}
        layouts={{ lg: projects }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        onDragStop={handleItemMoved}
        onResizeStop={handleItemMoved}
      >
        {projects.map((project: ProjectItem, index) => {
          return (
            <section key={project.i} className={gridItemStyles.gridItem}>
              <ProjectCard project={project} />
            </section>
          )
        })}
      </ResponsiveGridLayout>
      <AddUserTagsModal dialogRef={modalAddUserTag} />
      <CreateProjectModal dialogRef={modalAddProject} />
    </main>
  )
}
