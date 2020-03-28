/**
 * Forming a Finnish reference number
 * https://www.finanssiala.fi/maksujenvalitys/dokumentit/Forming_a_Finnish_reference_number.pdf
 */
import { normalizeReference } from './common'

const FINNISH_REFERENCE_FORMAT: RegExp = /^[0-9]{4,20}$/

const ceil10 = (num: number): number =>
  Math.ceil(num / 10) * 10

const toSum = (prev: number, curr: number): number =>
  prev + curr

const multiplyWith = (multipliers: number[]) =>
  (digit: number, index: number) => digit * multipliers[index % 3]

const calculateFinnishChecksum = (reference: string): number => {
  const digits = reference.split('').map(Number).reverse()
  const multipliers = [7, 3, 1]
  const sum = digits.map(multiplyWith(multipliers)).reduce(toSum)
  return (ceil10(sum) - sum) % 10
}

export const generateFinnishReference = (): string => {
  const reference = `${Date.now()}`
  const checksum = calculateFinnishChecksum(reference)
  return `${reference}${checksum}`
}

const isValidFormat = (reference: string): boolean =>
  reference.match(FINNISH_REFERENCE_FORMAT) !== null

const isValidChecksum = (reference: string): boolean => {
  const checksum = Number(reference.slice(-1))
  const base = reference.substr(0, reference.length - 1)
  return checksum === calculateFinnishChecksum(base)
}

export const validateFinnishReference = (reference: string): boolean => {
  const normalizedRef = normalizeReference(reference)
  return normalizedRef.length <= 25 &&
    isValidFormat(normalizedRef) &&
    isValidChecksum(normalizedRef)
}
