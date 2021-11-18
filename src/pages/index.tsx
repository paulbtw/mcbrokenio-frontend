import { useEffect, useState } from 'react';
import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
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
    <div>
      <Map markers={markers} currentLocation={currentLocation} />
    </div>
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
