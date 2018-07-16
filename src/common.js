/* eslint-disable object-property-newline */
const charTable = {
  A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16,
  H: 17, I: 18, J: 19, K: 20, L: 21, M: 22, N: 23,
  O: 24, P: 25, Q: 26, R: 27, S: 28, T: 29, U: 30,
  V: 31, W: 32, X: 33, Y: 34, Z: 35
}
/* eslint-disable object-property-newline */

export const normalizeReference = reference =>
  (reference ? (`${reference}`).replace(/ /g, '').toUpperCase() : '')

export const substituteCharWithNumber = char =>
  (Number.isNaN(Number(char)) ? charTable[char] : char)

export const modulo97 = (divident) => {
  const chunks = divident.match(/.{1,7}/g)
  return chunks.reduce((prev, curr) => `${prev}${curr}` % 97, '')
}
