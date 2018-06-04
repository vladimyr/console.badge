'use strict';

const { CSSStyleDeclaration } = require('cssom');
const kebabCase = require('kebab-case');

module.exports = { createElement };

function createElement() {
  const _style = createStyle();
  return {
    get style() {
      return _style;
    }
  };
}

function createStyle() {
  const style = new CSSStyleDeclaration();
  return new Proxy(style, {
    set(target, prop, value) {
      if (prop === 'cssText') {
        target.cssText = value;
        return true;
      }
      target.setProperty(kebabCase(prop), value);
      return true;
    }
  });
}
