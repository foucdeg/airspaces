import { connect } from 'react-redux';
import { fetchPlanes } from 'redux/Planes/actions';
import { setActivePlane } from 'redux/ActivePlane/actions';
import Map from './Map';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';

const mapStateToProps = (state: RootState) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onPlaneLeave: () => dispatch(setActivePlane(false)),
  fetchPlanes: () => dispatch(fetchPlanes()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
