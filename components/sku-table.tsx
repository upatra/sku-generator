import React, { FC } from 'react'

import { SkuGenerator } from '@/models'

type Props = {
  data: SkuGenerator[]
  isTranslation: boolean
}

const SkuTable: FC<Props> = ({ data, isTranslation }) => {
  if (data.length === 0) return null

  const firstItem = data[0]
  const listKeys = Object.keys(firstItem).filter(
    (key: string) =>
      key !== 'productName' &&
      key !== 'productNameCn' &&
      key !== 'productSku' &&
      key !== 'skuByCode' &&
      key !== 'skuByName' &&
      key !== 'skuByNameCn' &&
      !key.includes('Cn')
  )

  return (
    <div className="pt-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">RESULT</h1>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
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
                  {listKeys.map((key, index) => (
                    <th
                      key={`${key}-${index}`}
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      {key}
                    </th>
                  ))}
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
                        {item.skuByNameCn}
                      </td>
                    )}
                    {listKeys.map((key, index) => (
                      <td
                        key={`${key}-${index}`}
                        className="whitespace-nowrap py-4 px-3 text-sm text-gray-500"
                      >
                        {`${item[key]}`}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkuTable
