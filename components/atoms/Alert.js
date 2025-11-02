'use client'

import { useState } from 'react'

export function Alert({ 
  children, 
  variant = 'primary', 
  dismissible = false,
  onDismiss,
  className = '',
  ...props 
}) {
  const [show, setShow] = useState(true)

  if (!show) return null

  const handleDismiss = () => {
    setShow(false)
    if (onDismiss) onDismiss()
  }

  return (
    <div 
      className={`alert alert-${variant} ${dismissible ? 'alert-dismissible fade show' : ''} ${className}`}
      role="alert"
      {...props}
    >
      {children}
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          onClick={handleDismiss}
          aria-label="Close"
        ></button>
      )}
    </div>
  )
}
