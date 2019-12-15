import * as test from 'tape'
import { generate, validate } from '../src/index'

test('should generate reference with numbers', (assert: test.Test) => {
  const expected = 'RF712348231'
  const actual = generate('2348231')

  assert.equal(actual, expected)
  assert.end()
})

test('should generate reference with characters', (assert: test.Test) => {
  const expected = 'RF19AB2G59X56V543'
  const actual = generate('AB2G5 9X56 V543')

  assert.equal(actual, expected)
  assert.end()
})

test('should generate reference with zero padded number', (assert: test.Test) => {
  const expected = 'RF7400001'
  const actual = generate('00001')

  assert.equal(actual, expected)
  assert.end()
})

test('should generate valid reference from timestamp', (assert: test.Test) => {
  const expected = true
  const actual = validate(generate())

  assert.equal(actual, expected)
  assert.end()
})
