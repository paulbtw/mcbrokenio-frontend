import { useEffect, useState } from 'react';
import { Flex, Grid, Link } from '@chakra-ui/layout';
import { Button, useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import {
  CustomGridItem,
  DashboardCard,
  DashboardStatsCard,
} from '../components';
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
            trackableMcd: all.trackableMcd + cur.trackable,
            totalBrokenMilchshake:
              all.totalBrokenMilchshake +
              (cur.totalmilchshakes - cur.availablemilchshakes),
            trackableMilchshake:
              all.trackableMilchshake + cur.availablemilchshakes,
            totalBrokenMcFlurry:
              all.totalBrokenMcFlurry +
              (cur.totalmcflurrys - cur.availablemcflurrys),
            trackableMcFlurry: all.trackableMcFlurry + cur.availablemcflurrys,
            totalBrokenMcSundae:
              all.totalBrokenMcSundae +
              (cur.totalmcsundaes - cur.availablemcsundaes),
            trackableMcSundae: all.trackableMcSundae + cur.availablemcsundaes,
          };
        },
        {
          totalMcd: 0,
          trackableMcd: 0,
          totalBrokenMilchshake: 0,
          trackableMilchshake: 0,
          totalBrokenMcFlurry: 0,
          trackableMcFlurry: 0,
          totalBrokenMcSundae: 0,
          trackableMcSundae: 0,
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
        padding="2"
      >
        <Grid
          templateColumns="repeat(4, 1fr)"
          templateRows="auto 1fr"
          gap={2}
          w="100%"
        >
          <CustomGridItem height="5rem">
            <DashboardStatsCard
              label="Trackable McDonalds"
              value={stats?.totalStats?.trackableMcd}
              total={stats?.totalStats?.totalMcd}
            />
          </CustomGridItem>
          <CustomGridItem height="5rem">
            <DashboardStatsCard
              label="Unavailable Milchshakes"
              value={stats?.totalStats?.totalBrokenMilchshake}
              total={stats?.totalStats?.trackableMilchshake}
            />
          </CustomGridItem>
          <CustomGridItem height="5rem">
            <DashboardStatsCard
              label="Unavailable McFlurries"
              value={stats?.totalStats?.totalBrokenMcFlurry}
              total={stats?.totalStats?.trackableMcFlurry}
            />
          </CustomGridItem>
          <CustomGridItem height="5rem">
            <DashboardStatsCard
              label="Unavailable McSundaes"
              value={stats?.totalStats?.totalBrokenMcSundae}
              total={stats?.totalStats?.trackableMcSundae}
            />
          </CustomGridItem>
          <CustomGridItem height="100%">
            <Flex
              width="100%"
              height="100%"
              alignItems="center"
              justifyContent="center"
            >
              Coming Soon...
            </Flex>
          </CustomGridItem>
          <CustomGridItem height="100%" colSpan={3}>
            {markers && (
              <Map markers={markers} currentLocation={currentLocation} />
            )}
          </CustomGridItem>
          <CustomGridItem height="5rem">
            <DashboardCard>
              <Link
                href="https://mcbroken.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Inspired by McBroken.com
              </Link>
            </DashboardCard>
          </CustomGridItem>
          <CustomGridItem height="5rem">
            <DashboardCard>
              <Link
                href="https://github.com/paulbtw/mcbrokenio"
                target="_blank"
                rel="noreferrer noopener"
              >
                Backend Source
              </Link>
            </DashboardCard>
          </CustomGridItem>
          <CustomGridItem height="5rem">
            <DashboardCard>
              <Link
                href="https://github.com/paulbtw/mcbrokenio-frontend"
                target="_blank"
                rel="noreferrer noopener"
              >
                Website Source
              </Link>
            </DashboardCard>
          </CustomGridItem>
          <CustomGridItem height="5rem">
            <Flex height="100%" alignItems="center" justifyContent="center">
              <Button onClick={toggleColorMode}>Toggle Darkmode</Button>
            </Flex>
          </CustomGridItem>
        </Grid>
      </Flex>
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
