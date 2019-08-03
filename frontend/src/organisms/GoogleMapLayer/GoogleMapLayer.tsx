import Leaflet from 'leaflet';
import { GridLayer, withLeaflet } from 'react-leaflet';

class GoogleMapLayer extends GridLayer {
  createLeafletElement() {
    // @ts-ignore
    return Leaflet.gridLayer.googleMutant({
      type: 'roadmap',
    });
  }

  updateLeafletElement(fromProps: any, toProps: any) {
    super.updateLeafletElement(fromProps, toProps);
  }
}

export default withLeaflet(GoogleMapLayer);
