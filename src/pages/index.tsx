import { useEffect, useState } from 'react';
import { Box, Center, Flex, Heading, Link } from '@chakra-ui/layout';
import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { IGeoJson, IIPService } from '../types/types';

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

  const [markers, setMarkers] = useState<any>({});

  useEffect(() => {
    const fetchMarkers = async () => {
      const response = await axios.get('/api/markers.json');
      const data = response.data as IGeoJson;
      setMarkers(data);
    };
    fetchMarkers();
  }, []);

  return (
    <>
      <Head>
        <title>McBroken.io</title>
      </Head>
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
        <Map markers={markers} currentLocation={currentLocation} />
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
