import React, { FC, useState, useMemo } from 'react'
import { isEmpty } from 'lodash'

type Props = {
  onAddNewvariant: (variantName: string, variantCode: string) => void
  isHideVariantCode?: boolean
  titleName?: string
  titleCode?: string
}

const InputVariant: FC<Props> = ({
  onAddNewvariant,
  isHideVariantCode,
  titleName,
  titleCode,
}) => {
  const [variantName, setVariantName] = useState<string>('')
  const [variantCode, setVariantCode] = useState<string>('')

  const onAddVariant = () => {
    onAddNewvariant(variantName, isHideVariantCode ? variantName : variantCode)
    reset()
  }

  const isValid = useMemo<boolean>(() => {
    if (isHideVariantCode) return !isEmpty(variantName)

    return !isEmpty(variantName) && !isEmpty(variantCode)
  }, [isHideVariantCode, variantCode, variantName])

  const reset = () => {
    setVariantName('')
    setVariantCode('')
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-4">
        <label
          htmlFor="variant-name"
          className="block text-sm font-medium text-gray-700"
        >
          {titleName}
        </label>
        <div className="mt-1">
          <input
            type="text"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={variantName}
            onChange={(e) => setVariantName(e.target.value)}
          />
        </div>
      </div>
      {!isHideVariantCode && (
        <div className="sm:col-span-1">
          <label
            htmlFor="variant-code"
            className="block text-sm font-medium text-gray-700"
          >
            {titleCode}
          </label>
          <div className="mt-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={variantCode}
              onChange={(e) => setVariantCode(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="sm:col-span-1">
        <label className="block text-sm font-medium text-gray-700">
          &nbsp;
        </label>
        <button
          type="button"
          className="disabled:opacity-50 mt-1 w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onAddVariant}
          disabled={!isValid}
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default InputVariant
