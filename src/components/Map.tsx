import { useState } from 'react';
import { Box, Divider, Text } from '@chakra-ui/react';
import { formatDistance } from 'date-fns';
import ReactMapGL, { Layer, MapEvent, Popup, Source } from 'react-map-gl';
import { Availability } from '../types/types';
import { Status } from './Status';

interface MapProps {
  markers: GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    GeoJSON.GeoJsonProperties
  >;
  currentLocation: {
    lat: number;
    lon: number;
  };
}

interface IMarker {
  properties: {
    hasMilchshake: Availability;
    hasMcFlurry: Availability;
    hasMcSundae: Availability;
    lastChecked: number;
    name: string;
    dot: string;
    open: string;
  };
  geometry: {
    latitude: number;
    longitude: number;
  };
}

const Map: React.FC<MapProps> = ({
  markers,
  currentLocation: { lat, lon },
}) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: lat,
    longitude: lon,
    zoom: 10,
  });

  const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null);

  const onClick = (event: MapEvent) => {
    if (!event.features || !event.features.length) {
      setSelectedMarker(null);
      return;
    }

    const marker = event.features.find((elem) => elem.source === 'markers');

    if (marker) {
      setSelectedMarker({
        properties: {
          hasMcFlurry: marker.properties.hasMcFlurry ?? null,
          hasMcSundae: marker.properties.hasMcSundae ?? null,
          hasMilchshake: marker.properties.hasMilchshake ?? null,
          lastChecked: marker.properties.lastChecked ?? 0,
          name: marker.properties.name ?? '',
          dot: marker.properties.dot ?? '',
          open: marker.properties.open ?? '',
        },
        geometry: {
          latitude: marker.geometry.coordinates[1],
          longitude: marker.geometry.coordinates[0],
        },
      });
    } else {
      setSelectedMarker(null);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactMapGL
        mapStyle="mapbox://styles/paaulbtw/ckw14wqnw07is14ny2oagkdvb"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        {...viewport}
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
        asyncRender={true}
        onClick={onClick}
      >
        <Source id="markers" type="geojson" data={markers}>
          <Layer
            id="Point"
            type="circle"
            paint={{
              'circle-radius': 5,
              'circle-color': {
                type: 'identity',
                property: 'dot',
              },
            }}
          />
          {selectedMarker && (
            <Popup
              latitude={selectedMarker.geometry.latitude}
              longitude={selectedMarker.geometry.longitude}
              closeButton={true}
              closeOnClick={true}
              onClose={() => setSelectedMarker(null)}
              anchor="bottom"
            >
              <Box style={{ width: '300px' }}>
                <Text>{selectedMarker.properties.name}</Text>
                <Divider style={{ margin: '6px 0 6px 0' }} />
                <Status
                  name="Milchshake"
                  hasItem={selectedMarker.properties.hasMilchshake}
                />
                <Status
                  name="McFlurry"
                  hasItem={selectedMarker.properties.hasMcFlurry}
                />
                <Status
                  name="McSundae"
                  hasItem={selectedMarker.properties.hasMcSundae}
                />
                <Divider style={{ margin: '6px 0 6px 0' }} />

                <Text>
                  {selectedMarker.properties.lastChecked
                    ? formatDistance(
                        selectedMarker.properties.lastChecked,
                        new Date(),
                        { addSuffix: true },
                      )
                    : null}
                </Text>
              </Box>
            </Popup>
          )}
        </Source>
      </ReactMapGL>
    </div>
  );
};

export default Map;
