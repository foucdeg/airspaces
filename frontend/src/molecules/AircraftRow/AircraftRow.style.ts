import styled from 'styled-components';

import ListItem from '@material-ui/core/ListItem';

const followedPlaneColor = '#e3f2fd';

export const StyledRow = styled(ListItem)`
  &.followed {
    background-color: ${followedPlaneColor};
  }
`;
