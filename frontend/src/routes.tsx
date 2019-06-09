import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Loader from './components/Loader/Loader';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Avatar = lazy(() => import('./pages/Avatar'));

export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  AVATAR: '/avatar',
};

const routes = () => (
  <Suspense fallback={<Loader />}>
    <Switch>
      <Route exact path={PATHS.HOME} component={Home} />
      <Route path={PATHS.LOGIN} component={Login} />
      <Route path={PATHS.AVATAR} component={Avatar} />
    </Switch>
  </Suspense>
);

export default routes;
