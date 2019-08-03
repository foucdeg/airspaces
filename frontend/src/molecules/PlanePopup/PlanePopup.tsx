import React from 'react';
import { Popup } from 'react-leaflet';
import { formatLatLon } from 'services/helpers';
import { Aircraft } from 'redux/Planes/types';
import { PopupContent } from './PlanePopup.style';

interface Props {
  aircraft: Aircraft;
}

const PlanePopup: React.FunctionComponent<Props> = ({ aircraft }) => (
  <Popup>
    <PopupContent>
      <strong>{aircraft.name}</strong>
      <br />
      {aircraft.altitude.toLocaleString('en-us', { maximumFractionDigits: 0 })} ft &middot; &nbsp;
      {aircraft.heading.toLocaleString('en-us', { maximumFractionDigits: 0 })} &deg; <br />
      GS {(aircraft.speed || 0).toLocaleString('en-us', { maximumFractionDigits: 0 })} kts <br />
      {formatLatLon(aircraft.position)}
    </PopupContent>
  </Popup>
);

export default PlanePopup;
