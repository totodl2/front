import { SubmissionError } from 'redux-form';
// import { getSentry } from 'providers/Sentry/SentryProvider';
import get from 'lodash.get';
import set from 'lodash.set';

export function handleResponseErrors(error, submittedData, prefix) {
  const { response = {} } = error;
  if (response.data && response.data.violations) {
    return processServerErrors(response.data.violations, prefix);
  }

  if (response.status === 410) {
    throw new SubmissionError({ _error: 'Token has expired' });
  }

  // const Sentry = getSentry();
  // Sentry.withScope(scope => {
  //   scope.setExtra('data', submittedData);
  //   Sentry.captureException(error);
  // });

  throw new SubmissionError({
    _error:
      get(response, 'data.message') ||
      'Unknown error, please retry later or contact an administrator',
  });
}

export default function processServerErrors(violations, prefix) {
  throw new SubmissionError(
    violations.reduce((out, e) => {
      const defineField = () => {
        if (!e.path || e.path.length <= 0) {
          return '_error';
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
    }, {}),
  );
}
