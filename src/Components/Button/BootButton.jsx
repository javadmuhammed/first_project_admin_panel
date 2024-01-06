import React from 'react'

function BootButton({ onClick, children, className }) {
  return (
    <button onClick={onClick} className={`btn btn-${className}`}>{children}</button>
  )
}

export default BootButton
