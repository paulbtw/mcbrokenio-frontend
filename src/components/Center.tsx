import { FC } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { ICountryStats } from '../types/types';
import { AdvancedTable } from './AdvancedTable';
import { CountryTable } from './CountryTable';
import { World } from './World';

interface IProps {
  markers: GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    GeoJSON.GeoJsonProperties
  > | null;
  currentLocation: {
    lat: number;
    lon: number;
  };
  countryStats: ICountryStats[] | undefined;
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
          <Tab>3D World</Tab>
          <Tab disabled>Advanced Table</Tab>
        </TabList>
        <TabPanels width="100%" height="100%">
          <TabPanel width="100%" height="100%" p={0}>
            {markers && (
              <Map markers={markers} currentLocation={currentLocation} />
            )}
          </TabPanel>
          <TabPanel width="100%" height="100%" p={0}>
            <CountryTable data={countryStats} />
          </TabPanel>
          <TabPanel width="100%" height="100%" p={0}>
            <World />
          </TabPanel>
          <TabPanel width="100%" height="100%" p={0}>
            <AdvancedTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
