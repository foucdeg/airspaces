import { Path, withLeaflet, ContextProps } from 'react-leaflet';
import LeafletHotline from 'leaflet-hotline';
import { Position } from 'redux/Planes/types';

interface TraceProps {
  positions: Position[];
}

interface PolylineOptions {
  outlineWidth: number;
  outlineColor: string;
  weight: number;
  palette: {
    [index: number]: string;
  };
  min: number;
  max: number;
}

class Trace extends Path<TraceProps & PolylineOptions, LeafletHotline.Hotline> {
  createLeafletElement(props: TraceProps & PolylineOptions) {
    return new LeafletHotline.Hotline(props.positions, this.getOptions(props));
  }

  updateLeafletElement(
    fromProps: TraceProps & PolylineOptions,
    toProps: TraceProps & PolylineOptions,
  ) {
    if (toProps.positions !== fromProps.positions) {
      this.leafletElement.setLatLngs(toProps.positions);
    }
  }
}

export default withLeaflet<ContextProps & TraceProps & PolylineOptions>(Trace);
