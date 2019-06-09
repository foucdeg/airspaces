import styled from 'styled-components';
import { fontSize, getSpacing } from 'stylesheet';

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${getSpacing(13)};
  padding: 0 ${getSpacing(4)};
  font-size: ${fontSize.large};
`;

HeaderContainer.displayName = 'HeaderContainer';

export const Logo = styled.img`
  height: ${getSpacing(9)};
`;

Logo.displayName = 'Logo';
