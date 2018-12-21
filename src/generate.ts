import { normalizeReference, modulo97, substituteCharWithNumber } from './common'

const ceil10 = (num: number): number =>
  Math.ceil(num / 10) * 10

const toSum = (prev: number, curr: number): number =>
  prev + curr

const multiplyWith = (multipliers: number[]) =>
  (digit: number, index: number) => digit * multipliers[index % 3]

const calculateChecksum = (reference: string): number => {
  const digits = reference.split('').map(Number).reverse()
  const multipliers = [7, 3, 1]
  const sum = digits.map(multiplyWith(multipliers)).reduce(toSum)
  return (ceil10(sum) - sum) % 10
}

const generateReference = (): string => {
  const reference = `${Date.now()}`
  const checksum = calculateChecksum(reference)
  return `${reference}${checksum}`
}

const calculateRFChecksum = (reference: string): string => {
  const preResult = `${reference}RF00`.split('').map(substituteCharWithNumber).join('')
  const checksum = 98 - modulo97(preResult)
  return checksum < 10 ? `0${checksum}` : `${checksum}`
}

const generateRFreference = (reference: string): string =>
  `RF${calculateRFChecksum(reference)}${reference}`

export default (reference?: string): string => {
  const normalizedReference = typeof reference !== 'undefined'
    ? normalizeReference(reference)
    : generateReference()

  return generateRFreference(normalizedReference)
}
