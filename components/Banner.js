import React, { useEffect } from 'react'
import categories, { getMovies } from '../api'
import './Banner.css'
import movieTrailer from 'movie-trailer'
import ReactPlayer from 'react-player'

function Banner() {
  const [movie, setMovie] = React.useState({})

  const [trailerUrl, setTrailerUrl] = React.useState('')

  const handleOnClick = movie => {
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie.title || movie.name || movie.original_name || '')
        .then(url => {
          setTrailerUrl(url)
        })
        .catch(error => {
          console.log('error fetching movieTrailer', error)
        })
    }
  }

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
          <button
            className="banner-btn btn-watch"
            onClick={() => handleOnClick(movie)}
          >
            ► Assitir
          </button>
          <button className="banner-btn">Minha Lista</button>
        </div>
      </div>
      {trailerUrl && <ReactPlayer url={trailerUrl} playing={true} />}
    </header>
  )
}

export default Banner
