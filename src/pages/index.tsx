import { Flex, Grid, Text } from '@chakra-ui/layout';
import type { NextPage } from 'next';
import {
  Center,
  CustomGridItem,
  DashboardStatsCard,
  InfoCard,
  LinkContainer,
} from '../components';
import { useLocation, useMarkers, useStats } from '../hooks';

const Home: NextPage = () => {
  const { data: locationData } = useLocation();
  const { data: markerData } = useMarkers();
  const { data: statsData } = useStats();

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
              value={statsData?.totalStats?.trackable}
              total={statsData?.totalStats?.total}
            />
          </CustomGridItem>
          <CustomGridItem height="5rem" display={['none', 'none', 'block']}>
            <DashboardStatsCard
              label="Available Milchshakes"
              value={statsData?.totalStats?.availablemilchshakes}
              total={statsData?.totalStats?.totalmilchshakes}
            />
          </CustomGridItem>
          <CustomGridItem height="5rem" display={['none', 'none', 'block']}>
            <DashboardStatsCard
              label="Available McFlurries"
              value={statsData?.totalStats?.availablemcflurrys}
              total={statsData?.totalStats?.totalmcflurrys}
            />
          </CustomGridItem>
          <CustomGridItem height="5rem" display={['none', 'none', 'block']}>
            <DashboardStatsCard
              label="Available McSundaes"
              value={statsData?.totalStats?.availablemcsundaes}
              total={statsData?.totalStats?.totalmcsundaes}
            />
          </CustomGridItem>
          <CustomGridItem height="100%" colSpan={4}>
            <Center
              markers={markerData}
              currentLocation={locationData}
              countryStats={statsData?.countryStats}
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

export default Home;
