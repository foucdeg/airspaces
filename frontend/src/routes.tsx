import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';

const Home = lazy(() => import('./pages/Home'));

export const PATHS = {
  HOME: '/',
};

const routes = () => (
  <Suspense fallback={<div />}>
    <Switch>
      <Route exact path={PATHS.HOME} component={Home} />
    </Switch>
  </Suspense>
);

export default routes;
