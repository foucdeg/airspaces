import React from 'react';
import { Container, HelperList, PageContent, Title } from './AppCrashFallback.style';

/**
 * Error page inspiration https://medium.com/design-ideas-thoughts/designing-error-pages-8d82e16e3472
 */

const AppCrashFallback = () => {
  return (
    <main>
      {/* The <main> tag needs to wrap this component because with redux errors,
      style is not applied to the root tag of this component */}
      <Container>
        <PageContent>
          <Title>Sorry, this is not working properly.</Title>
          <br />
          <p>In the meantime, here is what you can do:</p>
          <HelperList>
            <li>Refresh the page (Sometimes it helps).</li>
            <li>Try again in 30 minutes.</li>
            <li>Tell us what happened.</li>
          </HelperList>
        </PageContent>
      </Container>
    </main>
  );
};

export default AppCrashFallback;
