import { useRef } from 'react'
import { useKey } from '../assets/hooks/useKey'
/**
 * Search Component
 *
 * A controlled input component for searching movies.
 * Updates the parent component's query state as the user types.
 *
 * @param {Object} props - Component props
 * @param {string} props.query - Current search query value
 * @param {Function} props.setQuery - Function to update the search query
 */
export default function Search({ query, setQuery }: { query: string; setQuery: (query: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)

  useKey('enter', () => {
    if (document.activeElement === inputRef.current) return
    inputRef.current?.focus()
    setQuery('')
  })

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
      />
    </>
  )
}
