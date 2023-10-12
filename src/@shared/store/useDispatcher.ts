import { defineStore } from 'pinia'

export const useDispatcher = defineStore('useDispatcher', () => {
  const listeners: { event: string; cb: () => void }[] = []

  const on = (event: string, cb: () => void) => {
    const entry = { event, cb }
    listeners.push({ event, cb })
    return () => {
      const index = listeners.indexOf(entry)
      if (index === -1) return
      listeners.splice(index, 1)
    }
  }

  return {
    on,
    dispatch: (event: string) => {
      listeners.filter(({ event: target }) => event === target)?.forEach(({ cb }) => cb())
    }
  }
})
