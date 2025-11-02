'use client'

import { Card } from '../atoms/Card'
import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'
import AddToCartButton from '../AddToCartButton'

export function ProductCard({ 
  product, 
  onAddToCart,
  showAddButton = true,
  className = '',
  ...props 
}) {
  const isDisabled = !product || product.price === 0 || product.name === 'Null' || product.name === 'Null---'

  return (
    <Card 
      className={`h-100 ${isDisabled ? 'opacity-50' : ''} ${className}`}
      {...props}
    >
      <div className="d-flex flex-column h-100">
        <div className="mb-2">
          <h6 className="card-title fw-bold mb-1">{product?.name || 'Unknown'}</h6>
          {product?.Type && (
            <Badge variant="secondary" size="sm">{product.Type}</Badge>
          )}
        </div>
        
        <div className="mb-2 flex-grow-1">
          <div className="row g-2">
            <div className="col-6">
              <small className="text-muted d-block">Type</small>
              <input
                className="form-control form-control-sm"
                type="text"
                value={product?.Type || ''}
                readOnly
              />
            </div>
            <div className="col-6">
              <small className="text-muted d-block">Price</small>
              <input
                className="form-control form-control-sm fw-bold"
                type="text"
                value={product?.price ? `฿${product.price}` : '฿0'}
                readOnly
              />
            </div>
          </div>
        </div>

        {showAddButton && !isDisabled && (
          <div className="mt-auto">
            <AddToCartButton 
              item={product} 
              className="btn-primary w-100"
            />
          </div>
        )}
        
        {isDisabled && (
          <Button 
            variant="secondary" 
            disabled 
            className="w-100"
          >
            Unavailable
          </Button>
        )}
      </div>
    </Card>
  )
}
