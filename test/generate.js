import test from 'tape'
import {generate, validate} from '../src/index'

test('should generate reference with numbers', (assert) => {
  const expected = 'RF712348231'
  const actual = generate('2348231')

  assert.equal(actual, expected)
  assert.end()
})

test('should generate reference with characters', (assert) => {
  const expected = 'RF19AB2G59X56V543'
  const actual = generate('AB2G5 9X56 V543')

  assert.equal(actual, expected)
  assert.end()
})

test('should generate reference with zero padding', (assert) => {
  const expected = 'RF097'
  const actual = generate('7')

  assert.equal(actual, expected)
  assert.end()
})

test('should generate valid reference from timestamp', (assert) => {
  const expected = true
  const actual = validate(generate())

  assert.equal(actual, expected)
  assert.end()
})
