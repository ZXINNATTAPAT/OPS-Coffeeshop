'use client'

import { Input } from '../atoms/Input'
import { Badge } from '../atoms/Badge'

export function FormField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  helpText,
  addon,
  className = '',
  ...props
}) {
  return (
    <Input
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
      required={required}
      disabled={disabled}
      className={className}
      {...props}
    >
      {addon && (
        <div className="input-group">
          {typeof addon === 'string' ? (
            <span className="input-group-text">{addon}</span>
          ) : (
            addon
          )}
        </div>
      )}
      {helpText && (
        <div className="form-text text-muted">
          {helpText}
        </div>
      )}
    </Input>
  )
}
