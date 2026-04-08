import { useEffect } from 'react'

const DEFAULT_TITLE = 'Figured Consulting'

export function useSEO({ title, description }) {
  useEffect(() => {
    document.title = title

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    return () => {
      document.title = DEFAULT_TITLE
      if (meta) meta.setAttribute('content', '')
    }
  }, [title, description])
}
