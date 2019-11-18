const steps = [
  { modulo: 60, labelMin: 's', label: 'second', labelPlu: 'seconds' },
  { modulo: 60, labelMin: 'm', label: 'minute', labelPlu: 'minutes' },
  { modulo: 24, labelMin: 'h', label: 'hour', labelPlu: 'hours' },
  { modulo: -1, labelMin: 'd', label: 'day', labelPlu: 'days' },
];

function timeStep(data, step, isShort) {
  let { modulo } = step;
  if (modulo === -1) {
    modulo = data.time + 1;
  }

  const rest = data.time % modulo;
  if (rest) {
    if (isShort) {
      // eslint-disable-next-line no-param-reassign
      data.text = `${rest}${step.labelMin} ${data.text}`;
    } else {
      // eslint-disable-next-line no-param-reassign
      data.text = `${rest} ${rest > 1 ? step.labelPlu : step.label} ${
        data.text
      }`;
    }
  }

  // eslint-disable-next-line no-param-reassign
  data.time -= rest;
  // eslint-disable-next-line no-param-reassign
  data.time /= modulo;
}

const ETA = ({ time, short }) => {
  if (time <= 0) {
    return 'Unknown';
  }

  const data = { time, text: '' };
  steps.forEach(step => timeStep(data, step, short));
  return data.text;
};

export default ETA;
