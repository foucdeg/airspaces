import React from 'react';

import { StyledSnackbarContent } from './Notam.style';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Notam as NotamType } from 'redux/Notams/types';
import Snackbar from '@material-ui/core/Snackbar';

interface Props {
  notam: NotamType;
  onClose: (notamId: number) => void;
}

const Notam: React.FC<Props> = ({ notam, onClose }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    open={true}
    ClickAwayListenerProps={{ onClickAway: () => null }}
    onClose={() => onClose(notam.id)}
  >
    <StyledSnackbarContent
      message={`NOTAM: ${notam.message}`}
      action={[
        <IconButton onClick={() => onClose(notam.id)}>
          <CloseIcon />
        </IconButton>,
      ]}
    />
  </Snackbar>
);

export default Notam;
