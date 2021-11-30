import { useState } from 'react';
import { Box, Divider, Text, useMediaQuery } from '@chakra-ui/react';
import { formatDistance } from 'date-fns';
import ReactMapGL, {
  ExtraState,
  Layer,
  MapEvent,
  Popup,
  Source,
} from 'react-map-gl';
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
    timeSinceBrokenMilchshake: number | null;
    hasMcFlurry: Availability;
    timeSinceBrokenMcFlurry: number | null;
    hasMcSundae: Availability;
    timeSinceBrokenMcSundae: number | null;
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

function getCursor({ isHovering, isDragging }: ExtraState) {
  if (isDragging) {
    return 'grabbing';
  }
  if (isHovering) {
    return 'pointer';
  }
  return 'default';
}

const Map: React.FC<MapProps> = ({
  markers,
  currentLocation: { lat, lon },
}) => {
  const [isMobile] = useMediaQuery('(max-width: 1080px)');
  const [viewport, setViewport] = useState({
    width: 'fit',
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
          timeSinceBrokenMcFlurry:
            marker.properties.timeSinceBrokenMcFlurry ?? null,
          hasMcSundae: marker.properties.hasMcSundae ?? null,
          timeSinceBrokenMcSundae:
            marker.properties.timeSinceBrokenMcSundae ?? null,
          hasMilchshake: marker.properties.hasMilchshake ?? null,
          timeSinceBrokenMilchshake:
            marker.properties.timeSinceBrokenMilchshake ?? null,
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

  const eventRecognizerOptions = isMobile
    ? {
        pan: { threshold: 10 },
        tap: { threshold: 5 },
      }
    : {};

  return (
    <div style={{ width: 'fit', height: '100%' }}>
      <ReactMapGL
        mapStyle="mapbox://styles/paaulbtw/ckw14wqnw07is14ny2oagkdvb"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        {...viewport}
        onViewportChange={(nextViewport: any) =>
          setViewport({ ...nextViewport, width: 'fit', height: 'fit' })
        }
        asyncRender={true}
        onClick={onClick}
        onTouchEnd={onClick}
        getCursor={getCursor}
        clickRadius={2}
        interactiveLayerIds={['Point']}
        eventRecognizerOptions={eventRecognizerOptions}
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
              dynamicPosition={true}
            >
              <Box style={{ width: '300px' }}>
                <Text>{selectedMarker.properties.name}</Text>
                <Divider style={{ margin: '6px 0 6px 0' }} />
                <Status
                  name="Milchshake"
                  hasItem={selectedMarker.properties.hasMilchshake}
                  brokenSince={
                    selectedMarker.properties.timeSinceBrokenMilchshake
                  }
                />
                <Status
                  name="McFlurry"
                  hasItem={selectedMarker.properties.hasMcFlurry}
                  brokenSince={
                    selectedMarker.properties.timeSinceBrokenMcFlurry
                  }
                />
                <Status
                  name="McSundae"
                  hasItem={selectedMarker.properties.hasMcSundae}
                  brokenSince={
                    selectedMarker.properties.timeSinceBrokenMcSundae
                  }
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
