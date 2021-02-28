import React, { FunctionComponent } from 'react';
import {
  Redirect,
  Route, Switch, useRouteMatch,
} from 'react-router-dom';
import PactsPage from './PactsPage';
import PactPage from './PactPage';

const PactsRoutes: FunctionComponent = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <PactsPage />
      </Route>
      <Route path={`${path}/route/:route`}>
        <PactPage />
      </Route>
      <Redirect to={path} />
    </Switch>
  );
};

export default PactsRoutes;
