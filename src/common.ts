const REFERENCE_FORMAT: RegExp = /^RF[0-9]{2}[0-9A-Z]+$/

interface CharTable {
  [key: string]: number
}

/* eslint-disable object-property-newline */
const charTable: CharTable = {
  A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16,
  H: 17, I: 18, J: 19, K: 20, L: 21, M: 22, N: 23,
  O: 24, P: 25, Q: 26, R: 27, S: 28, T: 29, U: 30,
  V: 31, W: 32, X: 33, Y: 34, Z: 35
}
/* eslint-disable object-property-newline */

export const normalizeReference = (reference: string): string =>
  (`${reference}`).replace(/ /g, '').toUpperCase()

export const substituteCharWithNumber = (char: string): string | number =>
  (Number.isNaN(Number(char)) ? charTable[char] : char)

export const modulo97 = (dividend: string): number => {
  const chunks = dividend.match(/.{1,7}/g)
  return chunks !== null
    ? chunks.reduce((prev: number, curr: string) => parseInt(`${prev}${curr}`) % 97, 0)
    : -1
}

export const moveRfToEnd = (reference: string): string[] =>
  (reference.substr(4) + reference.substr(0, 4)).split('')

export const isValidChecksum = (reference: string): boolean => {
  const preResult = moveRfToEnd(reference).map(substituteCharWithNumber).join('')
  return modulo97(preResult) === 1
}

export const isValidFormat = (reference: string): boolean =>
  reference.match(REFERENCE_FORMAT) !== null

export const isValidChecksumRange = (reference: string): boolean => {
  const checkSum = Number(reference.substr(2, 2))
  return checkSum >= 2 && checkSum <= 98
}

export const isValid = (reference: string): boolean =>
  reference.length <= 25 &&
    isValidFormat(reference) &&
    isValidChecksumRange(reference) &&
    isValidChecksum(reference)
