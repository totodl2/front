import get from 'lodash/get';

const querySelectorParent = (selector, el) => {
  let node = get(el, 'parentElement');

  while (node) {
    if (node.matches(selector)) {
      return node;
    }
    node = node.parentElement;
  }

  return null;
};

export default querySelectorParent;
