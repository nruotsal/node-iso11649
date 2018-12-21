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
    ? chunks.map(Number).reduce((prev: number, curr: number) => parseInt(`${prev}${curr}`) % 97, 0)
    : -1
}
