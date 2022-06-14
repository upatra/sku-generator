import React, { useRef, useState, useEffect, createRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { isEmpty } from 'lodash'

import {
  ProductFormRef,
  VariantFormRef,
  SkuGenerator,
  Property,
  Product,
} from '@/models'
import Layout from '@/components/layout'
import ProductForm from '@/components/form/product-form'
import VariantForm from '@/components/form/variant-form'
import SkuTable from '@/components/sku-table'

export default function Page() {
  const [listGeneratedSku, setListGeneratedSku] = useState<SkuGenerator[]>([])
  const [isTranslation, setIsTranslation] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [listProperties, setListProperties] = useState<Property[]>([])

  const productRef = useRef<ProductFormRef>(null)
  const propertyRefs = useRef<VariantFormRef[]>([])

  const onGenerateSku = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    setIsLoading(true)
    if (isTranslation) {
      if (productRef.current) await productRef.current.translate()
      if (propertyRefs.current) {
        await Promise.all(
          propertyRefs.current.map(async (ref: VariantFormRef) => {
            await ref.translate()
          })
        )
      }
    }
    setIsLoading(false)

    const isProductValid = productRef.current
      ? productRef.current.isValid()
      : false

    if (isProductValid) {
      const product: Product | null = productRef.current
        ? productRef.current.getProduct()
        : null

      let listGenerateProperties: Property[] = []

      if (propertyRefs.current) {
        listGenerateProperties = propertyRefs.current
          .filter((ref) => {
            const isValid = ref.isValid()
            const { variants = [] } = ref.getProperty()
            return isValid && variants.length > 0
          })
          .map((ref) => ref.getProperty())
      }

      if (product && listGenerateProperties.length > 0) {
        const skuGenerator: SkuGenerator = {
          productName: product.productName,
          productSku: product.productSku,
          productNameCn: product.productNameCn,
          skuByCode: `${product.productName}_${product.productSku}_`,
          skuByName: `${product.productName}_${product.productSku}_`,
          skuByNameCn: `${product.productNameCn}/${product.productSku}/`,
        }

        const firstProperty = listGenerateProperties[0]
        const { variants = [], label } = firstProperty

        let listSku: SkuGenerator[] = variants.map((variant) => {
          const newSku = { ...skuGenerator }
          newSku[`${label} Name`] = variant.variantName
          newSku[`${label} Code`] = variant.variantCode
          newSku[`${label} Name Cn`] = variant.variantNameCn
          return newSku
        }) as SkuGenerator[]

        recursiveGenerate(listSku, 1, listGenerateProperties, (results) => {
          listSku = results
        })

        listSku = listSku.map((item: SkuGenerator) => {
          item.skuByCode += Object.keys(item)
            .filter(
              (key: string) => key.includes('Code') && key !== 'skuByCode'
            )
            .filter((key: string) => !isEmpty(item[key]))
            .map((key: string) => item[key])
            .join('_')

          item.skuByName += Object.keys(item)
            .filter(
              (key: string) =>
                !key.includes('NameCn') &&
                !key.includes('Name Cn') &&
                key.includes(' Name') &&
                key !== 'skuByName'
            )
            .filter((key: string) => !isEmpty(item[key]))
            .map((key: string) => item[key])
            .join('_')

          item.skuByNameCn += Object.keys(item)
            .filter(
              (key: string) => key.includes('Name Cn') && key !== 'skuByNameCn'
            )
            .filter((key: string) => !isEmpty(item[key]))
            .map((key: string) => item[key])
            .join('/')

          return item
        })

        console.log(listSku)

        setListGeneratedSku(listSku)
      }
    }
  }

  const recursiveGenerate = (
    listSku: SkuGenerator[],
    index: number,
    properties: Property[],
    onCallBack: (results: SkuGenerator[]) => void
  ) => {
    if (index < properties.length) {
      const property = properties[index]
      const { variants = [], label } = property

      listSku = listSku.flatMap((sku) =>
        variants.map((variant) => {
          const newSku = { ...sku }
          newSku[`${label} Name`] = variant.variantName
          newSku[`${label} Code`] = variant.variantCode
          newSku[`${label} Name Cn`] = variant.variantNameCn
          return newSku
        })
      )

      onCallBack(listSku)

      recursiveGenerate(listSku, index + 1, properties, onCallBack)
    }
  }

  const onReset = () => {
    setListGeneratedSku([])
    setIsTranslation(false)
    if (productRef.current) productRef.current.reset()
    setListProperties([])
  }

  const onAddProperty = () => {
    const propertyId = uuidv4()

    setListProperties((prev) => [...prev, { id: propertyId }])
  }

  useEffect(() => {
    propertyRefs.current = Array(listProperties.length)
      .fill(0)
      .map((_, i) => propertyRefs.current[i] || createRef())
  }, [listProperties])

  return (
    <Layout>
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          {/* Product Basic */}
          <ProductForm ref={productRef} />

          {/* Properties */}

          {listProperties.map((item: Property, index: number) => (
            <VariantForm
              key={`${item.id} -${index}`}
              ref={(cl) => {
                if (cl) {
                  propertyRefs.current[index] = cl
                }
              }}
            />
          ))}
        </div>
        <div className="pt-5 flex items-center">
          <div className="flex justify-end">
            <button
              type="button"
              className="disabled:opacity-50 mt-1 w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onAddProperty}
            >
              Add Property
            </button>
          </div>
        </div>

        <div className="pt-5 flex items-center justify-between">
          <div className="pt-5 flex items-center">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                onChange={(e) => setIsTranslation(e.target.checked)}
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700">
                Translate to Chinese
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="mr-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onGenerateSku}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-5 h-5 mr-3 -ml-1 text-indigo-500 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                'Generate'
              )}
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
        {listGeneratedSku.length > 0 && (
          <SkuTable data={listGeneratedSku} isTranslation={isTranslation} />
        )}
      </div>
    </Layout>
  )
}
