import Movie from "./Components/Movie.tsx";

/**
 * ListofMovies Component
 * 
 * Renders a list of movies from search results.
 * Maps through the movies array and displays each movie using the Movie component.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.movies - Array of movie objects from search results
 * @param {Function} props.onSelectMovie - Callback function when a movie is selected
 */
function ListofMovies({ movies, onSelectMovie }: { movies: any[], onSelectMovie: (id: any) => void }) {
  return (
    <>
      <ul className="list list-movies ">
        {/* Map through movies array and render each movie */}
        {movies?.map((movie) => (
        <Movie key={movie.imdbID} 
               movie={movie} 
               onSelectMovie={onSelectMovie}
        />          
        ))}
      </ul>
    </>
  )
}

export default ListofMovies
