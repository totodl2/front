import React, { ReactNode, RefObject } from 'react';
import videojs from 'video.js';
import cl from 'classnames';
import isEqual from 'lodash/isEqual';

import { AudioTrack, MediaSource, TextTrack, VideJsPlayerType } from './types';
import TitleBar from './components/titleBar';
import GenericDetector from './genericDetector';
import noop from '../../../lib/noop';
import { FileType } from '../../../types/FileType';
import createSources from './file/createSources';
import createTracks from './file/createTracks';
import { Maybe } from '../../../types/Maybe';

const REMAINING_WATCH = 5 * 60; // 5 minutes before the end

type SelectedAttribute = {
  label: string;
  kind: string;
  language?: string;
};

const getSelectedAudioTrackAttributes = (
  tracks: AudioTrack[],
): SelectedAttribute | null => {
  for (let i = 0, sz = tracks.length; i < sz; i++) {
    const track = tracks[i];
    if (track.enabled) {
      return {
        label: track.label,
        kind: track.kind,
        language: track.language,
      };
    }
  }
  return null;
};

const getSelectedTextTrackAttributes = (
  tracks: TextTrack[],
): SelectedAttribute | null => {
  for (let i = 0, sz = tracks.length; i < sz; i++) {
    const track = tracks[i];
    if (track.mode === 'showing') {
      return {
        label: track.label,
        kind: track.kind,
        language: track.language,
      };
    }
  }
  return null;
};

const selectAudioTrack = (
  audioTracks: AudioTrack[],
  attributes?: SelectedAttribute | null,
) => {
  if (!attributes) {
    return false;
  }

  for (let i = 0, sz = audioTracks.length; i < sz; i++) {
    const track = audioTracks[i];
    if (
      (track.label === attributes.label ||
        (track.language && track.language === attributes.language)) &&
      track.kind === attributes.kind
    ) {
      track.enabled = true;
      return true;
    }
  }

  return false;
};

const selectTextTrack = (
  textTracks: TextTrack[],
  attributes?: SelectedAttribute | null,
) => {
  if (!attributes) {
    return false;
  }

  for (let i = 0, sz = textTracks.length; i < sz; i++) {
    const track = textTracks[i];
    if (
      (track.label === attributes.label ||
        (track.language && track.language === attributes.language)) &&
      track.kind === attributes.kind
    ) {
      track.mode = 'showing';
      return true;
    }
  }

  return false;
};

type TitleBarComponentOptions = {
  title: Maybe<string>;
  onClose: Maybe<() => void>;
};

type TitleBarComponent = {
  updateContent: TitleBarComponentOptions;
};

export type PlayerTimeUpdateCallbackArgs = (data: {
  duration: number;
  currentTime: number;
  remainingTime: number;
}) => void;

export type PlayerProps = {
  className?: string;
  videoClassName?: string;
  title?: string | null;
  onClose?: () => void;
  onTimeUpdate?: PlayerTimeUpdateCallbackArgs;
  onEnded?: () => void;
  onGenericDetected?: () => void;
  file: FileType;
  watchStatus?: { position: number; length: number } | null;
};

export type PlayerState = {
  sources: MediaSource[];
  tracks: TextTrack[];
};

class Player extends React.Component<PlayerProps, PlayerState> {
  private readonly videoRef: RefObject<HTMLVideoElement>;

  private readonly genericDetector: GenericDetector;

  private player: VideJsPlayerType | null = null;

  state = { sources: [], tracks: [] };

  constructor(props: PlayerProps) {
    super(props);
    this.videoRef = React.createRef();
    this.genericDetector = new GenericDetector(this.onGenericDetected);
  }

  static getDerivedStateFromProps(props: PlayerProps): PlayerState {
    return {
      sources: createSources(props.file),
      tracks: createTracks(props.file),
    };
  }

  componentDidMount(): void {
    this.createPlayer();
  }

  componentDidUpdate(
    prevProps: PlayerProps,
    prevState: Readonly<PlayerState>,
  ): void {
    const hasNewSrc = !isEqual(prevState.sources, this.state.sources);
    const hasNewTracks = !isEqual(prevState.tracks, this.state.tracks);
    let selectedAudioAttributes: SelectedAttribute | null = null;
    let selectedSubAttributes: SelectedAttribute | null = null;

    if (hasNewSrc) {
      selectedAudioAttributes = getSelectedAudioTrackAttributes(
        this.player!.audioTracks(),
      );
      this.genericDetector.disable();
      this.player!.src(this.state.sources);
    }

    if (hasNewTracks) {
      const oldTracks = this.player!.remoteTextTracks();
      selectedSubAttributes = getSelectedTextTrackAttributes(oldTracks);

      for (let i = oldTracks.length - 1; i >= 0; i--) {
        this.player!.removeRemoteTextTrack(oldTracks[i]);
      }

      this.state.tracks.forEach(track => {
        this.player!.addRemoteTextTrack(track, false);
      });
    }

    if (hasNewSrc || hasNewTracks) {
      this.player!.ready(() => {
        this.player!.one('loadedmetadata', () => {
          selectAudioTrack(this.player!.audioTracks(), selectedAudioAttributes);
          selectTextTrack(
            this.player!.remoteTextTracks(),
            selectedSubAttributes,
          );
        });
        this.setWatchPosition();
      });
      this.player!.play();
    }

    if (
      prevProps.title !== this.props.title ||
      prevProps.onClose !== this.props.onClose
    ) {
      const child = this.player!.getChild<TitleBarComponent>(TitleBar);
      // @ts-ignore
      child.updateContent({
        onClose: this.props.onClose,
        title: this.props.title,
      });
    }

    if (prevProps.onGenericDetected && !this.props.onGenericDetected) {
      this.genericDetector.disable();
    }
  }

  // destroy player on unmount
  componentWillUnmount(): void {
    this.clearPlayer();
    this.genericDetector.destruct();
  }

  setWatchPosition = () => {
    const { watchStatus } = this.props;
    if (watchStatus) {
      this.player!.currentTime(watchStatus.position);
    }
  };

  onTimeUpdate = (): void => {
    const { onTimeUpdate, onGenericDetected } = this.props;
    const remainingTime = this.player!.remainingTime();

    if (
      onGenericDetected &&
      !this.genericDetector.isDetected() &&
      !this.genericDetector.isEnabled() &&
      remainingTime <= REMAINING_WATCH
    ) {
      this.genericDetector.setVideoElement(
        this.player!.el().querySelector('video')!,
      );
      this.genericDetector.enable();
    }

    if (
      onGenericDetected &&
      this.genericDetector.isEnabled() &&
      remainingTime > REMAINING_WATCH
    ) {
      this.genericDetector.disable();
    }

    if (!onTimeUpdate) {
      return;
    }

    onTimeUpdate({
      duration: this.player!.duration(),
      currentTime: this.player!.currentTime(),
      remainingTime,
    });
  };

  onPause = (): void => {
    this.genericDetector.stopWatch();
  };

  onPlay = (): void => {
    this.genericDetector.startWatch();
  };

  onEnded = (): void => {
    this.genericDetector.disable();
    (this.props.onEnded || noop)();
  };

  onGenericDetected = (): void => {
    (this.props.onGenericDetected || noop)();
  };

  clearPlayer = (): void => {
    if (this.player) {
      this.player.dispose();
      this.player.off('timeupdate', this.onTimeUpdate);
      // this.player.off('playerresize', this.onPlayerResize);
      this.player.off('pause', this.onPause);
      this.player.off('play', this.onPlay);
      this.player.off('ended', this.onEnded);
      this.player = null;
    }
  };

  createPlayer = (): void => {
    const { onClose, title } = this.props;
    const { sources, tracks } = this.state;
    // instantiate video.js
    this.player = (videojs(this.videoRef.current, {
      controls: true,
      preload: 'auto',
      autoplay: true,
      language: navigator.language,
      techOrder: ['html5'],
      html5: {
        preloadTextTracks: false,
        nativeControlsForTouch: false,
      },
      sources,
      tracks: tracks as videojs.TextTrackOptions[],
    }) as unknown) as VideJsPlayerType;

    this.player.addChild<TitleBarComponent, TitleBarComponentOptions>(
      TitleBar,
      { title, onClose },
    );

    this.player.ready(() => {
      this.setWatchPosition();
    });
    this.player.on('timeupdate', this.onTimeUpdate);
    // this.player.on('playerresize', this.onPlayerResize);
    this.player.on('pause', this.onPause);
    this.player.on('play', this.onPlay);
    this.player.on('ended', this.onEnded);
    this.player.on('error', e => {
      console.warn(e);
    });
  };

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render(): ReactNode {
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
