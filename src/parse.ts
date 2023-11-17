import { normalizeReference, isValid } from './common'

function removeRf (reference: string): string {
  return reference.slice(4)
}

function parse (reference: string): string | null {
  const normalizedRef = normalizeReference(reference)

  if (!isValid(normalizedRef)) {
    return null
  }

  return removeRf(normalizedRef)
}

export default parse
