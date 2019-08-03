/* eslint no-underscore-dangle: "off" */
import { MapLayer, withLeaflet, MarkerProps, Marker } from 'react-leaflet';
import { Marker as LeafletMarker } from 'leaflet';
import { PERIOD } from 'services/constants';

require('leaflet-rotatedmarker');

type RotatingMarkerProps = MarkerProps & {
  rotationAngle?: number;
  rotationOrigin: string;
};

class RotatingMarker extends MapLayer<MarkerProps & RotatingMarkerProps> {
  createLeafletElement(props: RotatingMarkerProps) {
    const el = new LeafletMarker(props.position, this.getOptions(props));
    this.contextValue = { ...props.leaflet, popupContainer: el };
    return el;
  }

  updateLeafletElement(fromProps: RotatingMarkerProps, toProps: RotatingMarkerProps) {
    if (toProps.position !== fromProps.position) {
      // @ts-ignore
      this.leafletElement.setLatLng(toProps.position);
    }
    if (toProps.icon && toProps.icon !== fromProps.icon) {
      // @ts-ignore
      this.leafletElement.setIcon(toProps.icon);
    }
    if (toProps.zIndexOffset && toProps.zIndexOffset !== fromProps.zIndexOffset) {
      // @ts-ignore
      this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
    }
    if (toProps.opacity && toProps.opacity !== fromProps.opacity) {
      // @ts-ignore
      this.leafletElement.setOpacity(toProps.opacity);
    }
    if (toProps.draggable !== fromProps.draggable) {
      if (toProps.draggable === true) {
        // @ts-ignore
        this.leafletElement.dragging.enable();
      } else {
        // @ts-ignore
        this.leafletElement.dragging.disable();
      }
    }
    if (toProps.rotationAngle !== fromProps.rotationAngle) {
      // @ts-ignore
      (this.leafletElement as LeafletMarker).setRotationAngle(toProps.rotationAngle);
    }

    // @ts-ignore
    if (this.leafletElement._icon) {
      // @ts-ignore
      this.leafletElement._icon.style.transition = `all ${PERIOD - 10}ms linear`;
    }
  }
}

export default withLeaflet(RotatingMarker);
