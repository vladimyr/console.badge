'use strict';

// Mock global `document` object.
const { createElement } = require('./helpers');
global.document = { createElement };

const test = require('tape');
const { default: printBadge, Style } = require('../dist/console.badge.cjs.js');
const { toOrdinal } = require('ordinal-js');

test('Print colored badge with style=flat', t => {
  const expected = [
    '%c vue-devtools %c Detected Vue v2.4.5 %c',
    'padding: 1px; color: rgb(255,255,255); background: rgb(85,85,85) linear-gradient(180deg, rgba(187,187,187,.1), rgba(0,0,0,.15)); border-bottom-left-radius: 3px; border-top-left-radius: 3px;',
    'padding: 1px; color: rgb(255,255,255); background: rgb(105,140,10) linear-gradient(180deg, rgba(187,187,187,.1), rgba(0,0,0,.15)); border-bottom-right-radius: 3px; border-top-right-radius: 3px;',
    'background: transparent;'
  ];
  stub(console, 'log', (...actual) => {
    console.log.restore();
    compare(t, actual, expected);
    t.end();
  });
  printBadge('vue-devtools', 'Detected Vue v2.4.5', 'rgb(105,140,10)', Style.Flat);
});

test('Print colored badge with style=flat-square', t => {
  const expected = [
    '%c vue-devtools %c Detected Vue v2.4.5 %c',
    'padding: 1px; color: rgb(255,255,255); background: rgb(85,85,85);',
    'padding: 1px; color: rgb(255,255,255); background: rgb(105,140,10);',
    'background: transparent;'
  ];
  stub(console, 'log', (...actual) => {
    console.log.restore();
    compare(t, actual, expected);
    t.end();
  });
  printBadge('vue-devtools', 'Detected Vue v2.4.5', 'rgb(105,140,10)', Style.FlatSquare);
});

test('Print colored badge with style=for-the-badge', t => {
  const expected = [
    '%c vue-devtools %c Detected Vue v2.4.5 %c',
    'padding: 8px 10px; color: rgb(255,255,255); background: rgb(85,85,85); text-transform: uppercase; letter-spacing: 1px;',
    'padding: 8px 10px; color: rgb(255,255,255); background: rgb(105,140,10); font-weight: bold; text-transform: uppercase; letter-spacing: 1px;',
    'background: transparent;'
  ];
  stub(console, 'log', (...actual) => {
    console.log.restore();
    compare(t, actual, expected);
    t.end();
  });
  printBadge('vue-devtools', 'Detected Vue v2.4.5', 'rgb(105,140,10)', Style.ForTheBadge);
});

function compare(t, actual, expected) {
  t.equal(actual.length, actual.length, 'Params count matches');
  actual.forEach((input, i) => {
    t.equal(input, expected[i], `${toOrdinal(i + 1)} param matches`);
  });
}

function stub(obj, fn, stubFn) {
  const original = obj[fn];
  stubFn.restore = () => (obj[fn] = original);
  return (obj[fn] = stubFn);
}
