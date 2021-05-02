export type MetadataConfigurationType = {
  loading: boolean;
  images: {
    baseUrl: string;
    secureBaseUrl: string;
    backdropSizes: string[];
    logoSizes: string[];
    posterSizes: string[];
    profileSizes: string[];
    stillSizes: string[];
  };
  changeKeys: string[];
};
