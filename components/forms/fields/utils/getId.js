import sanitizeId from './sanitizeId';

const getId = (meta, input) => sanitizeId(`${meta.form}-${input.name}`);

export default getId;
