import selectStyles from '../Select/styles';
import theme from '../../../../styles/variables';

const scrollbarColor = theme.dark;
const trackColor = scrollbarColor.fade(0.3);
const bgColor = scrollbarColor.fade(0.9);
const size = '0.5rem';

const newStyles = {
  ...selectStyles,
  menuList: styles => ({
    ...styles,
    maxHeight: '80vh',
    paddingTop: 0,
    paddingBottom: 0,
    scrollbarColor: `${trackColor.string()} ${bgColor.string()}`,
    scrollbarWidth: 'thin',

    /* width */
    '&::-webkit-scrollbar': {
      width: size,
      height: size,
    },

    /* Track */
    '&::-webkit-scrollbar-track': {
      background: bgColor.string(),
      borderRadius: size,
    },

    /* Handle */
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: trackColor.string(),
      borderRadius: size,
    },

    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: trackColor,
    },
  }),
  option: (styles, modifiers) => ({
    ...selectStyles.option(styles, modifiers),
    padding: '0px',
  }),
  menu: defaultStyles => ({
    ...selectStyles.menu(defaultStyles),
    backgroundColor: theme.white.fade(0.02).string(),
    WebkitBackdropFilter: null,
    backdropFilter: null,
  }),
};
export default newStyles;
