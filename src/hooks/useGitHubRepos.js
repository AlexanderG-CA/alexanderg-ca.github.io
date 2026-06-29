import { useState, useEffect } from 'react'
import cvData from '../data/cv-data.json'

export function useGitHubRepos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchRepos() {
      try {
        const res = await fetch(
          'https://api.github.com/users/AlexanderG-CA/repos?sort=updated&per_page=30',
          { signal: controller.signal },
        )
        if (!res.ok) throw new Error('Kunde inte hämta projekt')
        const data = await res.json()
        const filtered = data
          .filter((r) => !r.fork && !cvData.excludeRepos.includes(r.name))
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        setRepos(filtered)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
    return () => controller.abort()
  }, [])

  return { repos, loading, error }
}
