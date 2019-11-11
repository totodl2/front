/* eslint-disable */
export function getScrollTop() {
  let t = null;
  return (((t = document.documentElement) || (t = document.body.parentNode)) &&
  typeof t.scrollTop == 'number'
    ? t
    : document.body
  ).scrollTop;
}

export default function scrollTo(offset, smooth, el = window) {
  if (
    navigator.userAgent.indexOf('MSIE') !== -1 ||
    navigator.appVersion.indexOf('Trident/') !== -1 ||
    /Edge/.test(navigator.userAgent) ||
    !el.scroll
  ) {
    /* wind Microsoft Internet Explorer or Edge detected in. */
    if (el.scrollTo) {
      el.scrollTo(0, offset);
    } else {
      el.scrollTop = offset;
    }
  } else {
    el.scroll({
      top: offset,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }
}

function retreiveBounding(el) {
  let searchElement = null;
  switch (typeof el) {
    case 'string':
      searchElement = document.querySelector(el);
      break;

    case 'object':
      searchElement = el;
      break;

    case 'number':
      return el;
  }

  if (!searchElement) {
    return null;
  }

  return searchElement.getBoundingClientRect();
}

// el.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop;

export function scrollToElement(
  el,
  center = true,
  smooth = true,
  scrolledElement,
) {
  const elBounding = retreiveBounding(el);

  if (elBounding === null) {
    return;
  }

  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    sc = scrolledElement || {},
    y =
      sc.clientHeight ||
      sc.innerHeight ||
      w.innerHeight ||
      e.clientHeight ||
      g.clientHeight;

  // const elTopOffset = elBounding.top + getScrollTop();
  const elTopOffset =
    elBounding.top +
    (scrolledElement
      ? scrolledElement.scrollTop - scrolledElement.getBoundingClientRect().top
      : window.pageYOffset);
  const elHeight = elBounding.height;
  const top = elTopOffset - (center && elHeight < y ? (y - elHeight) / 2 : 0);

  scrollTo(top < 0 ? 0 : top, smooth, scrolledElement || window);
}

/* eslint-enable */
