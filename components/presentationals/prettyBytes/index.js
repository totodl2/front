import convert from 'pretty-bytes';

const PrettyBytes = ({ bytes }) => convert(parseInt(bytes || 0, 10));

export default PrettyBytes;
