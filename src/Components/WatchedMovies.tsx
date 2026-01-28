

function WatchedMovies({ movie, 
                         onDeleteWatched 
                        }: { 
                         movie: any, 
                         onDeleteWatched: (id: any) => void }) {
  return (
    <>
     <li key={movie.imdbID}>
                    {/* Movie poster */}
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    
                    {/* Movie title */}
                    <h3>{movie.Title}</h3>
                    
                    {/* Movie statistics */}
                    <div>
                      {/* IMDB rating */}
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      
                      {/* User rating */}
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      
                      {/* Runtime */}
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>
                      <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
                    </div>
                  </li>
                  
    </>
  )
}

export default WatchedMovies