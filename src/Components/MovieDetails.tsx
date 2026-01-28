import { useEffect, useState, useRef } from 'react'
import { StarRating } from './StarRating'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import { useKey } from '../assets/hooks/useKey'

// OMDB API key for fetching detailed movie information
const KEY = 'c682c756'

/**
 * MovieDetails Component
 *
 * Displays detailed information about a selected movie including:
 * - Movie poster, title, release date, runtime, genre
 * - IMDB rating
 * - Plot summary, cast, and director
 * - Interactive star rating component
 *
 * @param {Object} props - Component props
 * @param {string} props.selectedId - IMDB ID of the selected movie
 * @param {Function} props.onCloseMovie - Callback to close the details view
 */
export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: {
  selectedId: string
  onCloseMovie: () => void
  onAddWatched: (movie: any) => void
  watched: any[]
}) {
  // State to store detailed movie information
  const [movie, setMovie] = useState({} as any)

  // Loading state for the movie details fetch
  const [isLoading, setIsLoading] = useState(false)
  // Error state for the movie details fetch
  const [error, setError] = useState('')

  const [userRating, setUserRating] = useState('')

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)

  const watchedMovieRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating

  const countRef = useRef(0)

  useEffect(
    function () {
      if (userRating) {
        countRef.current++
      }
    },
    [userRating]
  )

  // Function to add a watched movie to the watched list
  function handleAdd() {
    // Create a new watched movie object with the selected movie details
    const newWatchedMovie = {
      imdbID: selectedId,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(' ').at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    }

    // Add the new watched movie to the watched list
    onAddWatched(newWatchedMovie)
    // Close the movie details view
    onCloseMovie()
  }

  useKey('escape', onCloseMovie);
  
  /**
   * Effect hook to fetch detailed movie data when a movie is selected
   * Uses the OMDB API to get comprehensive movie information
   */
  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          // Set loading state and clear any previous errors
          setIsLoading(true)
          setError('')

          // Fetch detailed movie data using the IMDB ID
          const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)

          // Check if the HTTP request was successful
          if (!res.ok) {
            throw new Error('Something went wrong fetching movie details')
          }

          // Parse the JSON response
          const data = await res.json()

          // OMDB API returns Response: "False" when no movie is found
          if (data.Response === 'False') {
            throw new Error('No details found')
          }

          // Update movie state with detailed information
          setMovie(data)
        } catch (err: any) {
          // Log error for debugging and show user-friendly message
          console.log('Error:', err.message)
          setError(err.message)
        } finally {
          // Always stop loading, regardless of success or failure
          setIsLoading(false)
        }
      }

      // Execute the fetch function and clear loading state
      getMovieDetails()
    },
    [selectedId]
  ) // effect runs when selectedId changes

  useEffect(
    function () {
      document.title = `Movie | ${movie.Title}`

      return function () {
        document.title = 'Movie Night'
      }
    },
    [movie.Title]
  )

  return (
    <>
      <div className="details">
        {/* Show loading spinner while fetching movie details */}
        {isLoading && <Loader />}

        {error && <ErrorMessage message={error} />}

        {!isLoading && !error && (
          <>
            {/* Movie header with back button, poster, and basic info */}
            <header>
              {/* Back button to return to watched movies list */}
              <button className="btn-back" onClick={onCloseMovie}>
                ⇦
              </button>

              {/* Movie poster image */}
              <img src={movie.Poster} alt={`${movie.Title} poster`} />

              {/* Movie overview section */}
              <div className="details-overview">
                <h2>{movie.Title}</h2>
                <p>
                  {movie.Released} &bull; {movie.Runtime}
                </p>
                <p>{movie.Genre}</p>
                <p>
                  <span>⭐️</span>
                  <span>{movie.imdbRating}</span>
                </p>
              </div>
            </header>

            {/* Detailed movie information section */}
            <section>
              {/* Interactive star rating component */}

              {/* Show user rating if user has rated the movie */}

              {/* Show star rating component */}
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      maxRating={10}
                      size={2.5}
                      onSetRating={(rating: number) => setUserRating(rating.toString())}
                    />

                    {/* Show add to watched button if user has rated the movie */}
                    {Number(userRating) > 0 && (
                      <button className="btn-add" onClick={handleAdd}>
                        Add to watched
                      </button>
                    )}
                  </>
                ) : (
                  <p>You rated this movie {watchedMovieRating} out of 10</p>
                )}
              </div>
              {/* Movie plot summary */}
              <p>
                <em>{movie.Plot}</em>
              </p>

              {/* Cast information */}
              <p>
                <em>Starring {movie.Actors}</em>
              </p>

              {/* Director information */}
              <p>
                <em> Directed by {movie.Director}</em>
              </p>
            </section>
          </>
        )}
      </div>
    </>
  )
}
