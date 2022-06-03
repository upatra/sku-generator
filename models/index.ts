export interface Variant {
  variantName?: string
  variantCode?: string
}

export interface SkuGenerator {
  productName?: string
  productSku?: string
  skuByCode?: string
  skuByName?: string
  colorName?: string
  colorCode?: string
  setName?: string
  setCode?: string
  size?: string
}

export interface Product {
  productName: string
  productSku: string
}

export interface ProductFormRef {
  isValid: () => boolean
  getProduct: () => Product
  reset: () => void
}

export interface VariantFormRef {
  getVariants: () => Variant[]
  reset: () => void
}
