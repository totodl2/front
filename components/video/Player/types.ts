export type Track = {
  kind: string;
  id?: string;
  label: string;
  language?: string;
};

export type TextTrack = {
  mode?: string;
  srclang?: string;
  src: string;
  default?: boolean;
} & Track;

export type AudioTrack = {
  enabled?: boolean;
} & Track;

export type MediaSource = {
  src: string;
  type: string;
};

export type VideJsPlayerType = {
  audioTracks: () => AudioTrack[];
  src: (src?: string | MediaSource | MediaSource[]) => void;
  remoteTextTracks: () => TextTrack[];
  removeRemoteTextTrack: (track: TextTrack) => void;
  addRemoteTextTrack: (
    track: TextTrack,
    manualCleanup?: boolean,
  ) => HTMLTrackElement;
  ready: (callback: () => void, sync?: boolean) => void;
  on: (event: string, callback: (evt?: any) => void) => void;
  one: (event: string, callback: (evt?: any) => void) => void;
  off: (event: string, callback: (evt?: any) => void) => void;
  play: () => void;
  getChild: <T>(element: string) => T;
  addChild: <T, O>(element: string, options: O) => T;
  remainingTime: () => number;
  el: () => HTMLVideoElement;
  duration: () => number;
  currentTime: () => number;
  dispose: () => void;
};
