import { normalizeReference, modulo97, substituteCharWithNumber } from './common'

const REFERENCE_FORMAT: RegExp = /^RF[0-9]{2}[0-9A-Z]+$/

const moveRfToEnd = (reference: string): string[] =>
  (reference.substr(4) + reference.substr(0, 4)).split('')

const isValidChecksum = (reference: string): boolean => {
  const preResult = moveRfToEnd(reference).map(substituteCharWithNumber).join('')
  return modulo97(preResult) === 1
}

const isValidFormat = (reference: string): boolean =>
  reference.match(REFERENCE_FORMAT) !== null

export default (reference: string): boolean => {
  const normalizedRef = normalizeReference(reference)
  return normalizedRef.length <= 25 &&
    isValidFormat(normalizedRef) &&
    isValidChecksum(normalizedRef)
}
