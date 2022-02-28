import { useEffect, useState } from 'react';
import { Flex, Grid, Text } from '@chakra-ui/layout';
import axios from 'axios';
import type { NextPage } from 'next';
import {
  Center,
  CustomGridItem,
  DashboardStatsCard,
  InfoCard,
  LinkContainer,
} from '../components';
import { ICountryStats, IIPService, IStats } from '../types/types';

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const [markers, setMarkers] = useState<GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    GeoJSON.GeoJsonProperties
  > | null>(null);
  const [stats, setStats] = useState<IStats | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const [responseMarker, responseStats] = await Promise.all([
        axios.get('/assets/marker.json'),
        await axios.get('/assets/stats.json'),
      ]);
      const dataMarker = responseMarker.data as GeoJSON.FeatureCollection<
        GeoJSON.Geometry,
        GeoJSON.GeoJsonProperties
      >;

      const dataStats = responseStats.data as ICountryStats[];
      const total = dataStats.find((elem) => elem.country === 'UNKNOWN');

      const sortedDataStats = dataStats.sort((a, b) =>
        a.total > b.total ? -1 : 1,
      );

      setStats({
        countryStats: sortedDataStats,
        totalStats: total,
      });
      setMarkers(dataMarker);
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      const response = await axios.get(`http://ip-api.com/json`);
      const data = response.data as IIPService;

      setCurrentLocation({
        lat: data.lat ?? 51.5074,
        lon: data.lon ?? -0.1278,
      });
    };

    fetchLocation();
  }, []);

  return (
    <>
      <Flex
        height="100vh"
        width="100vw"
        justifyContent="center"
        flexWrap="wrap"
        padding="2"
      >
        <Grid
          templateColumns="repeat(4, 1fr)"
          templateRows="auto 1fr"
          gap={2}
          w="100%"
          height="100%"
        >
          <CustomGridItem height="5rem" colSpan={[4, 4, 1]}>
            <DashboardStatsCard
              label="Trackable McDonalds"
              value={stats?.totalStats?.trackable}
              total={stats?.totalStats?.total}
            />
          </CustomGridItem>
          <CustomGridItem height="5rem" display={['none', 'none', 'block']}>
            <DashboardStatsCard
              label="Available Milchshakes"
              value={stats?.totalStats?.availablemilchshakes}
              total={stats?.totalStats?.totalmilchshakes}
            />
          </CustomGridItem>
          <CustomGridItem height="5rem" display={['none', 'none', 'block']}>
            <DashboardStatsCard
              label="Available McFlurries"
              value={stats?.totalStats?.availablemcflurrys}
              total={stats?.totalStats?.totalmcflurrys}
            />
          </CustomGridItem>
          <CustomGridItem height="5rem" display={['none', 'none', 'block']}>
            <DashboardStatsCard
              label="Available McSundaes"
              value={stats?.totalStats?.availablemcsundaes}
              total={stats?.totalStats?.totalmcsundaes}
            />
          </CustomGridItem>
          <CustomGridItem height="100%" colSpan={4}>
            <Center
              markers={markers}
              currentLocation={currentLocation}
              countryStats={stats?.countryStats}
            />
          </CustomGridItem>
          <CustomGridItem height="5rem" display={['none', 'none', 'block']}>
            <LinkContainer url="https://mcbroken.com/">
              <Text>Inspired by McBroken.com</Text>
            </LinkContainer>
          </CustomGridItem>
          <CustomGridItem height="5rem" display={['none', 'none', 'block']}>
            <LinkContainer url="https://github.com/paulbtw/mcbrokenio">
              <Text>Backend Source</Text>
            </LinkContainer>
          </CustomGridItem>
          <CustomGridItem height="5rem" display={['none', 'none', 'block']}>
            <LinkContainer url="https://github.com/paulbtw/mcbrokenio-frontend">
              <Text>Website Source</Text>
            </LinkContainer>
          </CustomGridItem>
          <CustomGridItem height="5rem" colSpan={[4, 4, 1]}>
            <InfoCard />
          </CustomGridItem>
        </Grid>
      </Flex>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const forwarded = req.headers['x-forwarded-for'] as string;
//   const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
//   const response = await axios.get(`http://ip-api.com/json/${ip}`);
//   const data = response.data as IIPService;

//   return {
//     props: {
//       currentLocation: {
//         lat: data.lat ?? 51.5074,
//         lon: data.lon ?? -0.1278,
//       },
//     },
//   };
// };

export default Home;
