import cssText from './css-text';

export const Style = {
  Flat: Symbol('flat'),
  FlatSquare: Symbol('flat-square'),
  ForTheBadge: Symbol('for-the-badge')
};

console.badge = printBadge;
export default printBadge;

const decorators = {
  [Style.Flat]: flat,
  [Style.FlatSquare]: flatSquare,
  [Style.ForTheBadge]: forTheBadge
};

const Type = {
  Prefix: 'Left',
  Suffix: 'Right'
};

const base = {
  padding: '1px',
  color: 'rgb(255,255,255)'
};

const clone = obj => ({ ...obj });

function printBadge(prefix, suffix, color, style = Style.Flat) {
  const decorate = decorators[style] || flat;
  return console.log(
    `%c ${prefix} %c ${suffix} %c`,
    cssText(decorate(clone(base))),
    cssText(decorate(clone(base), { side: Type.Suffix, color })),
    cssText({ background: 'transparent' })
  );
}

function flat(style, { side = Type.Prefix, color = 'rgb(85,85,85)' } = {}) {
  const overlay = 'linear-gradient(180deg, rgba(187,187,187,.1), rgba(0,0,0,.15))';
  style.background = `${color} ${overlay}`;
  style[`borderTop${side}Radius`] = style[`borderBottom${side}Radius`] = '3px';
  return style;
}

function flatSquare(style, { color = 'rgb(85,85,85)' } = {}) {
  style.background = color;
  return style;
}

function forTheBadge(style, { side = Type.Prefix, color = 'rgb(85,85,85)' } = {}) {
  flatSquare(style, { color });
  if (side === Type.Suffix) style.fontWeight = 'bold';
  style.padding = '8px 10px';
  style.textTransform = 'uppercase';
  style.letterSpacing = '1px';
  return style;
}
