import { normalizeReference, isValid } from './common'

function validate (reference: string): boolean {
  const normalizedRef = normalizeReference(reference)
  return isValid(normalizedRef)
}

export default validate
