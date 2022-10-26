import { QueryFunction, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchMarkers: QueryFunction<
  GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>
> = async ({ signal }) => {
  const { data } = await axios.get<
    GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>
  >('/assets/marker.json', {
    signal,
  });

  return data;
};

export const useMarkers = () => {
  return useQuery({
    queryKey: ['markers'],
    queryFn: fetchMarkers,
  });
};
