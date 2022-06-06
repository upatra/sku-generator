import React, { forwardRef, useImperativeHandle } from 'react'
import { useFormik } from 'formik'

import { ProductFormRef } from 'models'

import { ProductSchema } from './schema'

const ProductForm = forwardRef<ProductFormRef>(function ProductForm(_, ref) {
  const formik = useFormik({
    initialValues: {
      productName: '',
      productSku: '',
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
  } = formik

  useImperativeHandle(ref, () => ({
    isValid: () => isValid,
    getProduct: () => {
      return { productName: values.productName, productSku: values.productSku }
    },
    reset: () => {
      resetForm()
    },
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
      </div>
    </form>
  )
})

export default ProductForm
