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

/**
 * Generates a standardized ISO 11649 reference number.
 *
 * If a reference string is provided, it normalizes and converts it into an ISO 11649 reference.
 * If no reference is provided, it generates a new Finnish reference number.
 * Optionally, the reference can be formatted for readability.
 *
 * @param {string} [reference] - The reference string to be converted. If omitted, a new Finnish reference is generated.
 * @param {GenerateOptions} [options] - Configuration options for generating the reference.
 * @param {boolean} [options.pretty=false] - If true, formats the reference number with spaces for readability.
 *
 * @returns {string} The generated ISO 11649 reference number, optionally formatted.
 */
export default function generate (reference?: string, options?: GenerateOptions): string {
  const normalizedReference = reference === undefined
    ? generateFinnishReference()
    : normalizeReference(reference)

  const rfReference = generateRFreference(normalizedReference)

  return options?.pretty === true
    ? prettyFormatRFreference(rfReference)
    : rfReference
}
