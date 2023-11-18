import { normalizeReference, isValid } from './common'

/**
 * Validates an ISO 11649 reference number.
 *
 * This function normalizes the provided reference number and then checks its validity using.
 * It returns true if the reference number is valid, otherwise false.
 *
 * @param {string} reference - The ISO 11649 reference number to be validated.
 *
 * @returns {boolean} True if the reference number is valid, otherwise false.
 */
export default function validate (reference: string): boolean {
  const normalizedRef = normalizeReference(reference)
  return isValid(normalizedRef)
}
