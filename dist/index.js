'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var REFERENCE_FORMAT = /^RF[0-9]{2}[0-9A-Z]+$/;
var charTable = {
    A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16,
    H: 17, I: 18, J: 19, K: 20, L: 21, M: 22, N: 23,
    O: 24, P: 25, Q: 26, R: 27, S: 28, T: 29, U: 30,
    V: 31, W: 32, X: 33, Y: 34, Z: 35
};
var normalizeReference = function (reference) {
    return ("" + reference).replace(/ /g, '').toUpperCase();
};
var substituteCharWithNumber = function (char) {
    return (Number.isNaN(Number(char)) ? charTable[char] : char);
};
var modulo97 = function (dividend) {
    var chunks = dividend.match(/.{1,7}/g);
    return chunks !== null
        ? chunks.map(Number).reduce(function (prev, curr) { return parseInt("" + prev + curr) % 97; }, 0)
        : -1;
};
var moveRfToEnd = function (reference) {
    return (reference.substr(4) + reference.substr(0, 4)).split('');
};
var isValidChecksum = function (reference) {
    var preResult = moveRfToEnd(reference).map(substituteCharWithNumber).join('');
    return modulo97(preResult) === 1;
};
var isValidFormat = function (reference) {
    return reference.match(REFERENCE_FORMAT) !== null;
};
var isValid = function (reference) {
    return reference.length <= 25 &&
        isValidFormat(reference) &&
        isValidChecksum(reference);
};

var ceil10 = function (num) {
    return Math.ceil(num / 10) * 10;
};
var toSum = function (prev, curr) {
    return prev + curr;
};
var multiplyWith = function (multipliers) {
    return function (digit, index) { return digit * multipliers[index % 3]; };
};
var calculateFinnishChecksum = function (reference) {
    var digits = reference.split('').map(Number).reverse();
    var multipliers = [7, 3, 1];
    var sum = digits.map(multiplyWith(multipliers)).reduce(toSum);
    return (ceil10(sum) - sum) % 10;
};
var generateFinnishReference = function () {
    var reference = "" + Date.now();
    var checksum = calculateFinnishChecksum(reference);
    return "" + reference + checksum;
};

var calculateRFChecksum = function (reference) {
    var preResult = (reference + "RF00").split('').map(substituteCharWithNumber).join('');
    var checksum = 98 - modulo97(preResult);
    return checksum < 10 ? "0" + checksum : "" + checksum;
};
var generateRFreference = function (reference) {
    return "RF" + calculateRFChecksum(reference) + reference;
};
var prettyFormatRFreference = function (reference) {
    return reference.replace(/(.{4})(?!$)/g, '$1 ');
};
function generate(options) {
    var reference;
    var pretty = false;
    if (typeof options === 'string') {
        reference = options;
    }
    else if (typeof options === 'object') {
        reference = options.reference;
        pretty = options.pretty === true;
    }
    else {
        reference = undefined;
    }
    var normalizedReference = typeof reference === 'undefined'
        ? generateFinnishReference()
        : normalizeReference(reference);
    var rfReference = generateRFreference(normalizedReference);
    return pretty
        ? prettyFormatRFreference(rfReference)
        : rfReference;
}

var validate = (function (reference) {
    var normalizedRef = normalizeReference(reference);
    return isValid(normalizedRef);
});

function removeRf(reference) {
    return reference.substr(4);
}
function parse(reference) {
    var normalizedRef = normalizeReference(reference);
    if (!isValid(normalizedRef)) {
        return null;
    }
    return removeRf(normalizedRef);
}

exports.generate = generate;
exports.parse = parse;
exports.validate = validate;
