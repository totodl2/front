const defaultCharset =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const createRandom = (size, charset = defaultCharset) => {
  let str = '';
  for (let i = 0, sl = charset.length; i < size; i++) {
    str += charset[Math.floor(Math.random() * sl)];
  }
  return str;
};

export default createRandom;
