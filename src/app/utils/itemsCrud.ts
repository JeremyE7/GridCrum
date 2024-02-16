import { DocumentType, Img, Item, Video } from '../types'
import { getLocalStorage } from './DocEvents'

export async function createItem (item: Omit<
Item & {
  document?: Omit<DocumentType, 'id' | 'itemId'>
} & {
  img?: Omit<Img, 'id' | 'itemId'>
} & {
  video?: Omit<Video, 'id' | 'itemId'>
},
'id' | 'spring' | 'board' | 'reminders' | 'tags' | 'documentId' | 'videoId' | 'imgId' | 'x' | 'y' | 'w' | 'h' | 'task'
>): Promise<{ msg: string, item: Item | null }> {
  try {
    const token = getLocalStorage('token')

    const newItem = await fetch('http://localhost:3001/api/project/spring/task/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? ''
      },
      body: JSON.stringify(item)
    })
    const newItemJson = await newItem.json()
    console.log('newItemJson', newItemJson)

    return newItemJson
  } catch (error) {
    return {
      msg: 'ERROR, PRESENTANDO ARCHIVOS MUCK',
      item: null
    }
  }
}

export async function updateItems (items: Item[]): Promise<{ msg: string, items: Item[] | null }> {
  try {
    const token = getLocalStorage('token')

    const newItem = await fetch('http://localhost:3001/api/project/spring/task/item', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? ''
      },
      body: JSON.stringify(items)
    })
    const newItemJson = await newItem.json()
    console.log('newItemJson', newItemJson)

    return newItemJson
  } catch (error) {
    return {
      msg: 'ERROR, PRESENTANDO ARCHIVOS MUCK',
      items: null
    }
  }
}
