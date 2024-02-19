'use client'
/**
 * Metodo que agrega un listener para la tecla escape
 * @param callback Funcion a ejecutar cuando se presiona la tecla escape
 */
export function addKeyEscapeListener (callback: () => void): void {
  if (typeof window !== 'undefined') {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        callback()
      }
    })
  }
}

export function saveLocalStorage (value: string, key: string): void {
  window.localStorage.setItem(key, value)
}

export function getLocalStorage (key: string): string | null {
  if (typeof window !== 'undefined') {
    const item = window.localStorage.getItem(key)
    return item
  }
  return null
}
