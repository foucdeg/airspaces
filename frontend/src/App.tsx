import React from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { muiTheme } from 'stylesheet';

import AppCrashFallback from './components/AppCrashFallback';
import ErrorBoundary from './components/ErrorBoundary';
import Root from './components/Root';
import Routes, { PATHS } from './routes';

interface Props {
  history: History;
  persistor: Persistor;
  store: Store;
}

const RootComponentWithRoutes: React.FunctionComponent = () => (
  <Root>
    <Routes />
  </Root>
);

const App: React.FunctionComponent<Props> = ({ history, persistor, store }) => (
  <ErrorBoundary FallbackComponent={AppCrashFallback}>
    <Provider store={store}>
      <MuiThemeProvider theme={muiTheme}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <Route path={PATHS.HOME} component={RootComponentWithRoutes} />
          </ConnectedRouter>
        </PersistGate>
      </MuiThemeProvider>
    </Provider>
  </ErrorBoundary>
);

export default App;
