const sanitize = str => (str || '').replace(/([^a-zA-Z0-9-])/gi, '-');
export default sanitize;
