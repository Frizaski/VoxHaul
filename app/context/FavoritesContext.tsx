'use client'

import { createContext, useContext, useState } from 'react'
import type { Product } from '../types/product'

interface FavoritesContextValue {
  favorites: Product[]
  isFavorite: (productId: number) => boolean
  toggleFavorite: (product: Product) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])

  const isFavorite = (productId: number) => {
    return favorites.some((product) => product.id === productId)
  }

  const toggleFavorite = (selectedProduct: Product) => {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (product) => product.id === selectedProduct.id
      )

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (product) => product.id !== selectedProduct.id
        )
      }

      return [...currentFavorites, selectedProduct]
    })
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites harus digunakan di dalam FavoritesProvider')
  }

  return context
}
