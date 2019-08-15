import React from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

import AppCrashFallback from './components/AppCrashFallback';
import ErrorBoundary from './components/ErrorBoundary';
import Routes, { PATHS } from './routes';

import { flattenMessages } from 'services/i18n/intl';
import enMessages from 'translations/en.json';

const locales = {
  en: flattenMessages(enMessages),
};

addLocaleData([...fr, ...en]);

interface Props {
  history: History;
  persistor: Persistor;
  store: Store;
}

const RootComponentWithRoutes: React.FunctionComponent = () => (
  <IntlProvider locale="en" messages={locales.en}>
    <Routes />
  </IntlProvider>
);

const App: React.FunctionComponent<Props> = ({ history, persistor, store }) => (
  <ErrorBoundary FallbackComponent={AppCrashFallback}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Route path={PATHS.HOME} component={RootComponentWithRoutes} />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);

export default App;
