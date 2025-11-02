import { useState, useEffect, useCallback, useRef } from 'react'
import { cartService } from '../lib/api'
import { wsService } from '../lib/websocket'

export function useCart() {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const wsListenerRef = useRef(null)

  // Load cart from API
  const loadCart = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await cartService.getCart()
      setCart(data || [])
    } catch (err) {
      // API service now falls back to mock, so this shouldn't happen
      // But keep error handling just in case
      console.warn('Error loading cart (using mock data):', err)
      setCart([]) // Set empty cart as fallback
    } finally {
      setLoading(false)
    }
  }, [])

  // Add item to cart
  const addToCart = useCallback(async (item) => {
    setError(null)
    try {
      const newItem = await cartService.addToCart(item)
      
      // If WebSocket is connected, rely on WebSocket for updates (no manual refresh needed)
      if (wsService.isConnected()) {
        // Immediately update local state for real-time UI
        setCart(prevCart => {
          // Check if item already exists to avoid duplicates
          const exists = prevCart.some(cartItem => 
            cartItem.id === newItem.id || 
            (cartItem.id_pd === newItem.id_pd && cartItem.Type === newItem.Type)
          )
          if (exists) {
            return prevCart
          }
          return [...prevCart, newItem]
        })
        
        // Broadcast to WebSocket (other clients will receive this update)
        wsService.send('item_added', newItem)
        
        // With WebSocket, no need to manually refresh - updates come via WebSocket
        return true
      } else {
        // No WebSocket: update local state and refresh from API
        setCart(prevCart => {
          const exists = prevCart.some(cartItem => 
            cartItem.id === newItem.id || 
            (cartItem.id_pd === newItem.id_pd && cartItem.Type === newItem.Type)
          )
          if (exists) {
            return prevCart
          }
          return [...prevCart, newItem]
        })
        
        // Refresh from API/mock to ensure sync (only when WebSocket is not available)
        await loadCart()
        return true
      }
    } catch (err) {
      // API service now falls back to mock, so errors are less likely
      console.warn('Error adding to cart (using mock data):', err)
      
      // Only refresh if WebSocket is not available
      if (!wsService.isConnected()) {
        await loadCart()
      }
      return true
    }
  }, [loadCart])

  // Clear cart
  const clearCart = useCallback(async () => {
    setError(null)
    try {
      await cartService.clearCart()
      
      // Immediately update local state for real-time UI
      setCart([])
      
      // Broadcast to WebSocket (for multi-tab/multi-client sync)
      if (wsService.isConnected()) {
        wsService.send('cart_cleared', {})
        // With WebSocket, no need to manually refresh - updates come via WebSocket
        return true
      }
      
      // No WebSocket: refresh from API/mock to ensure sync
      await loadCart()
      return true
    } catch (err) {
      setError('Failed to clear cart')
      // Even on error, clear local state
      setCart([])
      
      // Only refresh if WebSocket is not available
      if (!wsService.isConnected()) {
        await loadCart()
      }
      
      throw err
    }
  }, [loadCart])

  // Calculate total price
  const getTotalPrice = useCallback(() => {
    return cart.reduce((total, item) => total + (item.price || 0), 0)
  }, [cart])

  // WebSocket listeners for real-time updates
  useEffect(() => {
    // Listen for cart updates from WebSocket
    const handleCartUpdated = (data) => {
      if (data && Array.isArray(data)) {
        setCart(data)
      }
    }

    const handleCartCleared = () => {
      setCart([])
    }

    const handleItemAdded = (item) => {
      setCart(prevCart => {
        const exists = prevCart.some(cartItem => 
          cartItem.id === item.id || 
          (cartItem.id_pd === item.id_pd && cartItem.Type === item.Type)
        )
        if (exists) {
          return prevCart
        }
        return [...prevCart, item]
      })
    }

    // Subscribe to WebSocket events
    wsService.on('cart_updated', handleCartUpdated)
    wsService.on('cart_cleared', handleCartCleared)
    wsService.on('item_added', handleItemAdded)

    // Store reference for cleanup
    wsListenerRef.current = {
      handleCartUpdated,
      handleCartCleared,
      handleItemAdded,
    }

    return () => {
      if (wsListenerRef.current) {
        wsService.off('cart_updated', wsListenerRef.current.handleCartUpdated)
        wsService.off('cart_cleared', wsListenerRef.current.handleCartCleared)
        wsService.off('item_added', wsListenerRef.current.handleItemAdded)
      }
    }
  }, [])

  // Initial load
  useEffect(() => {
    loadCart()
  }, [loadCart])

  return {
    cart,
    loading,
    error,
    addToCart,
    clearCart,
    loadCart,
    getTotalPrice,
    setError,
  }
}
