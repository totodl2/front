import color from 'color';

import variables from '../../../../styles/variables';

const primary = color(variables.primary);
const danger = color(variables.danger);
const success = color(variables.success);

const inputPaddingSingle = `${variables.inputPaddingY} ${variables.inputPaddingX}`;
const inputPaddingMultiEmpty = inputPaddingSingle;
const inputPaddingMultiNonEmpty = '0.1rem 0.2rem';

const errorShadow = `0 0 0 0.2rem ${danger.fade(0.75).string()})`;
const successShadow = `0 0 0 0.2rem ${success.fade(0.75).string()})`;
const focusShadow = `0 0 0 0.2rem ${primary.fade(0.75).string()}`;

const newStyles = {
  control: (
    defaultStyles,
    { isDisabled, isFocused, selectProps: { valid, invalid } },
  ) => {
    const styles = {
      ...defaultStyles,
      borderWidth: variables.inputBorderWidth,
      borderColor: variables.inputBorderColor.string(),
      borderRadius: variables.borderRadius,
      backgroundColor: isDisabled
        ? variables.inputDisabledBg.string()
        : variables.inputBg.string(),
      transition: 'box-shadow 0.15s ease-in-out',
    };
    delete styles['&:hover'];

    if (isFocused) {
      styles.boxShadow = focusShadow;
      styles.borderColor = variables.inputFocusBorderColor.string();
    }

    if (valid === true) {
      styles.boxShadow = isFocused ? successShadow : styles.boxShadow;
      styles.borderColor = variables.success.string();
    }
    if (invalid === true) {
      styles.borderColor = variables.danger.string();
      styles.boxShadow = isFocused ? errorShadow : styles.boxShadow;
    }

    return styles;
  },
  placeholder: styles => ({
    ...styles,
    color: variables.inputPlaceholderColor.string(),
  }),
  valueContainer: (styles, { isMulti, hasValue }) => {
    let padding = inputPaddingSingle;
    if (isMulti) {
      padding = hasValue ? inputPaddingMultiNonEmpty : inputPaddingMultiEmpty;
    }
    return {
      ...styles,
      padding,
      fontWeight: variables.fontWeightNormal,
    };
  },
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none',
  }),
  input: styles => ({
    ...styles,
    color: variables.bodyColor.string(),
    fontWeight: variables.fontWeightNormal,
    margin: '0 !important',
    padding: '0 !important',
  }),
  option: (styles, { isSelected, isFocused }) => {
    const baseStyle = {
      ...styles,
      cursor: 'pointer',
      color: variables.bodyColor.string(),
      '&:nth-of-type(odd)': {
        backgroundColor: variables.primary.fade(0.95).string(),
      },
      '&:active': {
        backgroundColor: variables.primary.fade(0.9).string(),
      },
      '&:hover': {
        backgroundColor: `${variables.primary.fade(0.85).string()} !important`,
      },
    };

    if (isFocused) {
      return {
        ...baseStyle,
        backgroundColor: `${variables.primary.fade(0.9).string()} !important`,
      };
    }

    if (isSelected) {
      return {
        ...baseStyle,
        backgroundColor: variables.primary.fade(0.9).string(),
      };
    }

    return baseStyle;
  },
  singleValue: styles => ({
    ...styles,
    color: variables.bodyColor.string(),
  }),
  menuPortal: styles => ({
    ...styles,
    zIndex: variables.zindexFixed + 2,
  }),
  menu: styles => ({
    ...styles,
    bottom: 'auto',
    zIndex: variables.zindexDropdown,
    border: '0', // `${variables.borderWidth} solid ${variables.inputBorderColor}`,
    boxShadow: `${variables.boxShadow} !important`, // variables.inputBoxShadow,
    borderRadius: variables.borderRadius,
    backgroundColor: variables.white.fade(0.2).string(),
    overflow: 'hidden',
    WebkitBackdropFilter: 'blur(0.7rem)',
    backdropFilter: 'blur(0.7rem)',

    '@supports (not (-webkit-backdrop-filter: blur(0.7rem))) and (not (backdrop-filter: blur(0.7rem)))': {
      backgroundColor: variables.white.fade(0.1).string(),
    },
  }),
  loadingIndicator: styles => ({
    ...styles,
    fontSize: '6px',
  }),
};

export default newStyles;
