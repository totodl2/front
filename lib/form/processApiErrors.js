import { FORM_ERROR } from 'final-form';
// import { getSentry } from 'providers/Sentry/SentryProvider';
import get from 'lodash/get';
import set from 'lodash/set';

export function handleResponseErrors(error, submittedData, prefix) {
  const { response = {} } = error;
  if (response.data && response.data.violations) {
    return processServerErrors(response.data.violations, prefix);
  }

  if (response.status === 410) {
    return { [FORM_ERROR]: 'Token has expired' };
  }

  // const Sentry = getSentry();
  // Sentry.withScope(scope => {
  //   scope.setExtra('data', submittedData);
  //   Sentry.captureException(error);
  // });

  return {
    [FORM_ERROR]:
      get(response, 'data.message') ||
      'Unknown error, please retry later or contact an administrator',
  };
}

export default function processServerErrors(violations, prefix) {
  return violations.reduce((out, e) => {
    const defineField = () => {
      if (!e.path || e.path.length <= 0) {
        return FORM_ERROR;
      }
      if (!prefix) {
        return e.path.join('.');
      }
      return `${prefix}.${e.path.join('.')}`;
    };
    const field = defineField();

    const errors = get(out, field, []);
    errors.push(e.message);

    set(out, field, errors);
    return out;
  }, {});
}
