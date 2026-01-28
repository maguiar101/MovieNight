import { useEffect, useState } from 'react'

// OMDB API key for fetching movie data
const KEY = 'c682c756'

export function useMovies(query: string, callback: () => void) {
  // Movie search results from API
  const [movies, setMovies] = useState([] as any[])

  // Loading state for API requests
  const [isLoading, setIsLoading] = useState(false)

  // Error messages from API or other operations
  const [error, setError] = useState('')

  useEffect(
    function () {
      callback?.()

      const controller = new AbortController()

      async function fetchMovies() {
        try {
          // Set loading state and clear any previous errors
          setIsLoading(true)
          setError('')

          // Fetch movies from OMDB API
          const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal })

          // Check if the HTTP request was successful
          if (!res.ok) {
            throw new Error('Something went wrong fetching movies')
          }

          // Parse the JSON response
          const data = await res.json()

          // OMDB API returns Response: "False" when no movies are found
          if (data.Response === 'False') {
            throw new Error('No movies found')
          }

          // Update movies state and clear error message with search results
          setMovies(data.Search)
          setError('')
        } catch (err: any) {
          // Log error for debugging and show user-friendly message only if the error is not an abort error
          console.log('Error:', err.message)
          // Only set the error message if the error is not an abort error
          if (err.name !== 'AbortError') {
            setError(err.message)
          }
        } finally {
          // Always stop loading, regardless of success or failure
          setIsLoading(false)
        }
      }

      // Clear movies and errors when query is empty
      if (query.length < 3) {
        setMovies([])
        setError('')
        return
      }

      // Execute the fetch function
      fetchMovies()

      // Abort the fetch request if the component unmounts
      return function () {
        controller.abort()
      }
    },
    [query] // Dependency array - effect runs when query changes
  )
  return { movies, isLoading, error }
}
