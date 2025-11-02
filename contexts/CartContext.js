'use client'

import { createContext, useContext } from 'react'
import { useCart as useCartHook } from '../hooks/useCart'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const cartData = useCartHook()
  
  return (
    <CartContext.Provider value={cartData}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

