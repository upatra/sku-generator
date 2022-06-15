import React, { FC } from 'react'

import { SkuGenerator } from '@/models'

type Props = {
  data: SkuGenerator[]
  isTranslation: boolean
}

const copyTable = () => {
  const elTable = document.getElementById('resultTable')

  let range: any
  let sel: any

  // Ensure that range and selection are supported by the browsers
  if (document.createRange && window.getSelection) {
    range = document.createRange()
    sel = window.getSelection()
    // unselect any element in the page
    sel.removeAllRanges()

    try {
      range.selectNodeContents(elTable as Node)
      sel!.addRange(range)
    } catch (e) {
      range.selectNode(elTable as Node)
      sel!.addRange(range)
    }

    document.execCommand('copy')
  }
  sel.removeAllRanges()

  console.log('Element Copied! Paste it in a file')
}

const SkuTable: FC<Props> = ({ data, isTranslation }) => (
  <div className="pt-10">
    <div className="flex items-center justify-between">
      <h1 className="flex text-xl font-semibold text-gray-900">RESULT</h1>
      <button
        className="flex justify-end bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={copyTable}
      >
        Copy
      </button>
    </div>
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <table
            className="min-w-full divide-y divide-gray-300"
            id="resultTable"
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                >
                  Product Name
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  Product SKU
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  Created SKU (Code)
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  Created SKU (Name)
                </th>
                {isTranslation && (
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    中文名称
                  </th>
                )}
                <th
                  scope="col"
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  Color Name
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  Color Code
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  Set Name
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  Set Code
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  Size
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item: SkuGenerator, index: number) => (
                <tr key={`${item.skuByCode}-${index}`}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                    {item.productName}
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    {item.productSku}
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    {item.skuByCode}
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    {item.skuByName}
                  </td>
                  {isTranslation && (
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                      {item.skuChinese}
                    </td>
                  )}
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    {item.colorName}
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    {item.colorCode}
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    {item.setName}
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    {item.setCode}
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    {item.size}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)

export default SkuTable
