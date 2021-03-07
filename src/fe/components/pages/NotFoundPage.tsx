import React, { FunctionComponent } from 'react';
import Title from '../molecule/Title';
import Main from '../molecule/Main';

const NotFoundPage: FunctionComponent = () => (
  <Main>
    <Title>Page not found</Title>
    There is no page there.
  </Main>
);

export default NotFoundPage;
