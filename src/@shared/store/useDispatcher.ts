import { defineStore } from 'pinia'

export const useDispatcher = defineStore('useDispatcher', () => {
  const listeners: { event: string; cb: () => void }[] = []

  function on(event: string, cb: () => void): () => void {
    const entry = { event, cb }
    listeners.push({ event, cb })

    return () => {
      const index = listeners.indexOf(entry)
      if (index === -1) return
      listeners.splice(index, 1)
    }
  }

  function dispatch(event: string): void {
    for (const listener of listeners) {
      if (listener.event === event) {
        listener.cb()
      }
    }
  }

  return {
    on,
    dispatch
  }
})
