

/**
 * Summary Component
 * 
 * Displays statistical summary of watched movies including:
 * - Total number of movies watched
 * - Average IMDB rating
 * - Average user rating
 * - Average runtime
 * 
 * @param {Object} props - Component props
 * @param {Array} props.watched - Array of watched movie objects with ratings and runtime
 */
function Summary({ watched }: { watched: any[] }) {

  /**
   * Helper function to calculate the average of an array of numbers
   * @param {number[]} arr - Array of numbers to average
   * @returns {number} The average value
   */
  const average = (arr: number[]) =>
    arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);

  // Calculate various averages from the watched movies data
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
          <div>
            {/* Total number of movies */}
            <p>
              <span>#️⃣</span>
              <span>{watched.length} movies</span>
            </p>
            
            {/* Average IMDB rating */}
            <p>
              <span>⭐️</span>
              <span>{avgImdbRating.toFixed(0)}</span>
            </p>
            
            {/* Average user rating */}
            <p>
              <span>🌟</span>
              <span>{avgUserRating.toFixed(0)}</span>
            </p>
            
            {/* Average runtime */}
            <p>
              <span>⏳</span>
              <span>{avgRuntime.toFixed(0)} min</span>
            </p>
          </div>
      </div>
    </>
  )
}

export default Summary
