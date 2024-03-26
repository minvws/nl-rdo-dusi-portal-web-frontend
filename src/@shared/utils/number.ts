/* Check if a value contains decimals */
export function containsDecimals(value: string | number): boolean {
  const hasDot = `${value}`.includes('.')
  const hasComma = `${value}`.includes(',')
  const hasDecimals = hasDot || hasComma
  const hasDigitsAfterDecimals = hasDecimals && `${value}`.split(/\.|,/)[1].length > 0

  return hasDecimals && hasDigitsAfterDecimals
}

/* Check if a value is a floating point number */
export function isFloat(value: string | number): boolean {
  const float = Number.parseFloat(`${value}`)

  return !Number.isNaN(float)
}

/* Check if a key can be used to input a number */
export function isNumberKey(key: string): boolean {
  return /[\d.,]/.test(key)
}

/* Check if a value is an integer */
export function isInteger(value: string | number): boolean {
  const float = Number.parseFloat(`${value}`)
  const integer = Number.parseInt(`${value}`, 10)

  return !Number.isNaN(integer) && Number.isInteger(float)
}

/* Transform a string or number to an integer */
export function toInteger(value: string | number): number {
  return Number.parseInt(`${value}`, 10)
}

/* Transform a string or number to a float */
export function toFloat(value: string | number): number {
  return Number.parseFloat(`${value}`)
}

/* Format a number */
export function formatNumber(number: string | number): string {
  let formattedNumber = number.toString().replaceAll(',', '.')

  if (Number.isNaN(Number(formattedNumber))) {
    throw new TypeError('Invalid number')
  }

  return formattedNumber.toString()
}
