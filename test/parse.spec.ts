import test from 'tape'
import { parse } from '../src/index'

test('should parse reference with numbers', (assert: test.Test) => {
  const expected = '2348236'
  const actual = parse('RF33 2348 236')

  assert.equal(actual, expected)
  assert.end()
})

test('should parse reference with characters', (assert: test.Test) => {
  const expected = 'AB2G59X56V543'
  const actual = parse('RF19 AB2G 59X5 6V54 3')

  assert.equal(actual, expected)
  assert.end()
})

test('should parse invalid reference with exception', (assert: test.Test) => {
  const expected = null
  const actual = parse('RF09 2348 236')

  assert.equal(actual, expected)
  assert.end()
})

test('should parse 25 char long reference', (assert: test.Test) => {
  const expected = '123456789012345678901'
  const actual = parse('RF40 1234 5678 9012 3456 7890 1')

  assert.equal(actual, expected)
  assert.end()
})

test('should parse 26 char long reference with exception', (assert: test.Test) => {
  const expected = null
  const actual = parse('RF43 1234 5678 9012 3456 7890 12')

  assert.equal(actual, expected)
  assert.end()
})
