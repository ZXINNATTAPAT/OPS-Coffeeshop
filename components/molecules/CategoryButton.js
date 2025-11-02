'use client'

import { Button } from '../atoms/Button'

export function CategoryButton({ 
  category, 
  isActive = false,
  onClick,
  className = '',
  ...props 
}) {
  return (
    <Button
      variant={isActive ? 'primary' : 'secondary'}
      size="sm"
      onClick={onClick}
      className={`category-btn ${isActive ? 'active' : ''} ${className}`}
      style={{
        backgroundColor: isActive ? (category.bgColor || '#007bff') : '#6c757d',
        color: 'white',
        border: 'none',
        transition: 'all 0.3s ease',
        boxShadow: isActive ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
        transform: isActive ? 'translateY(-2px)' : 'none',
        ...(props.style || {}),
      }}
      onMouseEnter={(e) => {
        if (!isActive && category.bgColor) {
          e.target.style.backgroundColor = category.bgColor
          e.target.style.transform = 'translateY(-2px)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.target.style.backgroundColor = '#6c757d'
          e.target.style.transform = 'none'
        }
      }}
      {...props}
    >
      <span className="me-1">{category.icon}</span>
      {category.label || category.name}
    </Button>
  )
}
