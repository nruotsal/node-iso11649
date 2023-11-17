import { normalizeReference, modulo97, substituteCharWithNumber } from './common'
import { generateFinnishReference } from './finnish-reference'

const calculateRFChecksum = (reference: string): string => {
  const preResult = `${reference}RF00`.split('').map(substituteCharWithNumber).join('')
  const checksum = 98 - modulo97(preResult)
  return checksum < 10 ? `0${checksum}` : `${checksum}`
}

const generateRFreference = (reference: string): string =>
  `RF${calculateRFChecksum(reference)}${reference}`

const prettyFormatRFreference = (reference: string): string =>
  // place a space after each group that is not at the end of the string
  reference.replace(/(.{4})(?!$)/g, '$1 ')

interface GenerateOptions {
  pretty?: boolean
}

function generate (reference?: string, options?: GenerateOptions): string {
  const normalizedReference = reference === undefined
    ? generateFinnishReference()
    : normalizeReference(reference)

  const rfReference = generateRFreference(normalizedReference)

  return options?.pretty === true
    ? prettyFormatRFreference(rfReference)
    : rfReference
}

export default generate
