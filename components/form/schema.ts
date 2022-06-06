import { string, object, SchemaOf } from 'yup'

import { Product } from 'models'

export const ProductSchema: SchemaOf<Product> = object({
  productName: string().required('Please input product name'),
  productSku: string().required('Please input product sku'),
}).defined()
