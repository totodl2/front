import isServer from '../../../lib/isServer';

const DEFAULT_FPS = 5;
const DEFAULT_ANALYZED_WIDTH = 120;
const DEFAULT_TIME_BEFORE_NOTIFICATION = 3; // in s

const luminance = (r: number, g: number, b: number) =>
  0.2126 * r + 0.7152 * g + 0.0722 * b;

type onDetectedCallback = () => void;

type FrameTopType = { top: number; time: number };

class GenericDetector {
  /**
   * @type {HTMLCanvasElement}
   */
  private canvas: HTMLCanvasElement | null = null;

  /**
   * @type {CanvasRenderingContext2D}
   */
  ctx: CanvasRenderingContext2D | null = null;

  /**
   * @type {HTMLVideoElement|null}
   */
  video: HTMLVideoElement | null = null;

  interval: ReturnType<typeof setInterval> | null = null;

  enabled = false;

  frames: FrameTopType[] = [];

  fps = DEFAULT_FPS;

  analyzedWidth = DEFAULT_ANALYZED_WIDTH;

  timeBeforeNotification = DEFAULT_TIME_BEFORE_NOTIFICATION;

  detected = false;

  onDetected: onDetectedCallback | null;

  constructor(
    onDetected: onDetectedCallback,
    fps = DEFAULT_FPS,
    analyzedWidth = DEFAULT_ANALYZED_WIDTH,
    timeBeforeNotification = DEFAULT_TIME_BEFORE_NOTIFICATION,
  ) {
    this.onDetected = onDetected;
    this.fps = fps;
    this.timeBeforeNotification = timeBeforeNotification;
    this.analyzedWidth = analyzedWidth;
    if (!isServer) {
      this.setCanvas(document.createElement('canvas'));
    }
  }

  destruct(): void {
    this.onDetected = null;
    if (this.canvas) {
      this.canvas.remove();
    }
    if (this.interval) {
      this.stopWatch();
    }
  }

  setCanvas = (canvas: HTMLCanvasElement): void => {
    if (this.canvas) {
      this.canvas.remove();
    }

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    if (this.video) {
      const ratio = this.video.videoHeight / this.video.videoWidth;
      this.canvas.width = this.analyzedWidth;
      this.canvas.height = Math.floor(this.analyzedWidth * ratio);
    }
  };

  /**
   * @param {HTMLVideoElement} video
   * @returns {GenericDetector}
   */
  setVideoElement = (video: HTMLVideoElement): void => {
    this.video = video;
    const ratio = this.video.videoHeight / this.video.videoWidth;
    if (this.canvas) {
      this.canvas.width = this.analyzedWidth;
      this.canvas.height = Math.floor(this.analyzedWidth * ratio);
    }
  };

  reset = (): void => {
    this.frames = [];
    this.detected = false;
    this.stopWatch();
  };

  enable = (): void => {
    this.reset();
    this.enabled = true;
    this.startWatch();
  };

  disable = (): void => {
    this.reset();
    this.enabled = false;
  };

  isEnabled = (): boolean => this.enabled;

  isDetected = (): boolean => this.detected;

  onWatch = (): void => {
    try {
      if (!this.canvas || !this.video || !this.ctx) {
        return;
      }

      const { width, height } = this.canvas;
      const time = this.video.currentTime;
      this.ctx.drawImage(this.video, 0, 0, width, height);
      const frame = this.ctx.getImageData(0, 0, width, height);

      const luminances = [];
      for (let i = 0, sz = frame.data.length / 4; i < sz; i++) {
        const offset = i * 4;
        const r = frame.data[offset];
        const g = frame.data[offset + 1];
        const b = frame.data[offset + 2];
        luminances.push(luminance(r, g, b));
      }

      const repartition: { [key: number]: number } = {};
      luminances.forEach(l => {
        const impreciseLuminance = Math.floor(l);
        repartition[impreciseLuminance] =
          (repartition[impreciseLuminance] || 0) + 1;
      });

      const repartitionPc = Object.entries(repartition)
        .map(([, value]) => value / luminances.length)
        .sort((a, b) => b - a);

      const top = repartitionPc
        .slice(0, 3)
        .reduce((prev, current) => prev + current, 0);

      this.addFrame({ top, time });
    } catch (e) {
      console.warn(e);
      this.disable();
    }
  };

  addFrame = (frame: FrameTopType): void => {
    const { top, time } = frame;
    if (top <= 0.85) {
      this.frames = []; // reset similar frames history
      return;
    }

    this.frames.push(frame);

    const firstTime = this.frames[0].time;
    if (firstTime > time) {
      this.frames = []; // time should be incremental, if not history is resettled
      return;
    }

    const diff = time - firstTime;
    if (diff > this.timeBeforeNotification) {
      if (this.onDetected) {
        this.onDetected();
      }
      this.disable();
      this.detected = true;
    }
  };

  startWatch = (): void => {
    if (!this.enabled) {
      return;
    }

    this.stopWatch();
    this.interval = setInterval(this.onWatch, 1000 / this.fps);
  };

  stopWatch = (): void => {
    if (this.interval === null) {
      return;
    }

    clearInterval(this.interval);
    this.interval = null;
  };

  isWatching = (): boolean => !!this.interval;
}

export default GenericDetector;
