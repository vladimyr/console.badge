'use strict';

const { CSSStyleDeclaration } = require('cssom');
const kebabCase = require('kebab-case');

module.exports = { createElement, cssText2props, equals };

function cssText2props(cssText) {
  const el = document.createElement('div');
  el.style.cssText = cssText;
  return el.style;
}

function equals(props1, props2) {
  return Array.from(props1).every(name => {
    return props1.getPropertyValue(name) === props2.getPropertyValue(name);
  });
}

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
