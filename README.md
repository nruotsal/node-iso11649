node-iso11649
=============

[![CircleCI](https://circleci.com/gh/nruotsal/node-iso11649/tree/master.svg?style=svg)](https://circleci.com/gh/nruotsal/node-iso11649/tree/master)
[![Known Vulnerabilities](https://snyk.io/test/github/nruotsal/node-iso11649/badge.svg)](https://snyk.io/test/github/nruotsal/node-iso11649)

ISO 11649:2009 RF creditor reference library for node

* No dependencies
* 4 KB (1.2 KB gzipped)


## Installation

With NPM
```sh
npm install node-iso11649 --save
```

With Yarn
```sh
yarn add node-iso11649
```


## Usage

### Generating RF creditor reference

RF creditor reference can be generated from existing reference.

Existing reference characteristics:
 * Contain only numbers 0-9 and/or characters A-Z (example AB2G5 => RF68AB2G5).
 * Max length 21 characters.
 * Not case sensitive (example aB2g5 => RF68AB2G5).
 * Can be string with spaces (example '12345 12345' => RF451234512345).

```js
import {generate} from 'node-iso11649'

console.log(generate('12345 12345'))
// => RF451234512345
```

RF creditor reference can be generated also without existing reference.
In that case epoch timestamp with finnish checksum at the end is used.
Example of the result in the time of writing this.

```js
import {generate} from 'node-iso11649'

console.log(generate())
// => RF4714508655422864
```

As creditor references are commonly displayed in groups of 4 characters
you can use the optional `pretty` flag to format the returned value.

```js
import {generate} from 'node-iso11649'

console.log(generate('12345 12345', {pretty: true}))
// => RF45 1234 5123 45
```

### Validating RF creditor reference

Valid RF creditor reference characteristics:
 * Must start with characters RF.
 * Must contain two checksum numbers in indexes 3 and 4.
 * Reference part must follow rules described in 'Existing reference characteristics' section.

```js
import {validate} from 'node-iso11649'

console.log(validate('RF4714508655422864'))
// => true
```

```js
import {validate} from 'node-iso11649'

console.log(validate('RF00TEST'))
// => false
```

### Parsing RF creditor reference

The reference part can be extracted from the RF creditor reference.
This validates the entered RF creditor reference according to the
'Validating RF creditor reference'. It returns the reference string
if valid and null if invalid.

```js
import {parse} from 'node-iso11649'

console.log(parse('RF47 1450 8655 4228 64'))
// => 14508655422864
```

```js
import {parse} from 'node-iso11649'

console.log(parse('RF00TEST'))
// => null
```


## Tests

Run [ESLint](https://eslint.org/) style checker.

```sh
npm run lint
````

Run unit tests

```sh
npm test
```
