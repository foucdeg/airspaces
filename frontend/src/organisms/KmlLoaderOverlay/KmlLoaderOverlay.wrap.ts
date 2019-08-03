import { connect } from 'react-redux';
import { addLayer, removeLayer } from 'redux/Layers/actions';
import KmlLoaderOverlay from './KmlLoaderOverlay';
import { RootState } from 'redux/types';
import { Dispatch } from 'redux';

const mapStateToProps = (state: RootState) => ({
  layers: state.layers,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addLayer: (name: string, geoJson: GeoJSON.FeatureCollection) => dispatch(addLayer(name, geoJson)),
  removeLayer: (idToRemove: string) => dispatch(removeLayer(idToRemove)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KmlLoaderOverlay);
