const color = require('color');

const primary = color('#374ac5');
const secondary = color('#c4caef');
const ternary = color('#ffbd9e');
const success = color('#33ac2e');
const danger = color('#e84a50');
const warning = color('#ffc107');
const white = color('#fff');
const black = color('#000');
const info = color('#00c1d4');
const backgroundGradient = `linear-gradient(45deg, ${ternary.string()} 0, ${secondary.string()} 58%)`;
const boxShadowSm = `0 5px 5px 0 ${primary
  .fade(0.93)
  .string()}, 0 5px 10px 0 ${primary.fade(0.93).string()}`;
const boxShadow = `0 5px 5px 0 ${primary
  .fade(0.93)
  .string()}, 0 5px 15px 0 ${primary.fade(0.93).string()}`;
const boxShadowLg = `0 5px 8px 0 ${primary
  .fade(0.93)
  .string()}, 0 5px 20px 0 ${primary.fade(0.93).string()}`;
const fontFamily =
  'Rubik, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
const fontWeightLight = '300';
const fontWeightNormal = '400';
const fontWeightBold = '500';
const gray100 = color('#ededf1');
const gray200 = color('#dfe0e6');
const gray300 = color('#d1d2db');
const gray400 = color('#c1c3cf');
const gray500 = color('#b0b2c1');
const gray600 = color('#9c9fb2');
const gray700 = color('#84889f');
const gray800 = color('#676b85');
const gray900 = color('#3c3e4e');
const dark = gray800;
const borderRadius = '1.5rem';
const borderRadiusLg = '1.5rem';
const borderRadiusSm = '1rem';
const textMuted = gray600;

const inputBtnPaddingY = '.375rem';
const inputBtnPaddingX = '.75rem';
const inputBtnPaddingYSm = '.25rem';
const inputBtnPaddingXSm = '.5rem';
const inputBtnPaddingYLg = '.5rem';
const inputBtnPaddingXLg = '1rem';

const bodyColor = gray900;

const inputPlaceholderColor = gray700;
const inputColor = bodyColor;
const inputBg = white.fade(0.6);
const inputBorderWidth = '1px';
const inputDisabledBg = gray200;
const inputBorderColor = white.fade(0.3);
const inputBoxShadow = `inset 0 1px 1px ${black.fade(0.93).string()}`; // rgba($black, .075)'; //! default
const inputFocusColor = gray900;
const inputFocusBg = white.fade(0.5);
const inputFocusBorderColor = white.fade(0.5);

const inputPaddingY = inputBtnPaddingY;
const inputPaddingX = inputBtnPaddingX;

const customCheckboxIndicatorBorderRadius = '0.35rem';

const gridBreakpoints = {
  xxs: '0',
  xs: '400',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1440px',
};

const containerMaxWidths = {
  sm: '540px',
  md: '720px',
  lg: '960px',
  xl: '1140px',
  xxl: '1200px',
};

const zindexDropdown = 1000;
const zindexSticky = 1020;
const zindexFixed = 1030;
const zindexModalBackdrop = 1040;
const zindexModal = 1050;
const zindexPopover = 1060;
const zindexTooltip = 1070;

module.exports = {
  gridBreakpoints,
  containerMaxWidths,
  primary,
  secondary,
  ternary,
  success,
  danger,
  warning,
  white,
  info,
  bodyColor,
  backgroundGradient,
  boxShadowSm,
  boxShadow,
  boxShadowLg,
  fontFamily,
  fontWeightLight,
  fontWeightNormal,
  fontWeightBold,
  gray100,
  gray200,
  gray300,
  gray400,
  gray500,
  gray600,
  gray700,
  gray800,
  gray900,
  dark,
  borderRadius,
  borderRadiusLg,
  borderRadiusSm,
  customCheckboxIndicatorBorderRadius,
  inputBtnPaddingY,
  inputBtnPaddingX,
  inputBtnPaddingYSm,
  inputBtnPaddingXSm,
  inputBtnPaddingYLg,
  inputBtnPaddingXLg,
  inputPaddingY,
  inputPaddingX,
  inputPlaceholderColor,
  inputColor,
  inputBg,
  inputBorderWidth,
  inputDisabledBg,
  inputBorderColor,
  inputBoxShadow,
  inputFocusColor,
  inputFocusBg,
  inputFocusBorderColor,
  textMuted,
  zindexDropdown,
  zindexSticky,
  zindexFixed,
  zindexModalBackdrop,
  zindexModal,
  zindexPopover,
  zindexTooltip,
};
