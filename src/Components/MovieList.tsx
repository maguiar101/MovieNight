import { useState } from "react";
import Button from "./Button.tsx";

// Type definition for component props
type Prop = { 
    children: React.ReactNode
}

/**
 * MovieList Component
 * 
 * A collapsible container component that wraps movie-related content.
 * Features a toggle button to show/hide the content and manages its own visibility state.
 * Used for both the search results panel and the watched movies panel.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be displayed inside the collapsible container
 */
function MovieList({ children }: Prop) {
    // State to control whether the list content is visible
    const [isOpen, setIsOpen] = useState(true);

  return (
    <>  
        <div className="box">
            {/* Toggle button to show/hide the content */}
            <Button onClick={() => setIsOpen((open) => !open)} >
                {isOpen ? "–" : "+"}
            </Button>
            
            {/* Conditionally render children based on isOpen state */}
            {isOpen && 
                <>{children}</>
            } 
        </div>
    </>
  )
}

export default MovieList;
