export default function Movie ({ info }) {
  const { Title, Year, Poster } = info

  return (
    <div className='movie'>
      <h3>{Title}</h3>
      <p>Year: {Year}</p>
      <img src={Poster} alt={`Image of the movie ${Title}`} />
    </div>
  )
}
