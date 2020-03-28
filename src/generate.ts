import { normalizeReference, modulo97, substituteCharWithNumber } from './common'
import { generateFinnishReference } from './finnish-reference'

const calculateRFChecksum = (reference: string): string => {
  const preResult = `${reference}RF00`.split('').map(substituteCharWithNumber).join('')
  const checksum = 98 - modulo97(preResult)
  return checksum < 10 ? `0${checksum}` : `${checksum}`
}

const generateRFreference = (reference: string): string =>
  `RF${calculateRFChecksum(reference)}${reference}`

export default (reference?: string): string => {
  const normalizedReference = typeof reference === 'undefined'
    ? generateFinnishReference()
    : normalizeReference(reference)

  return generateRFreference(normalizedReference)
}
