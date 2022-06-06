import Badge from '@/components/badge'
import Layout from '@/components/layout'
import { COLOR, SET, getDefaultColors } from '@/lib/default'
import axios from 'axios'
import React, { useState } from 'react'

export default function Page() {
  const DEFAULT_COLORS = getDefaultColors()
  const [colors, setColors]: [COLOR[], any] = React.useState([])
  // const [sets, setSets]: [SET[], any] = React.useState([])
  // const [sizes, setSizes]: [[], any] = React.useState([])
  const getChineseName = async (event: any) => {
    console.log(
      process.env.NEXT_PUBLIC_GOOGLE_TRANSLATION_API,
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    )

    axios
      .post(process.env.NEXT_PUBLIC_GOOGLE_TRANSLATION_API as string, null, {
        params: {
          q: 'Product',
          source: 'en',
          target: 'zh',
          key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
        },
      })
      .then(function (response) {
        console.log(response.data.data.translations[0].translatedText)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const formData = {
      productName: event.target.productName.value,
      productSku: event.target.productSku.value,
      colorsEnabled: event.target.colorsEnabled.checked,
      colors: colors,
    }

    console.log(formData)
  }

  const useDefaultColors = () => {
    setColors(DEFAULT_COLORS)
  }

  const addCustomColor = () => {
    setColors([
      ...colors,
      {
        colorName: (document.getElementById('color-name') as any).value,
        colorCode: (document.getElementById('color-code') as any).value,
      },
    ])
  }

  const removeColor = (array: any, id: any) => {
    setColors(array.filter((value: any, index: any) => index !== id))
  }

  return (
    <Layout>
      <form
        className="space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          {/* Product Basic */}
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
                    name="productName"
                    id="product-name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
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
                    name="productSku"
                    id="product-sku"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="product-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name (Chinese)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="productNameChinese"
                    id="product-name-cn"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="button"
                  className="mt-6 mt-1 w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={getChineseName}
                >
                  Get Chinese Name
                </button>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Colors
              </h3>
              <div className="relative flex items-center">
                <div className="flex items-center h-5">
                  <input
                    id="colors"
                    name="colorsEnabled"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="colors" className="font-medium text-gray-700">
                    Enable color as variant
                  </label>
                </div>
                <div className="flex text-sm ml-auto">
                  <button
                    type="button"
                    className="ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={useDefaultColors}
                  >
                    Use default
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {colors.map((color: any, index, array) => (
                <Badge
                  key={index}
                  id={index}
                  array={array}
                  name={color.colorName}
                  code={color.colorCode}
                  removeMe={removeColor}
                ></Badge>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="color-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Color Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="colorName[]"
                    id="color-name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="color-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Color Code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="colorCode[]"
                    id="color-code"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  &nbsp;
                </label>
                <button
                  type="button"
                  className="mt-1 w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={addCustomColor}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Sets */}
          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Sets
              </h3>
              <div className="relative flex items-center">
                <div className="flex items-center h-5">
                  <input
                    id="sets"
                    name="setsEnabled"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="sets" className="font-medium text-gray-700">
                    Enable Sets as variant
                  </label>
                </div>
                <div className="flex text-sm ml-auto">
                  <button
                    type="button"
                    className="ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Use default
                  </button>
                  <button
                    type="button"
                    className="ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Set
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="set-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Set Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="setName[]"
                    id="set-name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="set-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Set Code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="setCode[]"
                    id="set-code"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  &nbsp;
                </label>
                <button
                  type="button"
                  className="mt-1 w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Size */}
          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Sizes
              </h3>
              <div className="relative flex items-center">
                <div className="flex items-center h-5">
                  <input
                    id="sizes"
                    name="sizesEnabled"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="sizes" className="font-medium text-gray-700">
                    Enable Sizes as variant
                  </label>
                </div>
                <div className="flex text-sm ml-auto">
                  <button
                    type="button"
                    className="ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Use default
                  </button>
                  <button
                    type="button"
                    className="ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Size
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-1 mt-1">
                <input
                  type="text"
                  name="sizes[]"
                  id="size-1"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="sm:col-span-1 mt-1">
                <input
                  type="text"
                  name="sizes[]"
                  id="size-1"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </Layout>
  )
}
