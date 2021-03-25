const createTracks = file =>
  (file.transcoded || [])
    .filter(el => el.type === 'sub')
    .map(sub => ({
      kind: 'caption',
      label: sub.title,
      srclang: sub.lang,
      src: sub.url,
    }));

export default createTracks;
