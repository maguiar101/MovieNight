import WatchedMovies from "./Components/WatchedMovies"

/**
 * ListofWatched Component
 * 
 * Displays a list of movies that the user has watched.
 * Shows movie poster, title, IMDB rating, user rating, and runtime.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.watched - Array of watched movie objects with ratings and runtime
 */
function ListofWatched({ watched, 
                        onDeleteWatched,
                      }: { 
                        watched: any[], 
                        onDeleteWatched: (id: any) => void }) {

  return (
    <>
      <ul className="list">
                {/* Map through watched movies and display each one */}
                {watched.map((movie) => (
                  <WatchedMovies key={movie.imdbID} 
                                 movie={movie} 
                                 onDeleteWatched={onDeleteWatched} />
                ))}
              </ul>
    </>
  )
}

export default ListofWatched
