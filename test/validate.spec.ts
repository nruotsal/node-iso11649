import * as test from 'tape'
import { validate } from '../src/index'

test('validate should return true for valid reference with numbers', (assert: test.Test) => {
  const expected = true
  const actual = validate('RF33 2348 236')

  assert.equal(actual, expected)
  assert.end()
})

test('validate should return true for valid reference with characters', (assert: test.Test) => {
  const expected = true
  const actual = validate('RF19 AB2G 59X5 6V54 3')

  assert.equal(actual, expected)
  assert.end()
})

test('validate should return false for invalid reference', (assert: test.Test) => {
  const expected = false
  const actual = validate('RF09 2348 236')

  assert.equal(actual, expected)
  assert.end()
})

test('validate should return true for valid 25 char long reference', (assert: test.Test) => {
  const expected = true
  const actual = validate('RF40 1234 5678 9012 3456 7890 1')

  assert.equal(actual, expected)
  assert.end()
})

test('validate should return false for valid 26 char long reference', (assert: test.Test) => {
  const expected = false
  const actual = validate('RF43 1234 5678 9012 3456 7890 12')

  assert.equal(actual, expected)
  assert.end()
})
