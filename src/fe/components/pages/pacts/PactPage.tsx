import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StoredProviderStub from '../../../../classes/StoredProviderStub';
import getPact from '../../../apiCalls/getPact';
import Title from '../../molecule/Title';
import Section from '../../molecule/Section';
import Subheader from '../../molecule/Subheader';
import Paragraph from '../../molecule/Paragraph';

const PactPage: FunctionComponent = () => {
  const [pact, setPact] = useState<StoredProviderStub | null>(null);
  const { route } = useParams<ParamTypes>();

  useEffect(() => {
    getPact(route).then((data) => {
      setPact(data);
    });
  }, []);

  return (
    <Section>
      <Title>{`${pact?.provider} Pact`}</Title>

      <Subheader>Route</Subheader>
      <Paragraph>
        {route}
      </Paragraph>

      <Subheader>Active states</Subheader>
      <Paragraph>
        {`Interactions: ${pact?.interactions.length}`}
      </Paragraph>

      <Subheader>Interactions</Subheader>
      <Paragraph>
        {`Interactions: ${pact?.interactions.length}`}
      </Paragraph>

      <div>
        {JSON.stringify(pact)}
      </div>
    </Section>
  );
};

export default PactPage;

interface ParamTypes {
  route: string
}
