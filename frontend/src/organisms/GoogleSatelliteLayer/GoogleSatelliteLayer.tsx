import Leaflet from 'leaflet';
import { GridLayer, withLeaflet } from 'react-leaflet';

class GoogleSatelliteLayer extends GridLayer {
  createLeafletElement() {
    // @ts-ignore
    return Leaflet.gridLayer.googleMutant({
      type: 'hybrid',
    });
  }

  updateLeafletElement(fromProps: any, toProps: any) {
    super.updateLeafletElement(fromProps, toProps);
  }
}

export default withLeaflet(GoogleSatelliteLayer);
