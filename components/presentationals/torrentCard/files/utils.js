export const sortAlpha = (a, b) => {
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
};

export const sortFilesAlpha = ({ basename: a }, { basename: b }) =>
  sortAlpha(a, b);
export const sortDirAlpha = ([a], [b]) => sortAlpha(a, b);
