'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/* eslint-disable object-property-newline */
var charTable = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  G: 16,
  H: 17,
  I: 18,
  J: 19,
  K: 20,
  L: 21,
  M: 22,
  N: 23,
  O: 24,
  P: 25,
  Q: 26,
  R: 27,
  S: 28,
  T: 29,
  U: 30,
  V: 31,
  W: 32,
  X: 33,
  Y: 34,
  Z: 35
};
/* eslint-disable object-property-newline */

var normalizeReference = function normalizeReference(reference) {
  return reference ? "".concat(reference).replace(/ /g, '').toUpperCase() : '';
};
var substituteCharWithNumber = function substituteCharWithNumber(_char) {
  return Number.isNaN(Number(_char)) ? charTable[_char] : _char;
};
var modulo97 = function modulo97(divident) {
  var chunks = divident.match(/.{1,7}/g);
  return chunks.reduce(function (prev, curr) {
    return "".concat(prev).concat(curr) % 97;
  }, '');
};

var ceil10 = function ceil10(num) {
  return Math.ceil(num / 10) * 10;
};

var toSum = function toSum(prev, curr) {
  return prev + curr;
};

var multiplyWith = function multiplyWith(multipliers) {
  return function (digit, index) {
    return digit * multipliers[index % 3];
  };
};

var calculateChecksum = function calculateChecksum(reference) {
  var digits = reference.split('').reverse();
  var multipliers = [7, 3, 1];
  var sum = digits.map(multiplyWith(multipliers)).reduce(toSum);
  return (ceil10(sum) - sum) % 10;
};

var generateReference = function generateReference() {
  var reference = "".concat(Date.now());
  var checksum = calculateChecksum(reference);
  return "".concat(reference).concat(checksum);
};

var calculateRFChecksum = function calculateRFChecksum(reference) {
  var preResult = "".concat(reference, "RF00").split('').map(substituteCharWithNumber).join('');
  var checksum = 98 - modulo97(preResult);
  return checksum < 10 ? "0".concat(checksum) : checksum;
};

var generateRFreference = function generateRFreference(reference) {
  return "RF".concat(calculateRFChecksum(reference)).concat(reference);
};

var generate = (function (reference) {
  return generateRFreference(normalizeReference(reference) || generateReference());
});

var REFERENCE_FORMAT = /^RF[0-9]{2}[0-9A-Z]+$/;

var moveRfToEnd = function moveRfToEnd(reference) {
  return (reference.substr(4) + reference.substr(0, 4)).split('');
};

var isValidChecksum = function isValidChecksum(reference) {
  var preResult = moveRfToEnd(reference).map(substituteCharWithNumber).join('');
  return modulo97(preResult) === 1;
};

var isValidFormat = function isValidFormat(reference) {
  return !!reference.match(REFERENCE_FORMAT);
};

var validate = (function (reference) {
  var normalizedRef = normalizeReference(reference);
  return normalizedRef.length <= 25 && isValidFormat(normalizedRef) && isValidChecksum(normalizedRef);
});

exports.generate = generate;
exports.validate = validate;
