import React from "react";

// Type definition for button component props
type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
}

/**
 * Button Component
 * 
 * A reusable button component with customizable content and click handler.
 * Used for toggle buttons in collapsible panels.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Optional click handler function
 * @param {React.ReactNode} props.children - Content to be displayed inside the button
 */
function Button({ onClick, children }: ButtonProps) {

  return (
    <>
      <button
        className="btn-toggle"
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export default Button
