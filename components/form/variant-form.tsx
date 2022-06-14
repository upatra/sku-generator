import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useEffect,
} from 'react'
import { useFormik } from 'formik'
import { uniqBy, pick } from 'lodash'

import { translateToChinese } from 'lib'
import {
  VariantFormRef,
  Variant,
  VariantDefaultProp,
  VariantType,
  VariantSelect,
  VariantForm,
} from 'models'
import Badge from '@/components/badge'
import {
  getDefaultColors,
  getBasicColors,
  getDefaultSets,
  getLargeSets,
  getNumericSizes,
  getRomanSizes,
} from '@/lib/default'

import InputVariant from './input-variant'
import { VariantFormSchema } from './schema'

const VariantForm = forwardRef<VariantFormRef>(function ProductForm(_, ref) {
  const formik = useFormik<VariantForm>({
    initialValues: {
      label: '',
      type: VariantType.Custome,
      defaults: [],
      variants: [],
      isHideVariantCode: false,
      inputTitleName: 'Variant Name',
      inputTitleCode: 'Variant Code',
    },
    initialTouched: {
      label: true,
    },
    validationSchema: VariantFormSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const {
    values,
    handleSubmit,
    setFieldValue,
    resetForm,
    getFieldProps,
    errors,
    touched,
    isValid,
    setValues,
  } = formik

  const {
    label,
    type,
    defaults = [],
    variants = [],
    isHideVariantCode,
    inputTitleName,
    inputTitleCode,
  } = values

  const listVarianTypes = useMemo<VariantSelect[]>(
    () => [
      {
        label: 'Colors',
        value: VariantType.Colors,
      },
      {
        label: 'Sets',
        value: VariantType.Sets,
      },
      {
        label: 'Sizes',
        value: VariantType.Sizes,
      },
      {
        label: 'Custome',
        value: VariantType.Custome,
      },
    ],
    []
  )

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
    const newVariants = [
      ...variants,
      { variantName: variantName.trim(), variantCode: variantCode.trim() },
    ]
    onUpdateVariants(newVariants)
  }

  const removeVariant = (array: Variant[], id: number) => {
    setFieldValue(
      'variants',
      array.filter((value: Variant, index: number) => index !== id)
    )
  }

  const translateListVariantNameToChinese = async () => {
    if (variants.length > 0) {
      try {
        const results = await Promise.all(
          variants.map(async (value: Variant) => {
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
    isValid: () => isValid,
    getProperty: () => {
      return {
        label,
        variants,
      }
    },
    reset: () => {
      resetForm()
    },
    translate: translateListVariantNameToChinese,
  }))

  useEffect(() => {
    switch (type) {
      case VariantType.Custome:
        setValues({
          label: '',
          type,
          defaults: [],
          variants: [],
          isHideVariantCode: false,
          inputTitleName: 'Variant Name',
          inputTitleCode: 'Variant Code',
        })
        break
      case VariantType.Colors:
        setValues({
          label: 'Colors',
          type,
          defaults: defaultColors,
          variants: [],
          isHideVariantCode: false,
          inputTitleName: 'Color Name',
          inputTitleCode: 'Color Code',
        })
        break
      case VariantType.Sets:
        setValues({
          label: 'Sets',
          type,
          defaults: defaultSets,
          variants: [],
          isHideVariantCode: false,
          inputTitleName: 'Set Name',
          inputTitleCode: 'Set Code',
        })
        break
      case VariantType.Sizes:
        setValues({
          label: 'Sizes',
          type,
          defaults: defaultSizes,
          variants: [],
          isHideVariantCode: true,
          inputTitleName: 'Size Name',
          inputTitleCode: 'Size Code',
        })
        break
    }
  }, [type])

  return (
    <form onSubmit={handleSubmit}>
      <div className="pt-8">
        <div className="flex items-end justify-between">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              id="location"
              name="location"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue={type}
              onChange={(e) =>
                setFieldValue('type', parseInt(e.target.value, 10))
              }
            >
              {listVarianTypes.map((item, index) => (
                <option key={`${item.value}-${index}`} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
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

              {variants.length > 0 && (
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
        {type === VariantType.Custome && (
          <div className="mt-5">
            <label
              htmlFor="product-name"
              className="block text-sm font-medium text-gray-700"
            >
              Property Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                {...getFieldProps('label')}
              />
              {touched.label && errors.label && (
                <p className="text-red-500 text-sm mt-1">{errors.label}</p>
              )}
            </div>
          </div>
        )}

        <InputVariant
          onAddNewvariant={addCustomVariant}
          isHideVariantCode={isHideVariantCode}
          titleCode={inputTitleCode}
          titleName={inputTitleName}
        />

        <div className="mt-6">
          {variants.map((variant: Variant, index, array) => (
            <Badge
              key={index}
              id={index}
              array={array}
              name={variant.variantName}
              subName={variant.variantNameCn}
              code={isHideVariantCode ? '' : variant.variantCode}
              removeMe={removeVariant}
            />
          ))}
        </div>
      </div>
    </form>
  )
})

export default VariantForm
