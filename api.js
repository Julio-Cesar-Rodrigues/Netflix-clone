const API_KEY = 'd01e988703d5f2f7c7a6dc611b9adb40'

const categories = [
  {
    name: 'trending',
    title: 'Em Alta',
    path: `/trending/all/week?api_key=${API_KEY}&language=pt-BR`,
    isLarge: true
  },
  {
    name: 'netflixOriginals',
    title: 'Originais Netflix',
    path: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    isLarge: false
  },
  {
    name: 'topRated',
    title: 'Populares',
    path: `/movie/top_rated?api_key=${API_KEY}&language=pt-BR`,
    isLarge: false
  },
  {
    name: 'comedy',
    title: 'Comedias',
    path: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
    isLarge: false
  },
  {
    name: 'romance',
    title: 'Romances',
    path: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
    isLarge: false
  },
  {
    name: 'animation',
    title: 'Animation',
    path: `/discover/tv?api_key=${API_KEY}&with_genres=16`,
    isLarge: false
  },
  {
    name: 'mistery',
    title: 'Mistério',
    path: `/discover/tv?api_key=${API_KEY}&with_genres=9648`,
    isLarge: false
  },
  {
    name: 'documentary',
    title: 'Documentários',
    path: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
    isLarge: false
  }
]

export const getMovies = async path => {
  try {
    let url = `https://api.themoviedb.org/3${path}`
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.log('error getMovies', error)
  }
}
export default categories
