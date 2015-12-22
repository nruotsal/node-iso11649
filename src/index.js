const charTable = {
  A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16,
  H: 17, I: 18, J: 19, K: 20, L: 21, M: 22, N: 23,
  O: 24, P: 25, Q: 26, R: 27, S: 28, T: 29, U: 30,
  V: 31, W: 32, X: 33, Y: 34, Z: 35
}
const divider = 97
const format = /^RF[0-9]{2}[0-9A-Z]+$/

const normalizeRef = (ref) =>
  ref ? ref.replace(/ /g, '').toUpperCase() : ''

const substituteChar = (char) =>
  isNaN(char) ? charTable[char] : char

const mod = (divident) => {
  const chunks = divident.match(/.{1,7}/g)
  return chunks.reduce((prev, curr) => `${prev}${curr}` % divider, '')
}

export const validate = (reference) => {
  const normalizedRef = normalizeRef(reference)

  const isValidFormat = (ref) =>
    !!ref.match(format)

  const isValidChecksum = (ref) => {
    const preResult = moveRfToEnd(ref).map(substituteChar).join('')
    return mod(preResult) === 1
  }

  const moveRfToEnd = (ref) =>
    (ref.substr(4) + ref.substr(0, 4)).split('')

  return normalizedRef.length <= 25
    && isValidFormat(normalizedRef)
    && isValidChecksum(normalizedRef)
}
