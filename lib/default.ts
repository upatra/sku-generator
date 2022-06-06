import { Variant } from 'models'

export const getDefaultColors = (): Variant[] => {
  const colorName = [
    'Black',
    'Blue',
    'Brown',
    'White',
    'Beige',
    'Pink',
    'Purple',
    'Navy',
    'Orange',
    'Gray/Grey',
    'Green',
    'Yellow',
    'Khaki',
    'Yellow Leopard',
    'All Black/Whole Black',
    'Black Gray',
    'Black White',
    'Red',
    'Wine Red',
    'Coffee',
    'Light Blue ',
    'Yellow Green',
    'Orange Yellow',
    'Red Green',
    'Dark Grey',
    'Gold',
    'Silver',
    'Leopard',
    'Bronze',
    'Dark Blue',
    'Rose Red',
    'Chocolate Leopard',
    'Snakeskin Pattern',
    'Zebra Pattern ',
    'Baby Pink',
    'Transparent/Clear',
    'Light Grey',
    'Navy Red',
    'Navy Blue',
    'Brown Green',
    'Army Green',
    'Apricot',
    'Peach',
    'Glinting Silver',
    'Grey Silver',
    'Champagne',
    'Pink Crystal',
    'White Crystal',
    'Black Crystal',
    'White Leopard',
    'Charcoal ',
    'Multi-Color',
    'Dark Green',
    'Coral',
    'Light Purple',
    'Floral',
    'Dark Purple',
    'Dark Brown',
    'Rose Gold',
  ]
  const colorCode = [
    'BK',
    'BL',
    'BR',
    'WH',
    'BE',
    'PK',
    'PP',
    'NV',
    'OR',
    'GY',
    'GR',
    'YL',
    'KI',
    'YLLP',
    'ABK',
    'BKGY',
    'BKWH',
    'RD',
    'WRD',
    'CF',
    'LBL',
    'YLGR',
    'ORYL',
    'RDGR',
    'DGY',
    'GD',
    'SV',
    'LP',
    'BZ',
    'DBL',
    'RRD',
    'CCLLP',
    'SP',
    'ZP',
    'BPK',
    'TM',
    'LGY',
    'NVRD',
    'NVBL',
    'BRGR',
    'AYGR',
    'AP',
    'PH',
    'GLSV',
    'GYSV',
    'CP',
    'PC',
    'WC',
    'BC',
    'WHLP',
    'CC',
    'MCL',
    'DGR',
    'CL',
    'LPP',
    'FL',
    'DPP',
    'DBR',
    'RGD',
  ]

  const result: Variant[] = []
  for (let i = 0; i < colorName.length; i++) {
    result.push({
      variantName: colorName[i],
      variantCode: colorCode[i],
    })
  }
  return result
}

export const getBasicColors = (): Variant[] => {
  const colorName = [
    'Black',
    'Blue',
    'Brown',
    'White',
    'Beige',
    'Pink',
    'Purple',
    'Navy',
    'Orange',
    'Gray/Grey',
    'Green',
    'Yellow',
  ]
  const colorCode = [
    'BK',
    'BL',
    'BR',
    'WH',
    'BE',
    'PK',
    'PP',
    'NV',
    'OR',
    'GY',
    'GR',
    'YL',
  ]

  const result: Variant[] = []
  for (let i = 0; i < colorName.length; i++) {
    result.push({
      variantName: colorName[i],
      variantCode: colorCode[i],
    })
  }
  return result
}

export const getDefaultSets = (): Variant[] => {
  const setName = ['Set 1', 'Set 2', 'Set 3', 'Set 4', 'Set 5']
  const setCode = ['SET1', 'SET2', 'SET3', 'SET4', 'SET5']

  const result: Variant[] = []
  for (let i = 0; i < setName.length; i++) {
    result.push({
      variantName: setName[i],
      variantCode: setCode[i],
    })
  }
  return result
}

export const getLargeSets = (): Variant[] => {
  const setName = ['Set 10', 'Set 20', 'Set 30']
  const setCode = ['SET10', 'SET20', 'SET30']

  const result: Variant[] = []
  for (let i = 0; i < setName.length; i++) {
    result.push({
      variantName: setName[i],
      variantCode: setCode[i],
    })
  }
  return result
}

export const getNumericSizes = (): Variant[] => {
  const names = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45']

  const result: Variant[] = []
  for (let i = 0; i < names.length; i++) {
    result.push({
      variantName: names[i],
    })
  }
  return result
}

export const getRomanSizes = (): Variant[] => {
  const names = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

  const result: Variant[] = []
  for (let i = 0; i < names.length; i++) {
    result.push({
      variantName: names[i],
    })
  }
  return result
}
