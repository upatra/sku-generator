
export interface Property {
  id?: string;
  label?: string;
  variants?: Variant[];
}

export interface Variant {
  variantName?: string
  variantCode?: string
  variantNameCn?: string
}

export enum VariantType {
  Colors = 0,
  Sets,
  Sizes,
  Custome,
}

export interface VariantSelect {
  label: string
  value: VariantType
}

export interface VariantForm {
  label: string
  type: VariantType
  defaults?: VariantDefaultProp[]
  variants?: Variant[]
  isHideVariantCode?: boolean
  inputTitleName?: string
  inputTitleCode?: string
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
  isValid: () => boolean
  getProperty: () => Property
  reset: () => void
  translate: () => Promise<boolean>
}
