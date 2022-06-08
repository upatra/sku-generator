import React, { forwardRef, useImperativeHandle } from 'react'
import { useFormik } from 'formik'
import { uniqBy, pick } from 'lodash'

import { translateToChinese } from 'lib'
import { VariantFormRef, Variant, VariantDefaultProp } from 'models'
import Badge from '@/components/badge'

import InputColor from './input-variant'

type Props = {
  title: string
  defaults: VariantDefaultProp[]
  isHideVariantCode: boolean
  inputTitleName: string
  inputTitleCode: string
}

const VariantForm = forwardRef<VariantFormRef, Props>(function ProductForm(
  { title, defaults, isHideVariantCode, inputTitleName, inputTitleCode },
  ref
) {
  const formik = useFormik({
    initialValues: {
      variants: [],
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const { values, handleSubmit, setFieldValue, resetForm } = formik

  const onUpdateVariants = (updatedColors: Variant[]) => {
    const uniqueVariants = uniqBy(updatedColors, (item) =>
      JSON.stringify(pick(item, ['variantName', 'variantCode']))
    )
    setFieldValue('variants', uniqueVariants)
  }

  const onUseDefaultVariants = (defaultVariants: Variant[]) => {
    onUpdateVariants(defaultVariants)
  }

  const onClearAll = () => {
    setFieldValue('variants', [])
  }

  const addCustomVariant = (variantName: string, variantCode: string) => {
    const newVariants = [...values.variants, { variantName, variantCode }]
    onUpdateVariants(newVariants)
  }

  const removeVariant = (array: Variant[], id: number) => {
    setFieldValue(
      'variants',
      array.filter((value: Variant, index: number) => index !== id)
    )
  }

  const translateListVariantNameToChinese = async () => {
    if (values.variants.length > 0) {
      try {
        const results = await Promise.all(
          values.variants.map(async (value: Variant) => {
            const response = await translateToChinese(value.variantName ?? '')
            value.variantNameCn =
              response.data.data.translations[0].translatedText
            return value
          })
        )

        setFieldValue('variants', results)

        return Promise.resolve(true)
      } catch (err) {
        console.error(err)
        return Promise.resolve(false)
      }
    }

    return Promise.resolve(false)
  }

  useImperativeHandle(ref, () => ({
    getVariants: () => {
      return values.variants
    },
    reset: () => {
      resetForm()
    },
    translate: translateListVariantNameToChinese,
  }))

  return (
    <form onSubmit={handleSubmit}>
      <div className="pt-8">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <div className="relative flex items-center">
            <div className="flex text-sm ml-auto">
              {defaults.map((item: VariantDefaultProp, index: number) => (
                <button
                  key={`${item.label}-${index}`}
                  type="button"
                  className="ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => onUseDefaultVariants(item.values)}
                >
                  {item.label}
                </button>
              ))}

              {values.variants.length > 0 && (
                <button
                  type="button"
                  className="ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={onClearAll}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          {values.variants.map((color: Variant, index, array) => (
            <Badge
              key={index}
              id={index}
              array={array}
              name={color.variantName}
              subName={color.variantNameCn}
              code={color.variantCode}
              removeMe={removeVariant}
            />
          ))}
        </div>
        <InputColor
          onAddNewvariant={addCustomVariant}
          isHideVariantCode={isHideVariantCode}
          titleCode={inputTitleCode}
          titleName={inputTitleName}
        />
      </div>
    </form>
  )
})

export default VariantForm
