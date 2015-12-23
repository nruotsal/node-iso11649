node-iso11649
=============

ISO 11649:2009 RF creditor reference library for node

## Installation

  npm install node-iso11649 --save

## Usage

### Generating RF creditor reference

RF creditor reference can be generated from existing reference.

Existing reference characteristics:
 * Contain only numbers 0-9 and/or characters A-Z (example AB2G5 => RF68AB2G5).
 * Max length 21 characters.
 * Not case sensitive (example aB2g5 => RF68AB2G5).
 * Can be string with spaces (example '12345 12345' => RF451234512345).

```
  import {generate} from 'node-iso11649'

  console.log(generate('12345 12345'))
  // => RF451234512345
```

RF creditor reference can be generated also without existing reference.
In that case epoch timestamp with finnish checksum at the end is used.
Example of the result in the time of writing this.

```
  import {generate} from 'node-iso11649'

  console.log(generate())
  // => RF4714508655422864
```

### Validating RF creditor reference

Valid RF creditor reference characteristics:
 * Must start with characters RF.
 * Must contain two checksum numbers in indexes 3 and 4.
 * Reference part must follow rules described in 'Existing reference characteristics' section.

```
  import {validate} from 'node-iso11649'

  console.log(validate('RF4714508655422864'))
  // => true
```

```
  import {validate} from 'node-iso11649'

  console.log(validate('RF00TEST'))
  // => false
```

## Tests

  npm test

## Release History

* 1.0.1
    - Handle number references as string
    - Update README
* 1.0.0
    - Initial release
