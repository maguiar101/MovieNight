import { useState } from 'react'
import Navbar from './Components/Navbar.tsx'
import Search from './Components/Search.tsx'
import Main from './Components/Main.tsx'
import MovieList from './Components/MovieList.tsx'
import ListofMovies from './ListofMovies.tsx'
import ListofWatched from './ListofWatched.tsx'
import Summary from './Components/Summary.tsx'
import Loader from './Components/Loader.tsx'
import ErrorMessage from './Components/ErrorMessage.tsx'
import MovieDetails from './Components/MovieDetails.tsx'
import { useMovies } from './assets/hooks/useMovies.tsx'
import { useLocalStorageState } from './assets/hooks/useLocalStorageState.tsx'



export default function App() {
  // ===== STATE MANAGEMENT =====
  // Controls visibility of the right panel (watched movies/details)
  const [isOpen] = useState(true)
  // Search query entered by user
  const [query, setQuery] = useState('')

  // Currently selected movie ID for detailed view
  const [selectedId, setSelectedId] = useState(null)

  
  // ===== EVENT HANDLERS =====

  /**
   * Handles movie selection from the search results
   * Toggles the selected movie - if the same movie is clicked again, it deselects
   * @param {string} id - The IMDB ID of the selected movie
   */
  function handleSelectMovie(id: any) {
    setSelectedId((selectedId) => (selectedId === id ? null : id))
  }

  /**
   * Closes the movie details view and returns to the watched movies list
   */
  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleAddWatched(movie: any) {
    setWatched((watched: any[]) => [...watched, movie])
  }

  function handleDeleteWatched(id: any) {
    setWatched((watched: any[]) => watched.filter((movie: any) => movie.imdbID !== id))
  }



  const { movies, isLoading, error } = useMovies(query, handleCloseMovie)

  const [watched, setWatched] = useLocalStorageState('watched', [])
 
  // ===== RENDER =====

  return (
    <>
      {/* Top navigation bar with logo, search, and results count */}
      <Navbar>
        <div className="logo">
          <span role="img">🍿</span>
          <h1>Movies Night</h1>
        </div>

        {/* Search input component */}
        <Search query={query} setQuery={setQuery} />

        {/* Display number of search results */}
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      </Navbar>

      {/* Main content area with two panels */}
      <Main>
        {/* Left panel: Movie search results */}
        <MovieList>
          {/* Show loading spinner while fetching */}
          {isLoading && <Loader />}

          {/* Show movie list when loaded successfully */}
          {!isLoading && !error && <ListofMovies movies={movies} onSelectMovie={handleSelectMovie} />}

          {/* Show error message if something went wrong */}
          {error && <ErrorMessage message={error} />}
        </MovieList>

        {/* Right panel: Watched movies or movie details */}
        <MovieList>
          {/* Only show content if panel is open */}
          {isOpen && (
            <>
              {/* Show movie details if a movie is selected, otherwise show watched list */}
              {selectedId ? (
                <MovieDetails
                  selectedId={selectedId}
                  onCloseMovie={handleCloseMovie}
                  onAddWatched={handleAddWatched}
                  watched={watched}
                />
              ) : (
                <>
                  {/* Summary statistics of watched movies */}
                  <Summary watched={watched} />

                  {/* List of watched movies */}
                  <ListofWatched watched={watched} onDeleteWatched={handleDeleteWatched} />
                </>
              )}
            </>
          )}
        </MovieList>
      </Main>
    </>
  )
}
