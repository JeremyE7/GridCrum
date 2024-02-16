'use client'

import { useItems } from '@/app/hooks/useItems'
import styles from './page.module.css'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import { getLocalStorage } from '@/app/utils/DocEvents'
import { redirect, useParams } from 'next/navigation'
import { useRef } from 'react'

const ResponsiveGridLayout = WidthProvider(Responsive)

export default function TaskPage (): JSX.Element {
  const { getItems, updateNewItems } = useItems()
  const { taskId } = useParams()
  if (getLocalStorage('user') === '') redirect('/')
  const items = getItems(taskId.toString())
  console.log('items', items)
  const clickRef = useRef<number>(0)

  const handleItemMoved = (
    newItem: Layout[],
    e: any
  ): void => {
    const currentTime = new Date().getTime()
    const timeDiff = currentTime - clickRef.current

    if (timeDiff < 300) {
      // Doble clic detectado
      // window.open('/otra-ruta', '_blank');
      console.log('Doble clic detectado', e)
      const url = items?.find((item) => item.id.toString() === e.i)?.document?.url
      console.log('url', url)

      if (url !== undefined) window.open(url, '_blank')
    } else {
      // Un solo clic, actualiza la referencia de tiempo
      clickRef.current = currentTime
    }
    // Actualiza el estado solo después de que se ha completado el movimiento
    const updatedItems = items?.map((itemAux) => {
      const itemMoved = newItem.find((item) => item.i === itemAux.id.toString()) // Update the type of itemMoved
      if (itemMoved != null) {
        // Actualiza la posición del elemento

        return {
          ...itemAux,
          x: itemMoved.x,
          y: itemMoved.y,
          w: itemMoved.w,
          h: itemMoved.h
        }
      }
      return itemAux
    })
    updateNewItems(updatedItems, taskId.toString())
  }

  return (
    <main>
      <ResponsiveGridLayout
        className={styles.grid}
        layouts={{ lg: (items !== undefined) ? items?.map((item, index) => ({ ...item, i: item.id.toString() })) : [] }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        onDragStop={handleItemMoved}
        onResizeStop={handleItemMoved}
      >
        {items?.map((item, index) => (
          <div key={item.id} data-grid={{ ...item, i: item.id.toString() }} className={styles.gridItem}>
            {item.document !== null && (
              <a href={item.document?.url}>{item.document?.name}</a>
            )}
            {item.video !== null && (
              <video src={item.video?.url} controls />
            )}
            {item.img !== null && (
              <img src={item.img?.url} alt={item.img?.description} />
            )}
          </div>
        ))}
      </ResponsiveGridLayout>
    </main>
  )
}
