import { useState, useCallback } from 'react'
import Movie from './components/Movie'
import { useMovies } from './hooks/useMovie'
import debounce from 'just-debounce-it'
import './styles/styles.min.css'

function App () {
  const [sort, setSort] = useState(false)

  const { movies = [], error, loader, setSearch } = useMovies({ sort })

  const handleSubmit = (e) => {
    e.preventDefault()

    const fields = new window.FormData(e.target)
    const query = fields.get('query')

    if (query === '') {
      window.alert('Introduce el nombre de una película para buscar')
    } else {
      setSearch(query)
    }
  }

  const debounceMovies = useCallback(
    debounce(search => {
      setSearch(search)
    }, 800)
    , []
  )

  const handleChange = (e) => {
    const newSearch = e.target.value

    if (newSearch.startsWith(' ')) return

    if (newSearch !== '') {
      debounceMovies(newSearch)
    }
  }

  const handleSort = () => {
    movies.length !== 0 && setSort(!sort)
  }

  return (
    <main className='main-container'>

      <h1>Movies Search App</h1>

      <form className='search' onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} name='query' placeholder='Avengers, Matrix, ...' />
        <label>Sort by title</label>
        <input type='checkbox' onChange={handleSort} checked={sort} />
        <button type='submit'>Buscar</button>
      </form>

      {loader && !error && <h4>Cargando...</h4>}

      {error && <h4>Hubo un error</h4>}

      <article className='movies-container'>
        {movies.length > 0
          ? movies.map(movie => <Movie key={movie.imdbID} info={movie} />)
          : 'No hay películas para mostrar'}
      </article>

    </main>
  )
}

export default App
