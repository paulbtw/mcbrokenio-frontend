import { useEffect, useState } from 'react';
import { Box, Center, Flex, Grid, Heading, Link } from '@chakra-ui/layout';
import { Button, useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { CustomGridItem } from '../components';
import { ICountryStats, IIPService, IStats, ITotalStats } from '../types/types';

interface HomeProps {
  currentLocation: {
    lat: number;
    lon: number;
  };
}

const Home: NextPage<HomeProps> = ({ currentLocation }) => {
  const Map = dynamic(() => import('../components/Map'), {
    ssr: false,
  });

  const { toggleColorMode } = useColorMode();

  const [markers, setMarkers] = useState<GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    GeoJSON.GeoJsonProperties
  > | null>(null);
  const [stats, setStats] = useState<IStats | null>(null);

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
      const total = dataStats.reduce<ITotalStats>(
        (all, cur) => {
          return {
            totalMcd: all.totalMcd + cur.total,
            totalBrokenMilchshake:
              all.totalBrokenMilchshake +
              (cur.totalmilchshakes - cur.availablemilchshakes),
            totalBrokenMcFlurry:
              all.totalBrokenMcFlurry +
              (cur.totalmcflurrys - cur.availablemcflurrys),
            totalBrokenMcSundae:
              all.totalBrokenMcSundae +
              (cur.totalmcsundaes - cur.availablemcsundaes),
          };
        },
        {
          totalMcd: 0,
          totalBrokenMilchshake: 0,
          totalBrokenMcFlurry: 0,
          totalBrokenMcSundae: 0,
        },
      );
      setStats({
        countryStats: dataStats,
        totalStats: total,
      });
      setMarkers(dataMarker);
    };
    fetchStats();
  }, []);

  return (
    <>
      <Flex
        height="100vh"
        width="100vw"
        justifyContent="center"
        flexWrap="wrap"
        padding="4"
      >
        <Grid
          templateColumns="repeat(4, 1fr)"
          templateRows="auto 1fr"
          gap={4}
          w="100%"
        >
          <CustomGridItem height="5rem">
            Total Tracked McDonalds: {stats?.totalStats?.totalMcd}
          </CustomGridItem>
          <CustomGridItem height="5rem">
            Total Broken Milchshakes: {stats?.totalStats?.totalBrokenMilchshake}
          </CustomGridItem>
          <CustomGridItem height="5rem">
            Total Broken McFlurries: {stats?.totalStats?.totalBrokenMcFlurry}
          </CustomGridItem>
          <CustomGridItem height="5rem">
            Total Broken McSundaes: {stats?.totalStats?.totalBrokenMcSundae}
          </CustomGridItem>
          <CustomGridItem height="100%">Test</CustomGridItem>
          <CustomGridItem height="100%" colSpan={3}>
            {markers && (
              <Map markers={markers} currentLocation={currentLocation} />
            )}
          </CustomGridItem>
          <CustomGridItem height="5rem">McBroken.com</CustomGridItem>
          <CustomGridItem height="5rem">Source Backend</CustomGridItem>
          <CustomGridItem height="5rem">Source Frontend</CustomGridItem>
          <CustomGridItem height="5rem">
            Last Updated <Button onClick={toggleColorMode}>test</Button>
          </CustomGridItem>
        </Grid>
      </Flex>
      {markers && markers.bbox && (
        <Flex w="100vw" h="100vh" direction="column">
          <Box w="100%" bg="grey">
            <Center>
              <Heading size="lg">
                Source:{' '}
                <Link
                  href="https://github.com/paulbtw/mcbrokenio-frontend"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Website
                </Link>{' '}
                and{' '}
                <Link
                  href="https://github.com/paulbtw/mcbrokenio"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Backend
                </Link>
              </Heading>
            </Center>
          </Box>
          {markers && markers.bbox && (
            <Map markers={markers} currentLocation={currentLocation} />
          )}
        </Flex>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const forwarded = req.headers['x-forwarded-for'] as string;
  const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
  const response = await axios.get(`http://ip-api.com/json/${ip}`);
  const data = response.data as IIPService;

  return {
    props: {
      currentLocation: {
        lat: data.lat ?? 51.5074,
        lon: data.lon ?? -0.1278,
      },
    },
  };
};

export default Home;
