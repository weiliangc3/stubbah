import React, { FunctionComponent } from 'react';
import Title from '../molecule/Title';
import Section from '../molecule/Section';

const NotFoundPage: FunctionComponent = () => (
  <Section>
    <Title>Page not found</Title>
    There is no page there.
  </Section>
);

export default NotFoundPage;
