/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import styles from './page.module.css'
import React from 'react'
import './table.css'
import { Gantt, GanttDataType } from 'react-virtual-gantt'
// import { getRandomGanttData } from './mockData'
import dayjs from 'dayjs'
import { useProjects } from '@/app/hooks/useProyects'
import { redirect, useParams, useRouter } from 'next/navigation'
import { getLocalStorage } from '@/app/utils/DocEvents'
import { getRandomGanttData } from './mockData'

const mockData = getRandomGanttData(
  100,
  dayjs().subtract(7, 'days').toDate(),
  dayjs().add(7, 'days').toDate()
)

console.log({ mockData })
export default function ProjectPage (): JSX.Element {
  const router = useRouter()
  const { id } = useParams()
  const { projects } = useProjects()
  if (getLocalStorage('token') === null || getLocalStorage('user') === null) redirect('/')
  const project = projects.find((project) => project.id.toString() === id.toString())

  const handleBarChange = (bar: any) => {
    console.log('bar changed', bar)
  }

  const handleBarClick = (bar: any) => {
    if (bar.level >= 1) {
      console.log('bar clicked', bar)
      router.push(`/projects/${id.toString()}/${bar.parentsKeys[0] as unknown as string}/${bar.key as unknown as string}`)
    }
  }

  const springs: GanttDataType[] = project?.springs?.map((spring) => {
    return {
      key: spring.id.toString(),
      title: spring.name,
      data: {
        startDate: dayjs(spring.startDate).toISOString(),
        endDate: dayjs(spring.endDate).toISOString()
      },
      progress: 0.5,
      children: spring.tasks?.map((task) => {
        return {
          key: task.id.toString(),
          title: task.name,
          data: {
            startDate: dayjs(task.startDate).toISOString(),
            endDate: dayjs(task.endDate).toISOString()
          },
          progress: 0.5
        }
      }),
      custom: {
        description: spring.description,
        state: spring.state
      }
    }
  }) ?? []

  console.log({ springs })

  return (
    <main>
      <section className={styles.grid}>
        <Gantt>
          <Gantt.Controls />
          <Gantt.Chart data={springs} className={styles.chart} onBarChange={handleBarChange} onBarDoubleClick={handleBarClick} />
        </Gantt>
      </section>

    </main>
  )
}
