/* eslint no-underscore-dangle: ["error", { "allow": ["_zoom"] }] */

import React, { useRef, useEffect, useState } from 'react';
import { Map as LeafletMap, LayersControl, TileLayer, GeoJSON } from 'react-leaflet';
import Leaflet from 'leaflet';

import { POLYLINE_OPTIONS, BUILT_ICONS, PERIOD, INITIAL_ZOOM } from 'services/constants';
import { getPlanesBounds, decodeConfig } from 'services/helpers';
import Trace from 'molecules/Trace';
import RotatingMarker from 'molecules/RotatingMarker';
import GoogleMapLayer from 'organisms/GoogleMapLayer';
import GoogleSatelliteLayer from 'organisms/GoogleSatelliteLayer';
import GoogleTerrainLayer from 'organisms/GoogleTerrainLayer';
import PlanePopup from 'molecules/PlanePopup';
import { Aircraft } from 'redux/Planes/types';
import { KMLLayer } from 'redux/Layers/types';

require('leaflet.gridlayer.googlemutant');

const navTiles = 'https://{s}.gis.flightplandatabase.com/tile/nav/{z}/{x}/{y}.png';
const osmTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const otmTiles = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
const navLayerAttribution =
  '<a href="https://flightplandatabase.com" target="_blank">Flight Plan Database</a>';

const { initialPositionIfMultiplePlanes = 'bounds' } = decodeConfig();

interface Props {
  activePlane: string | boolean | null;
  planes: Aircraft[];
  layers: KMLLayer[];
  onPlaneLeave: () => void;
  fetchPlanes: () => void;
}

interface PositionalLeafletMapProps {
  zoom?: number;
  center?: [number, number];
  bounds?: Leaflet.LatLngBounds;
}

const disableTransition = () => {
  document
    .querySelectorAll('.leaflet-marker-pane img')
    .forEach(icon => icon.classList.add('no-transition'));
};

const enableTransition = () => {
  setTimeout(() => {
    document
      .querySelectorAll('.leaflet-marker-pane img')
      .forEach(icon => icon.classList.remove('no-transition'));
  }, 200);
};

const handleVisibilityChange: EventListener = (event: Event) => {
  if (document.hidden) {
    disableTransition();
  } else {
    enableTransition();
  }
};

window.addEventListener('visibilitychange', handleVisibilityChange);

const Map: React.FunctionComponent<Props> = ({
  planes,
  fetchPlanes,
  onPlaneLeave,
  layers,
  activePlane = null,
}) => {
  const mapElement = useRef<LeafletMap>(null);
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);
  const [hasReceivedFirstPlane, setHasReceivedFirstPlane] = useState<boolean>(false);

  useEffect(
    () => {
      if (planes.length && !hasReceivedFirstPlane) {
        setHasReceivedFirstPlane(true);
      }
    },
    [planes],
  );

  useEffect(() => {
    const planeFetchInterval = setInterval(() => {
      fetchPlanes();
    }, PERIOD);

    return () => clearInterval(planeFetchInterval);
  }, []);

  const getMapCenter = () => mapElement.current && mapElement.current.leafletElement.getCenter();

  const deducePositionalProps = (): PositionalLeafletMapProps => {
    if (activePlane) {
      const plane = planes.find(aPlane => aPlane.identifier === activePlane);
      if (plane) {
        return {
          zoom,
          center: plane.position,
        };
      }
    }
    if (!hasReceivedFirstPlane && planes.length) {
      if (planes.length > 1 && initialPositionIfMultiplePlanes !== 'first') {
        const bounds = getPlanesBounds(planes);
        return { bounds };
      }
      return { zoom, center: planes[0].position };
    }

    const center = getMapCenter();
    return { zoom, center: center ? [center.lat, center.lng] : [0, 0] };
  };

  const positionalProps = deducePositionalProps();

  return (
    <LeafletMap
      ref={mapElement}
      {...positionalProps}
      ondragstart={onPlaneLeave}
      onmovestart={disableTransition}
      onmoveend={enableTransition}
      onzoomstart={disableTransition}
      onzoomend={(event: Leaflet.LeafletEvent) => {
        enableTransition();
        setZoom(event.target._zoom);
      }}
    >
      <LayersControl position="bottomleft">
        <LayersControl.BaseLayer name="OpenStreetMap" checked>
          <TileLayer url={osmTiles} attribution="© OpenStreetMap contributors" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenTopoMap">
          <TileLayer
            url={otmTiles}
            attribution="© OpenStreetMap contributors, SRTM | © OpenTopoMap"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google Maps - Roads">
          <GoogleMapLayer />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google Maps - Satellite">
          <GoogleSatelliteLayer />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google Maps - Terrain">
          <GoogleTerrainLayer />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay name="Airports, localizers and waypoints">
          <TileLayer url={navTiles} attribution={navLayerAttribution} />
        </LayersControl.Overlay>
        {layers.map(layer => (
          <LayersControl.Overlay name={layer.name} key={layer.id}>
            <GeoJSON data={layer.geoJson} />
          </LayersControl.Overlay>
        ))}
      </LayersControl>
      {planes
        .filter(plane => plane.position[0] && plane.position[1])
        .map(plane => (
          <React.Fragment key={plane.identifier}>
            <RotatingMarker
              position={plane.position}
              icon={BUILT_ICONS[plane.icon]}
              rotationAngle={plane.heading}
              rotationOrigin="initial"
            >
              <PlanePopup aircraft={plane} />
            </RotatingMarker>
            {plane.isTraceActive && <Trace {...POLYLINE_OPTIONS} positions={plane.path} />}
          </React.Fragment>
        ))}
    </LeafletMap>
  );
};

export default Map;
