import React from 'react';
import ReactSelect from 'react-select';

import styles from './styles';

const Select = React.forwardRef((props, ref) => (
  <ReactSelect styles={styles} {...props} ref={ref} />
));

export default Select;
