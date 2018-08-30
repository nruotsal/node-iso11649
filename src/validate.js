import { normalizeReference, modulo97, substituteCharWithNumber } from './common'

const REFERENCE_FORMAT = /^RF[0-9]{2}[0-9A-Z]+$/

const moveRfToEnd = reference =>
  (reference.substr(4) + reference.substr(0, 4)).split('')

const isValidChecksum = (reference) => {
  const preResult = moveRfToEnd(reference).map(substituteCharWithNumber).join('')
  return modulo97(preResult) === 1
}

const isValidFormat = reference =>
  !!reference.match(REFERENCE_FORMAT)

export default (reference) => {
  const normalizedRef = normalizeReference(reference)
  return normalizedRef.length <= 25 &&
    isValidFormat(normalizedRef) &&
    isValidChecksum(normalizedRef)
}
