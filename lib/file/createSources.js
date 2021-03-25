const createSources = file => [
  {
    src: file.vodUrl,
    type: 'application/x-mpegURL',
  },
];

export default createSources;
