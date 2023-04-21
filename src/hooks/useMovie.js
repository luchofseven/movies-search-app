import { useEffect, useState } from 'react'
import { API_KEY } from '../api/api_key'

export function useMovies ({ sort }) {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loader, setLoader] = useState(false)
  const [search, setSearch] = useState('Avengers')

  useEffect(() => {
    setLoader(true)

    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${search}`)
      .then(res => {
        if (!res.ok) throw new Error('Error en la petición')
        return res.json()
      })
      .then(res => {
        setMovies(res.Search)
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => {
        setLoader(false)
      })
  }, [search])

  const sortedMovies = sort
    ? [...movies].sort((a, b) => a.Title.localeCompare(b.Title))
    : movies

  return { movies: sortedMovies, error, loader, search, setSearch }
}
