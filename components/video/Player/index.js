import React from 'react';
import videojs from 'video.js';
import PropTypes from 'prop-types';
import cl from 'classnames';

import TitleBar from './components/titleBar';

const getSelectedTrackAttributes = (tracks, type) => {
  for (let i = 0, sz = tracks.length; i < sz; i++) {
    const track = tracks[i];
    if (
      (type === 'sub' && track.mode === 'showing') ||
      (type === 'audio' && track.enabled)
    ) {
      return {
        label: track.label,
        kind: track.kind,
        language: track.language,
      };
    }
  }
  return null;
};

const selectTrack = (attributes, tracks, type) => {
  if (!attributes) {
    return false;
  }

  for (let i = 0, sz = tracks.length; i < sz; i++) {
    const track = tracks[i];
    if (
      (track.label === attributes.label ||
        (track.language && track.language === attributes.language)) &&
      track.kind === attributes.kind
    ) {
      if (type === 'sub') {
        track.mode = 'showing';
      } else {
        track.enabled = true;
      }
      return true;
    }
  }

  return false;
};

class Player extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    videoClassName: PropTypes.string,
    title: PropTypes.string,
    onClose: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }),
    ).isRequired,
    tracks: PropTypes.arrayOf(
      PropTypes.shape({
        kind: PropTypes.string,
        label: PropTypes.string,
        srclang: PropTypes.string,
        src: PropTypes.string,
      }),
    ),
  };

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.createPlayer();
  }

  componentDidUpdate(prevProps) {
    const hasNewSrc = prevProps.sources !== this.props.sources;
    const hasNewTracks = prevProps.tracks !== this.props.tracks;
    let selectedAudioAttributes = null;
    let selectedSubAttributes = null;

    if (hasNewSrc) {
      selectedAudioAttributes = getSelectedTrackAttributes(
        this.player.audioTracks(),
        'audio',
      );
      this.player.src(this.props.sources);
    }

    if (hasNewTracks) {
      const oldTracks = this.player.remoteTextTracks();
      selectedSubAttributes = getSelectedTrackAttributes(oldTracks, 'sub');

      for (let i = oldTracks.length - 1; i >= 0; i--) {
        this.player.removeRemoteTextTrack(oldTracks[i]);
      }

      this.props.tracks.forEach(track => {
        this.player.addRemoteTextTrack(track, false);
      });
    }

    if (hasNewSrc || hasNewTracks) {
      this.player.ready(() => {
        this.player.one('loadedmetadata', () => {
          selectTrack(
            selectedAudioAttributes,
            this.player.audioTracks(),
            'audio',
          );

          selectTrack(
            selectedSubAttributes,
            this.player.remoteTextTracks(),
            'sub',
          );
        });
      });
      this.player.play();
    }

    if (
      prevProps.title !== this.props.title ||
      prevProps.onClose !== this.props.onClose
    ) {
      this.player.getChild(TitleBar).updateContent({
        onClose: this.props.onClose,
        title: this.props.title,
      });
    }
  }

  // destroy player on unmount
  componentWillUnmount() {
    this.clearPlayer();
  }

  onTimeUpdate = () => {
    const { onTimeUpdate } = this.props;
    if (!onTimeUpdate) {
      return null;
    }

    return onTimeUpdate({
      duration: this.player.duration(),
      currentTime: this.player.currentTime(),
      remainingTime: this.player.remainingTime(),
    });
  };

  clearPlayer = () => {
    if (this.player) {
      this.player.dispose();
      this.player.off('timeupdate', this.onTimeUpdate);
      this.player = null;
    }
  };

  createPlayer = () => {
    const {
      onClose,
      className,
      videoClassName,
      sources,
      tracks,
      title,
      ...props
    } = this.props;
    // instantiate video.js
    this.player = videojs(this.videoRef.current, {
      controls: true,
      preload: 'auto',
      autoplay: true,
      language: navigator.language,
      ...props,
      techOrder: ['html5'],
      html5: {
        preloadTextTracks: false,
        nativeControlsForTouch: false,
      },
      sources,
      tracks,
    });

    this.player.addChild(TitleBar, {
      title,
      onClose,
    });

    this.player.on('timeupdate', this.onTimeUpdate);
    this.player.on('error', e => {
      console.warn(e);
    });
  };

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    const { className, videoClassName } = this.props;
    return (
      <div className={cl(className)}>
        <div data-vjs-player>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={this.videoRef}
            className={cl('video-js', videoClassName)}
          />
        </div>
      </div>
    );
  }
}

export default Player;
