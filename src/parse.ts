import { normalizeReference, isValid } from './common'

function removeRf (reference: string): string {
  return reference.slice(4)
}

/**
 * Parses and validates an ISO 11649 reference number.
 *
 * This function normalizes the provided reference number, checks its validity,
 * and then removes the 'RF' prefix and checksum part if the reference is valid.
 * If the reference is not valid, it returns null.
 *
 * @param {string} reference - The ISO 11649 reference number to be parsed.
 *
 * @returns {string | null} The parsed reference number without the 'RF' prefix and checksum, or null if the reference is not valid.
 */
export default function parse (reference: string): string | null {
  const normalizedRef = normalizeReference(reference)

  if (!isValid(normalizedRef)) {
    return null
  }

  return removeRf(normalizedRef)
}
