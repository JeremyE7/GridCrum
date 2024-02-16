import { DocumentType, Img, Item, Video } from '../types'
import { createItem, updateItems } from '../utils/itemsCrud'
import { useProjectsStore } from '../utils/store/ProjectsStore'

export const useItems = (): {
  createNewItem: (item: Omit< Item & { document?: Omit< DocumentType, 'id' | 'itemId' > } & { img?: Omit< Img, 'id' | 'itemId' > } & { video?: Omit< Video, 'id' | 'itemId' > }, 'id' | 'spring' | 'board' | 'reminders' | 'tags' | 'documentId' | 'videoId' | 'imgId' | 'x' | 'y' | 'w' | 'h' | 'task' >, userId: string) => Promise<{ msg: string, item: Item | null }>
  getItems: (taskId: string) => Item[] | undefined
  updateNewItems: (updatedItems: Item[] | undefined, taskId: string) => void
} => {
  const { getProjects, projects } = useProjectsStore()

  const createNewItem = async (item: Omit< Item & { document?: Omit< DocumentType, 'id' | 'itemId' > } & { img?: Omit< Img, 'id' | 'itemId' > } & { video?: Omit< Video, 'id' | 'itemId' > }, 'id' | 'spring' | 'board' | 'reminders' | 'tags' | 'documentId' | 'videoId' | 'imgId' | 'x' | 'y' | 'w' | 'h' | 'task' >, userId: string): Promise<{ msg: string, item: Item | null }> => {
    const newItem = await createItem(item)
    await getProjects(userId)
    return newItem
  }

  const getItems = (taskId: string): Item[] | undefined => {
    const springs = projects.map(project => project.springs).flat()
    console.log('springs', springs)

    const task = springs.map(spring => spring.tasks).flat().find(task => task.id.toString() === String(taskId))
    console.log('task', task)
    if (task !== null) return ((task?.items) != null) ? task.items : [] // Ensure items is not undefined
  }

  const updateNewItems = (updatedItems: Item[] | undefined, taskId: string): void => {
    if (updatedItems === undefined) return
    updateItems(updatedItems).then(res => {
      if (res.items !== null) {
        console.log('Items actualizados')
      } else {
        console.log('Error al actualizar los items')
      }
    })
  }

  return { createNewItem, getItems, updateNewItems }
}
