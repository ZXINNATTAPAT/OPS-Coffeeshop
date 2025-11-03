'use client'

import { CartProvider } from '../contexts/CartContext'

export function ClientProviders({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  )
}

