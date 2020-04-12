import React from 'react';
import videojs from 'video.js';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoRef.current, {
      techOrder: ['html5'],
      controls: true,
      preload: 'auto',
      autoplay: true,
      language: navigator.language,
      ...this.props,
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
    return (
      <div className="embed-responsive embed-responsive-16by9">
        <div data-vjs-player>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={this.videoRef}
            className="video-js embed-responsive-item"
          />
        </div>
      </div>
    );
  }
}

export default Player;
