const primary = '#374ac5';
const secondary = '#c4caef';
const ternary = '#ffbd9e';
const success = '#33ac2e';
const danger = '#e84a50';
const warning = '#ffc107';
const white = '#fff';
const info = '#00c1d4';
const backgroundGradient = 'linear-gradient(45deg, #ffbd9e 0, #c4caef 58%)';
const boxShadowSm =
  '0 5px 5px 0 rgba(46,91,255,.07), 0 5px 10px 0 rgba(46,91,255,.07)';
const boxShadow =
  '0 5px 5px 0 rgba(46,91,255,.07), 0 5px 15px 0 rgba(46,91,255,.07)';
const boxShadowLg =
  '0 5px 8px 0 rgba(46,91,255,.07), 0 5px 20px 0 rgba(46,91,255,.07)';
const fontFamily =
  'Rubik, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
const fontWeightLight = '300';
const fontWeightNormal = '400';
const fontWeightBold = '500';
const gray100 = '#ededf1';
const gray200 = '#dfe0e6';
const gray300 = '#d1d2db';
const gray400 = '#c1c3cf';
const gray500 = '#b0b2c1';
const gray600 = '#9c9fb2';
const gray700 = '#84889f';
const gray800 = '#676b85';
const gray900 = '#3c3e4e';
const borderRadius = '1.5rem';
const borderRadiusLg = '1.5rem';
const borderRadiusSm = '1rem';

const mapping = {
  h1FontSize: 'h1-font-size',
  h2FontSize: 'h2-font-size',
  h3FontSize: 'h3-font-size',
  h4FontSize: 'h4-font-size',
  h5FontSize: 'h5-font-size',
  h6FontSize: 'h6-font-size',
};

const customCheckboxIndicatorBorderRadius = '0.35rem';

const variables = {
  primary,
  secondary,
  ternary,
  success,
  danger,
  warning,
  white,
  info,
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
  borderRadius,
  borderRadiusLg,
  borderRadiusSm,
  customCheckboxIndicatorBorderRadius,
};

module.exports = {
  ...variables,
  ...Object.entries(variables).reduce(
    (prev, [name, value]) => ({
      ...prev,
      [mapping[name] ||
      name.replace(
        /([A-Z0-9][0-9]*)/g,
        match => `-${match.toLowerCase()}`,
      )]: value,
    }),
    {},
  ),
};
