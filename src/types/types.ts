export interface IFeatures {
  geometry: { coordinates: number[]; type: string };
  properties: {
    hasMilchshake: boolean;
    hasMcSundae: boolean;
    hasMcFlurry: boolean;
    lastChecked: string;
    name: string;
    dot: string;
    open: string;
  };
  type: string;
}

export interface IGeoJson {
  type: string;
  features: IFeatures[];
  crs: {
    type: string;
    properties: {};
  };
}

export interface IIPService {
  query: string;
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}
