const el = document.createElement('div');

export default function cssText(style) {
  el.style.cssText = '';
  Object.assign(el.style, style);
  return el.style.cssText;
}
