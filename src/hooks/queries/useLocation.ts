import { QueryFunction, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ILocService } from '../../types/types';

interface ILocation {
  lat: number;
  lon: number;
}

const fetchLocation: QueryFunction<ILocation> = async ({ signal }) => {
  const { data } = await axios.get<ILocService>('/ip', { signal });

  return {
    lat: data.lat ?? 51.5074,
    lon: data.lon ?? -0.1278,
  };
};

export const useLocation = () => {
  return useQuery({
    queryKey: ['location'],
    queryFn: fetchLocation,
  });
};
