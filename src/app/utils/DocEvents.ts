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