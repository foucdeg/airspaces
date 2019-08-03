import { connect } from 'react-redux';
import { renamePlane, toggleTrace, clearTrace, changeIcon } from 'redux/Planes/actions';
import { setActivePlane } from 'redux/ActivePlane/actions';
import Panel from './Panel';
import { Dispatch } from 'redux';

import { RootState } from 'redux/types';
import { Aircraft } from 'redux/Planes/types';

const mapStateToProps = (state: RootState) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onPlaneSelect: (plane: Aircraft) => dispatch(setActivePlane(plane)),
  onPlaneRename: (plane: Aircraft, newName: string) => dispatch(renamePlane(plane, newName)),
  onPlaneTraceToggle: (plane: Aircraft) => dispatch(toggleTrace(plane)),
  onPlaneTraceClear: (plane: Aircraft) => dispatch(clearTrace(plane)),
  onPlaneIconChange: (plane: Aircraft) => dispatch(changeIcon(plane)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Panel);
