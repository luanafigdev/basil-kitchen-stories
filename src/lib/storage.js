import { useEffect, useState } from 'react'

export function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored === null ? initialValue : JSON.parse(stored)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* Navegação privada ou armazenamento indisponível. */ }
  }, [key, value])

  return [value, setValue]
}

export function useHashRoute() {
  const readHash = () => window.location.hash.replace(/^#\/?/, '') || 'inicio'
  const [route, setRoute] = useState(readHash)
  useEffect(() => {
    const onChange = () => { setRoute(readHash()); window.scrollTo({ top: 0, behavior: 'instant' }) }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
