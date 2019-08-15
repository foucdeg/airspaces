import SnackbarContent from '@material-ui/core/SnackbarContent';

import withStyles from '@material-ui/styles/withStyles';

const snackbarContentStyles = {
  root: {
    color: 'black',
    backgroundColor: '#ffd600',
  },
};

export const StyledSnackbarContent = withStyles(snackbarContentStyles)(SnackbarContent);
