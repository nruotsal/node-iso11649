import { normalizeReference, modulo97, substituteCharWithNumber } from './common'

const ceil10 = num =>
  Math.ceil(num / 10) * 10

const toSum = (prev, curr) =>
  prev + curr

const multiplyWith = multipliers =>
  (digit, index) => digit * multipliers[index % 3]

const calculateChecksum = (reference) => {
  const digits = reference.split('').reverse()
  const multipliers = [7, 3, 1]
  const sum = digits.map(multiplyWith(multipliers)).reduce(toSum)
  return (ceil10(sum) - sum) % 10
}

const generateReference = () => {
  const reference = (`${Date.now()}`)
  const checksum = calculateChecksum(reference)
  return `${reference}${checksum}`
}

const calculateRFChecksum = (reference) => {
  const preResult = `${reference}RF00`.split('').map(substituteCharWithNumber).join('')
  const checksum = 98 - modulo97(preResult)
  return checksum < 10 ? `0${checksum}` : checksum
}

const generateRFreference = reference =>
  `RF${calculateRFChecksum(reference)}${reference}`

export default reference =>
  generateRFreference(normalizeReference(reference) || generateReference())
