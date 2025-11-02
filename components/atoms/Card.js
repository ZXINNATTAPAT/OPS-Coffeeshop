'use client'

export function Card({ 
  children, 
  title, 
  subtitle,
  header,
  footer,
  className = '',
  shadow = true,
  border = true,
  ...props 
}) {
  return (
    <div 
      className={`card ${shadow ? 'shadow-sm' : ''} ${border ? '' : 'border-0'} ${className}`}
      {...props}
    >
      {(title || subtitle || header) && (
        <div className="card-header bg-white">
          {header || (
            <>
              {title && <h5 className="card-title mb-0">{title}</h5>}
              {subtitle && <p className="card-subtitle text-muted mb-0">{subtitle}</p>}
            </>
          )}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer bg-white">
          {footer}
        </div>
      )}
    </div>
  )
}
