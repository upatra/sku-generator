import React, { useRef, useMemo, useState } from 'react'
import { isEmpty } from 'lodash'

import {
  ProductFormRef,
  VariantFormRef,
  Variant,
  Product,
  SkuGenerator,
  VariantDefaultProp,
} from '@/models'
import Layout from '@/components/layout'
import ProductForm from '@/components/form/product-form'
import VariantForm from '@/components/form/variant-form'
import SkuTable from '@/components/sku-table'
import {
  getDefaultColors,
  getBasicColors,
  getDefaultSets,
  getLargeSets,
  getNumericSizes,
  getRomanSizes,
} from '@/lib/default'

export default function Page() {
  const [listGeneratedSku, setListGeneratedSku] = useState<SkuGenerator[]>([])
  const productRef = useRef<ProductFormRef>(null)
  const colorRef = useRef<VariantFormRef>(null)
  const setRef = useRef<VariantFormRef>(null)
  const sizeRef = useRef<VariantFormRef>(null)

  const defaultColors = useMemo<VariantDefaultProp[]>(
    () => [
      { label: 'Use Basic Colors', values: getBasicColors() },
      { label: 'Use Default Colors', values: getDefaultColors() },
    ],
    []
  )
  const defaultSets = useMemo<VariantDefaultProp[]>(
    () => [
      { label: 'Use Large Sets', values: getLargeSets() },
      { label: 'Use Default Sets', values: getDefaultSets() },
    ],
    []
  )
  const defaultSizes = useMemo<VariantDefaultProp[]>(
    () => [
      { label: 'Use Numeric Sizes', values: getNumericSizes() },
      { label: 'Use Default Sizes', values: getRomanSizes() },
    ],
    []
  )

  const onGenerateSku = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const isValid = productRef.current ? productRef.current.isValid() : false
    const product: Product | null = productRef.current
      ? productRef.current.getProduct()
      : null
    const colors: Variant[] = colorRef.current
      ? colorRef.current.getVariants()
      : []
    const sets: Variant[] = setRef.current ? setRef.current.getVariants() : []
    const sizes: Variant[] = sizeRef.current
      ? sizeRef.current.getVariants()
      : []

    if (isValid && product) {
      const listSku: SkuGenerator[] = colors
        .map((color: Variant) => ({
          productName: product.productName,
          productSku: product.productSku,
          colorCode: color.variantCode,
          colorName: color.variantName,
        }))
        .flatMap((sku: SkuGenerator) =>
          sets.map((set: Variant) => ({
            ...sku,
            setName: set.variantName,
            setCode: set.variantCode,
          }))
        )
        .flatMap((sku: SkuGenerator) =>
          sizes.map((size: Variant) => ({
            ...sku,
            size: size.variantName,
          }))
        )
        .map((sku: SkuGenerator) => ({
          ...sku,
          skuByCode: generateSkuByCode(
            sku.productName ?? '',
            sku.productSku ?? '',
            sku.colorCode,
            sku.setCode,
            sku.size
          ),
          skuByName: generateSkuByName(
            sku.productName ?? '',
            sku.productSku ?? '',
            sku.colorName,
            sku.setName,
            sku.size
          ),
        }))
      setListGeneratedSku(listSku)
    }
  }

  const generateSkuByCode = (
    productName: string,
    productSku: string,
    colorCode?: string,
    setCode?: string,
    size?: string
  ) => {
    let skuByCode = `${productName}_${productSku}`

    if (!isEmpty(colorCode)) {
      skuByCode = skuByCode.concat(`_${colorCode}`)
    }

    if (!isEmpty(setCode)) {
      skuByCode = skuByCode.concat(`_${setCode}`)
    }

    if (!isEmpty(size)) {
      skuByCode = skuByCode.concat(`_${size}`)
    }

    return skuByCode
  }

  const generateSkuByName = (
    productName: string,
    productSku: string,
    colorName?: string,
    setName?: string,
    size?: string
  ) => {
    let skuByName = `${productName}_${productSku}`

    if (!isEmpty(colorName)) {
      skuByName = skuByName.concat(`_${colorName}`)
    }

    if (!isEmpty(setName)) {
      skuByName = skuByName.concat(`_${setName}`)
    }

    if (!isEmpty(size)) {
      skuByName = skuByName.concat(`_${size}`)
    }

    return skuByName
  }

  const onReset = () => {
    if (productRef.current) productRef.current.reset()
    if (colorRef.current) colorRef.current.reset()
    if (setRef.current) setRef.current.reset()
    if (sizeRef.current) sizeRef.current.reset()
  }

  return (
    <Layout>
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          {/* Product Basic */}
          <ProductForm ref={productRef} />

          {/* Colors */}
          <VariantForm
            ref={colorRef}
            defaults={defaultColors}
            isHideVariantCode={false}
            title="Colors"
            inputTitleCode="Color Code"
            inputTitleName="Color Name"
          />

          {/* Sets */}
          <VariantForm
            ref={setRef}
            defaults={defaultSets}
            isHideVariantCode={false}
            title="Sets"
            inputTitleCode="Set Code"
            inputTitleName="Set Name"
          />

          {/* Size */}
          <VariantForm
            ref={sizeRef}
            defaults={defaultSizes}
            isHideVariantCode={true}
            title="Sizes"
            inputTitleCode=""
            inputTitleName="Size"
          />
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onGenerateSku}
            >
              Generate
            </button>
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        </div>

        <SkuTable data={listGeneratedSku} />
      </div>
    </Layout>
  )
}
