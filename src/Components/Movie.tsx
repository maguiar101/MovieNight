/**
 * Movie Component
 * 
 * Displays a single movie item in the search results list.
 * Shows movie poster, title, and year. Clickable to view details.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.movie - Movie object containing title, year, poster, and imdbID
 * @param {Function} props.onSelectMovie - Callback function when movie is clicked
 */
export default function Movie({ movie, onSelectMovie }: { movie: any, onSelectMovie: (id: any) => void }) {
  return (  
    <>
        {/* Clickable movie item */}
        <li onClick={() => onSelectMovie(movie.imdbID)} >
            {/* Movie poster image */}
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            
            {/* Movie title */}
            <h3>{movie.Title}</h3>
            
            {/* Movie year */}
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    </>
  )
}