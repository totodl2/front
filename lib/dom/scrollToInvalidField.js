import { scrollToElement } from './scrollTo';

const scrollToInvalidField = formId => () => {
  if (!document) {
    return;
  }

  setImmediate(() => {
    const el = document.querySelector(
      `#${formId} input.is-invalid, #${formId} .is-invalid, #${formId} .invalid-feedback--visible`,
    );

    if (el) {
      scrollToElement(el);
      el.focus();
    }
  });
};

export default scrollToInvalidField;
