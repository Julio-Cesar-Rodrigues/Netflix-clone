import React, { useEffect } from 'react'
import categories, { getMovies } from '../api'
import './Banner.css'

function Banner() {
  const [movie, setMovie] = React.useState({})

  const fetchRandleMovie = async () => {
    try {
      const netflixOriginalsCategorie = categories.find(
        category => category.name === 'netflixOriginals'
      )
      const data = await getMovies(netflixOriginalsCategorie.path)
      const movies = data?.results
      const randomIndex = Math.floor(Math.random() * movies.length)
      setMovie(movies[randomIndex])
    } catch (error) {
      console.log('banner fetchRandomMovie error', error)
    }
  }

  useEffect(() => {
    fetchRandleMovie()
  }, [])

  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + '...' : str
  }

  return (
    <header
      className="banner-container"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        roundPosition: 'center-center'
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner-description">
          <h2>{truncate(movie?.overview, 150)}</h2>
        </div>

        <div className="banner-btn-container">
          <button className="banner-btn btn-watch">► Assitir</button>
          <button className="banner-btn">Minha Lista</button>
        </div>
      </div>
    </header>
  )
}

export default Banner
