'use client'

import { Card } from '../atoms/Card'
import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'
import AddToCartButton from '../AddToCartButton'
import Image from 'next/image'

// Helper function to get image path based on product name
function getProductImage(productName) {
  if (!productName) return null
  
  const imageMap = {
    'Mocha': '/Photo/mocha.jpg',
    'Cappuccino': '/Photo/Cappucino.jpg',
    'Espresso': '/Photo/Espresso.jpg',
    'Latte': '/Photo/Latte.jpg',
    'Americano': '/Photo/Americano.jpg',
    'Nest coffee': '/Photo/Nestcoffee2.jpg',
    'Coke': '/Photo/Coke.jpg',
    'Fanta Red': '/Photo/Fanta.jpg',
    'Fanta O': '/Photo/Fanta.jpg',
    'Fanta Green': '/Photo/Fanta.jpg',
    'OISHI': '/Photo/OISHI.png',
    'water': '/Photo/water.jpg',
    'Est': '/Photo/Est.png',
    'SPRITE': '/Photo/SPRITE.jpg',
    'TEA': '/Photo/Tea.jpg',
    'Green Tea': '/Photo/green tea.jpg',
    'Black Tea': '/Photo/Tea.jpg',
    'TEA Lemon': '/Photo/Tea.jpg',
    'Lemon+H': '/Photo/Tea.jpg',
    'RedsLemon': '/Photo/redsoda.jpg',
    'Nest TEA': '/Photo/Tea.jpg',
    'Red soda': '/Photo/redsoda.jpg',
    'Green soda': '/Photo/greensoda.jpg',
    'Coco': '/Photo/OISHI.png',
    'M150 pepo': '/Photo/Fanta.jpg',
    'Yacol pepo': '/Photo/Fanta.jpg',
    'Milk Pink': '/Photo/Fanta.jpg',
    'Red soda(S)': '/Photo/redsoda.jpg',
    'Coffee old': '/Photo/coffee1.png',
    'G soda(S)': '/Photo/greensoda.jpg',
    'Rednosoda': '/Photo/redsoda.jpg',
    'Gnosoda': '/Photo/greensoda.jpg',
  }
  
  // Try exact match first
  if (imageMap[productName]) {
    return imageMap[productName]
  }
  
  // Try case-insensitive partial match
  const normalizedName = productName.toLowerCase()
  for (const [key, path] of Object.entries(imageMap)) {
    if (key.toLowerCase() === normalizedName || normalizedName.includes(key.toLowerCase())) {
      return path
    }
  }
  
  // Default fallback image
  return '/Photo/coffee1.png'
}

export function ProductCard({ 
  product, 
  onAddToCart,
  showAddButton = true,
  className = '',
  mobileView = false,
  ...props 
}) {
  const isDisabled = !product || product.price === 0 || product.name === 'Null' || product.name === 'Null---'
  const imagePath = getProductImage(product?.name)

  // Mobile View - Horizontal Card Layout
  if (mobileView) {
    return (
      <Card 
        className={`${isDisabled ? 'opacity-50' : ''} ${className}`}
        {...props}
      >
        <div className="card-body">
          <div className="row g-3 align-items-center">
            {/* Image Column */}
            {imagePath && (
              <div className="col-4">
                <div className="position-relative" style={{ height: '100px', overflow: 'hidden', borderRadius: '8px' }}>
                  <Image
                    src={imagePath}
                    alt={product?.name || 'Product image'}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 33vw"
                  />
                </div>
              </div>
            )}
            
            {/* Content Column */}
            <div className={imagePath ? 'col-8' : 'col-12'}>
              <div className="d-flex flex-column h-100">
                <div className="mb-2">
                  <h6 className="card-title fw-bold mb-1">{product?.name || 'Unknown'}</h6>
                  {product?.Type && (
                    <Badge variant="secondary" size="sm" className="me-2">{product.Type}</Badge>
                  )}
                </div>
                
                <div className="mb-2">
                  <div className="row g-2">
                    <div className="col-6">
                      <small className="text-muted d-block mb-1">Type:</small>
                      <span className="text-dark fw-medium">{product?.Type || 'N/A'}</span>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block mb-1">Price:</small>
                      <span className="text-success fw-bold">{product?.price ? `฿${product.price}` : '฿0'}</span>
                    </div>
                  </div>
                </div>

                {showAddButton && !isDisabled && (
                  <div className="mt-auto">
                    <AddToCartButton 
                      item={product} 
                      className="btn-primary w-100 btn-sm"
                    />
                  </div>
                )}
                
                {isDisabled && (
                  <Button 
                    variant="secondary" 
                    disabled 
                    className="w-100 btn-sm"
                  >
                    Unavailable
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  // Desktop View - Vertical Card Layout
  return (
    <Card 
      className={`h-100 ${isDisabled ? 'opacity-50' : ''} ${className}`}
      {...props}
    >
      <div className="d-flex flex-column h-100">
        {/* Product Image */}
        {imagePath && (
          <div className="mb-2 position-relative" style={{ height: '120px', overflow: 'hidden', borderRadius: '8px' }}>
            <Image
              src={imagePath}
              alt={product?.name || 'Product image'}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />
          </div>
        )}
        
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
