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
  reference?: string
  pretty?: boolean
}

function generate (reference?: string): string;
function generate (options: GenerateOptions): string;
function generate (options?: any): string {
  let reference: string | undefined
  let pretty: boolean = false

  if (typeof options === 'string') {
    reference = options
  } else if (typeof options === 'object') {
    reference = options.reference
    pretty = options.pretty === true
  } else {
    reference = undefined
  }

  const normalizedReference = typeof reference === 'undefined'
    ? generateFinnishReference()
    : normalizeReference(reference)

  const rfReference = generateRFreference(normalizedReference)

  return pretty
    ? prettyFormatRFreference(rfReference)
    : rfReference
}

export default generate
