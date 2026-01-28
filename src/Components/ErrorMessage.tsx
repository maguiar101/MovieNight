/**
 * ErrorMessage Component
 * 
 * Displays error messages to the user with a visual error indicator.
 * Used to show API errors, network issues, or other error states.
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - The error message to display
 */
export default function ErrorMessage({ message }: { message: string }) {
  return (
    <>
      <p className="error">
        <span>⛔</span> {message}
      </p>
    </>
  )
}

