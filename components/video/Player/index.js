import React from 'react';
import videojs from 'video.js';
import PropTypes from 'prop-types';
import cl from 'classnames';

import TitleBar from './components/titleBar';

class Player extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    videoClassName: PropTypes.string,
    title: PropTypes.string,
    onClose: PropTypes.func,
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
    const {
      sources,
      onClose,
      className,
      videoClassName,
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
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

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
