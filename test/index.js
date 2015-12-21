import test from 'tape'
import {validate, generate} from '../src/index'

test('should validate valid creditor reference', (assert) => {
  const expected = true
  const actual = validate('RF332348236')

  assert.equal(actual, expected)
  assert.end()
})

test('should generate valid creditor reference', (assert) => {
  const expected = true
  const actual = validate(generate())

  assert.equal(actual, expected)
  assert.end()
})
