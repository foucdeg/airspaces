import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from 'assets/forge_logo.png';
import Link from 'components/Link';
import { PATHS } from 'routes';
import { Logo, HeaderContainer } from './Header.style';

interface IHeaderProps {
  isUserLoggedIn: boolean;
  logout: () => void;
}

const Header: React.FunctionComponent<RouteComponentProps & IHeaderProps> = ({ isUserLoggedIn, location, logout }) => (
  <HeaderContainer>
    <RouterLink to={PATHS.HOME}>
      <Logo alt="Forge logo" src={logo} />
    </RouterLink>
    {isUserLoggedIn && (
      <Link as="button" onClick={logout}>
        <FormattedMessage id="header.logout" />
      </Link>
    )}
    {(!isUserLoggedIn && location.pathname !== PATHS.LOGIN) && (
      <Link as={RouterLink} to={PATHS.LOGIN}>
        <FormattedMessage id="header.login" />
      </Link>
    )}
  </HeaderContainer>
);

export default withRouter(Header);
