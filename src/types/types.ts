export interface IFeatures {
  geometry: { coordinates: number[]; type: string };
  properties: {
    hasMilchshake: boolean;
    timeSinceBrokenMilchshake: number | null;
    hasMcSundae: boolean;
    timeSinceBrokenMcSundae: number | null;
    hasMcFlurry: boolean;
    timeSinceBrokenMcFlurry: number | null;
    lastChecked: string;
    name: string;
    dot: string;
    open: string;
    hasMobileOrdering: boolean;
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

export enum Availability {
  AVAILABLE = 'AVAILABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  UNKNOWN = 'UNKNOWN',
  NOT_APPLICABLE = 'NOT_APPLICABLE',
}

export interface ICountryStats {
  total: number;
  trackable: number;
  availablemilchshakes: number;
  totalmilchshakes: number;
  longestbrokenmilchshake: null | string;
  availablemcflurrys: number;
  totalmcflurrys: number;
  longestbrokenmcflurry: null | string;
  availablemcsundaes: number;
  totalmcsundaes: number;
  longestbrokenmcsundae: null | string;
  country: string;
}

export interface IStats {
  countryStats: ICountryStats[];
  totalStats: ICountryStats | undefined;
}
