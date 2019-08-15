import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import Notams from './Notams';
import { Dispatch } from 'redux';

import { actions } from 'redux/Notams';

const mapStateToProps = (state: RootState) => ({
  notams: state.notams,
});

const matchDispatchToProps = (dispatch: Dispatch) => ({
  dismissNotam: (notamId: number) => dispatch(actions.dismissNotam(notamId)),
  fetchNotams: () => dispatch(actions.fetchNotams()),
});

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Notams);
