import { string, object, SchemaOf, array, boolean, number } from 'yup'

import { Product, VariantForm } from 'models'

export const ProductSchema: SchemaOf<Product> = object({
  productName: string().required('Please input product name'),
  productSku: string().required('Please input product sku'),
  productNameCn: string().optional(),
}).defined()

export const VariantFormSchema: SchemaOf<VariantForm> = object({
  label: string().required('Please input property name'),
  type: number().required('Please input type'),
  defaults: array().optional(),
  variants: array().optional(),
  isHideVariantCode: boolean().optional(),
  inputTitleName: string().optional(),
  inputTitleCode: string().optional(),
}).defined()
