import React, { ReactNode } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

import { flattenMessages } from 'services/i18n/intl';
import enMessages from 'translations/en.json';

import { PageContent, RootContainer } from './Root.style';

const locales = {
  en: flattenMessages(enMessages),
};

addLocaleData([...fr, ...en]);

interface Props {
  children: ReactNode;
}

const Root: React.FunctionComponent<Props> = ({ children }) => (
  <IntlProvider locale="en" messages={locales.en}>
    {children}
    {/* <RootContainer>
      <PageContent>{children}</PageContent>
    </RootContainer> */}
  </IntlProvider>
);

export default Root;
