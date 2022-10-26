import { FC } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { ICountryStats } from '../types/types';
import { CountryTable } from './CountryTable';

interface IProps {
  markers?: GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    GeoJSON.GeoJsonProperties
  >;
  currentLocation?: {
    lat: number;
    lon: number;
  };
  countryStats?: ICountryStats[];
}

const Map = dynamic(() => import('./Map'), {
  ssr: false,
});

export const Center: FC<IProps> = ({
  markers,
  currentLocation,
  countryStats,
}) => {
  return (
    <>
      <Tabs width="100%" height="100%">
        <TabList>
          <Tab>Map</Tab>
          <Tab>Stats</Tab>
        </TabList>
        <TabPanels width="100%" height="100%">
          <TabPanel width="100%" height="100%" p={0}>
            {markers && currentLocation && (
              <Map markers={markers} currentLocation={currentLocation} />
            )}
          </TabPanel>
          <TabPanel width="100%" height="100%" p={0}>
            <CountryTable data={countryStats} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
