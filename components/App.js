'use client'

import './App.css'
import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js'
import { useCart } from '../contexts/CartContext'
import { useOrders } from '../hooks/useOrders'
import { useMenu } from '../hooks/useMenu'
import { useWebSocket } from '../hooks/useWebSocket'
import { Navigation } from './organisms/Navigation'
import { CartSection } from './organisms/CartSection'
import { ProductPage } from './templates/ProductPage'
import Dashmain from './Dashboards/Dashmain'
import Tableorder from './Tableorder'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

export default function App() {
  const [inputState, setinputState] = useState("1")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  
  // Use custom hooks for data management
  const { cart, loading, error: cartError, clearCart, loadCart, getTotalPrice, setError: setCartError } = useCart()
  const { submitOrders } = useOrders()
  const { categories, loading: menuLoading, getItemsForCategory } = useMenu()
  const { isConnected: wsConnected } = useWebSocket()

  // Set default category when categories load
  useEffect(() => {
    if (categories.length > 0 && inputState === "1" && categories.find(c => c.id === "1") === undefined) {
      // If default category doesn't exist, use first available
      setinputState(categories[0].id)
    }
  }, [categories, inputState])

  // Add Settings button to categories
  const categoryButtons = [
    ...categories,
    { id: 'settings', label: 'Settings', icon: '⚙️', color: '#6C757D', bgColor: '#6C757D' },
  ]

  // Determine if a category is a product category (should show ProductPage)
  const isProductCategory = (categoryId) => {
    // Product categories are those that have items and are not special pages
    const specialPages = ['5', '6'] // Expenses, Orders
    if (!categoryId || specialPages.includes(categoryId)) {
      return false
    }
    const items = getItemsForCategory(categoryId)
    return items && items.length > 0
  }

  const handleSubmitCart = async () => {
    if (cart.length === 0) {
      setCartError('Cart is empty')
      setTimeout(() => setCartError(null), 3000)
      return
    }

    setSubmitting(true)
    setCartError(null)
    setSuccess(false)

    try {
      // Submit all orders in batch
      await submitOrders(cart)

      // Clear cart after successful submission
      await clearCart()

      setSuccess(true)
      
      // With WebSocket, cart updates automatically, no manual refresh needed
      // Only refresh if WebSocket is not available
      if (!wsConnected) {
        setTimeout(() => {
          setSuccess(false)
          loadCart() // Refresh cart only when WebSocket is not available
        }, 2000)
      } else {
        // With WebSocket, just hide success message after delay
        setTimeout(() => {
          setSuccess(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting cart:', error)
      setCartError('Failed to submit order. Please try again.')
      setTimeout(() => setCartError(null), 5000)
    } finally {
      setSubmitting(false)
    }
  }

  const handlefixCart = async () => {
    if (!confirm('Are you sure you want to clear the cart?')) {
      return
    }

    try {
      await clearCart()
      await loadCart() // Refresh cart
    } catch (error) {
      console.error('Error clearing cart:', error)
      setCartError('Failed to clear cart. Please try again.')
      setTimeout(() => setCartError(null), 3000)
    }
  }

  const error = cartError

  return (
    <div className="pos-app">
      <div className="container-fluid px-0">
        {/* Header Navigation */}
        <Navigation
          categories={categoryButtons}
          activeCategory={inputState}
          onCategoryChange={(id) => {
            if (id !== 'settings') {
              setinputState(id)
            }
          }}
        />


        {/* Main Content */}
        <div className="container my-4">
          {loading || menuLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="product-section">
              {(() => {
                // Special pages (Expenses, Orders)
                if (inputState === '5') {
                  return <Dashmain />
                }
                if (inputState === '6') {
                  return <Tableorder />
                }
                
                // Product categories (Coffee, Softdrink, Tea, Special) - use unified ProductPage
                if (isProductCategory(inputState)) {
                  return <ProductPage categoryId={inputState} />
                }
                
                // Fallback: show empty state or first available category
                const firstProductCategory = categories.find(cat => isProductCategory(cat.id))
                if (firstProductCategory) {
                  return <ProductPage categoryId={firstProductCategory.id} />
                }
                
                return (
                  <div className="text-center py-5 text-muted">
                    <div className="display-1 mb-3">📦</div>
                    <h5>No items available</h5>
                    <p className="mb-0">Add items in the Settings page</p>
                  </div>
                )
              })()}
            </div>
          )}
        </div>

        {/* Cart Section */}
        <CartSection
          cart={cart}
          totalPrice={getTotalPrice()}
          onClearCart={handlefixCart}
          onSubmitCart={handleSubmitCart}
          submitting={submitting}
          error={cartError}
          success={success}
          onDismissError={() => setCartError(null)}
          onDismissSuccess={() => setSuccess(false)}
        />
      </div>
    </div>
  )
}
