export interface Variant {
  variantName?: string
  variantCode?: string
  variantNameCn?: string
}

export interface VariantDefaultProp {
  label: string
  values: Variant[]
}

export interface SkuGenerator {
  productName?: string
  productNameCn?: string
  productSku?: string
  skuByCode?: string
  skuByName?: string
  skuChinese?: string
  colorName?: string
  colorCode?: string
  colorNameCn?: string
  setName?: string
  setCode?: string
  size?: string
}

export interface Product {
  productName: string
  productSku: string
  productNameCn?: string
}

export interface ProductFormRef {
  isValid: () => boolean
  getProduct: () => Product
  reset: () => void
  translate: () => void
}

export interface VariantFormRef {
  getVariants: () => Variant[]
  reset: () => void
  translate: () => Promise<boolean>
}
