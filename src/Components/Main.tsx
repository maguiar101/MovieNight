
// Type definition for component props
type Prop = {
  children: React.ReactNode;
}

/**
 * Main Component
 * 
 * A wrapper component that provides the main content area structure.
 * Uses CSS Flexbox to organize the two movie panels side by side.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be displayed inside the main area
 */
function Main({ children }: Prop) {

  return (
    <>
     <main className="main">
       {children}
     </main>
    </>
  )
}

export default Main