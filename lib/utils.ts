export const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const truncate = (str: string, num: number) => {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

export const camelcase = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toLowerCase() + s.slice(1)
}
