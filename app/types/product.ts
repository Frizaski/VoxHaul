export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  id: number
  brand: string
  name: string
  price: number
  image: string
  gender?: string
  category?: string
  images?: string[]
  colors?: ProductColor[]
  sizes?: string[]
  description?: string
  shippingInfo?: string
  location?: string
  rating?: number
}
