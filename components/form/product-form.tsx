import React, { forwardRef, useImperativeHandle } from 'react'
import { useFormik } from 'formik'
import { isEmpty } from 'lodash'

import { ProductFormRef } from 'models'
import { translateToChinese } from 'lib'

import { ProductSchema } from './schema'

const ProductForm = forwardRef<ProductFormRef>(function ProductForm(_, ref) {
  const formik = useFormik({
    initialValues: {
      productName: '',
      productSku: '',
      productNameCn: '',
    },
    initialTouched: {
      productName: true,
      productSku: true,
    },
    validateOnMount: true,
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const {
    values,
    errors,
    getFieldProps,
    touched,
    isValid,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = formik

  const translateProductName = async () => {
    if (!isEmpty(values.productName)) {
      try {
        const response = await translateToChinese(values.productName)
        setFieldValue(
          'productNameCn',
          response.data.data.translations[0].translatedText
        )
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
    getProduct: () => {
      return {
        productName: values.productName.trim(),
        productSku: values.productSku.trim(),
        productNameCn: values.productNameCn.trim(),
      }
    },
    reset: () => {
      resetForm()
    },
    translate: translateProductName,
  }))

  return (
    <form onSubmit={handleSubmit}>
      <div className="pt-8">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Product Information
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Lorem dipsum dolor sit amet
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="product-name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                {...getFieldProps('productName')}
              />
              {touched.productName && errors.productName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productName}
                </p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="product-sku"
              className="block text-sm font-medium text-gray-700"
            >
              Product SKU
            </label>
            <div className="mt-1">
              <input
                type="text"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                {...getFieldProps('productSku')}
              />
              {touched.productSku && errors.productSku && (
                <p className="text-red-500 text-sm mt-1">{errors.productSku}</p>
              )}
            </div>
          </div>
        </div>
        {!isEmpty(values.productNameCn) && (
          <label
            htmlFor="product-name"
            className="mt-3 block text-sm font-medium text-gray-700"
          >
            Chinese: {values.productNameCn}
          </label>
        )}
      </div>
    </form>
  )
})

export default ProductForm
