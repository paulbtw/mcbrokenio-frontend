import { QueryFunction, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ICountryStats } from '../../types/types';

interface IStats {
  countryStats: ICountryStats[];
  totalStats?: ICountryStats;
}

const fetchStats: QueryFunction<IStats> = async ({ signal }) => {
  const { data } = await axios.get<ICountryStats[]>('/assets/stats.json', {
    signal,
  });

  const totalStats = data.find((elem) => elem.country === 'UNKNOWN');
  // Leetcode way of doing this :D
  const sortedCountryStats = data.sort((a, b) => (a.total > b.total ? -1 : 1));

  sortedCountryStats.shift();

  return {
    countryStats: sortedCountryStats,
    totalStats,
  };
};

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });
};
