import { scrollToElement } from './scrollTo';

export default function(formId) {
  return () => {
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
}
