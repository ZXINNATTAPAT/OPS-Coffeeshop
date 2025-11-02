'use client'

export function Badge({ 
  children, 
  variant = 'secondary', 
  size = 'md',
  className = '',
  ...props 
}) {
  const sizeClasses = {
    sm: '',
    md: '',
    lg: 'badge-lg',
  }

  return (
    <span 
      className={`badge bg-${variant} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
