import * as test from 'tape'
import { validate } from '../src/index'

test('should validate reference with numbers to true', (assert: test.Test) => {
  const expected = true
  const actual = validate('RF33 2348 236')

  assert.equal(actual, expected)
  assert.end()
})

test('should validate reference with characters to true', (assert: test.Test) => {
  const expected = true
  const actual = validate('RF19 AB2G 59X5 6V54 3')

  assert.equal(actual, expected)
  assert.end()
})

test('should validate invalid reference to false', (assert: test.Test) => {
  const expected = false
  const actual = validate('RF09 2348 236')

  assert.equal(actual, expected)
  assert.end()
})

test('should validate 25 char long reference to true', (assert: test.Test) => {
  const expected = true
  const actual = validate('RF40 1234 5678 9012 3456 7890 1')

  assert.equal(actual, expected)
  assert.end()
})

test('should validate 26 char long reference to false', (assert: test.Test) => {
  const expected = false
  const actual = validate('RF43 1234 5678 9012 3456 7890 12')

  assert.equal(actual, expected)
  assert.end()
})

test('should validate reference with zero on start of 7 char chunk to true', (assert: test.Test) => {
  const expected = true
  const actual = validate('RF02 4020 5100 2913 3')

  assert.equal(actual, expected)
  assert.end()
})
