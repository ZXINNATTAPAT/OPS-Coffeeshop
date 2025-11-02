'use client'

import { useState } from 'react'
import { useCart } from '../contexts/CartContext'

export default function AddToCartButton({ item, className = '' }) {
  const { addToCart, loading, error } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleClick = async (e) => {
    e.preventDefault()
    
    if (!item || item.price === 0 || item.name === 'Null' || item.name === 'Null---') {
      return
    }

    if (isAdding || loading) return

    setIsAdding(true)
    setShowSuccess(false)

    try {
      // Validate item before adding
      const validatedItem = {
        id_pd: item.id_pd || '',
        name: item.name || '',
        Type: item.Type || '',
        quantity: item.quantity || 1,
        price: parseFloat(item.price) || 0,
      }

      // Validate required fields
      if (!validatedItem.id_pd || !validatedItem.name || validatedItem.price <= 0) {
        throw new Error('Invalid item data')
      }

      await addToCart(validatedItem)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 1000)
    } catch (err) {
      console.error('Error adding to cart:', err)
    } finally {
      setIsAdding(false)
    }
  }

  const isDisabled = isAdding || loading || !item || item.price === 0 || item.name === 'Null' || item.name === 'Null---'

  return (
    <button
      type="button"
      className={`btn ${className} ${isDisabled ? 'disabled' : ''}`}
      onClick={handleClick}
      disabled={isDisabled}
      style={{
        position: 'relative',
        opacity: isDisabled ? 0.6 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      {isAdding ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Adding...
        </>
      ) : showSuccess ? (
        <>
          <span className="me-2">✅</span>
          Added!
        </>
      ) : (
        item?.name || 'Add to Cart'
      )}
    </button>
  )
}
