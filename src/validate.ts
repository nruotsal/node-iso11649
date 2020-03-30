import { normalizeReference, isValid } from './common'

export default (reference: string): boolean => {
  const normalizedRef = normalizeReference(reference)
  return isValid(normalizedRef)
}
