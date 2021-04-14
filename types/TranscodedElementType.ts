export enum TranscodedElementTypes {
  SUBTITLES = 'sub',
  MEDIA = 'media',
}

export type TranscodedElementType = {
  lang?: string;
  title: string;
  type: TranscodedElementTypes;
  url: string;
};
