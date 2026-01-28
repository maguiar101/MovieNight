
// Type definition for component props
type Prop = {
  children: React.ReactNode;
}

/**
 * Navbar Component
 * 
 * A wrapper component that provides the navigation bar structure.
 * Uses CSS Grid layout to organize logo, search, and results count.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be displayed inside the navbar
 */
function Navbar({ children }: Prop) {

  return (
    <>
       <nav className="nav-bar">
        {children}
      </nav>
    </>
  )
}

export default Navbar
