'use client'

import { createContext, useContext, useState } from 'react'
import type { Product } from '../types/product'

export interface CartItem {
  product: Product
  size: string
  quantity: number
}

interface CartContextValue {
  cartItems: CartItem[]
  totalItems: number
  addToCart: (product: Product, size: string, quantity: number) => void
  updateQuantity: (productId: number, size: string, quantity: number) => void
  removeFromCart: (productId: number, size: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (product: Product, size: string, quantity: number) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id && item.size === size
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [...currentItems, { product, size, quantity }]
    })
  }

  const updateQuantity = (
    productId: number,
    size: string,
    quantity: number
  ) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    )
  }

  const removeFromCart = (productId: number, size: string) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.product.id !== productId || item.size !== size
      )
    )
  }

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart harus digunakan di dalam CartProvider')
  }

  return context
}
