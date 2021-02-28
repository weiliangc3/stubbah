import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import StoredProviderStub from '../../../../classes/StoredProviderStub';
import getPact from '../../../apiCalls/getPact';
import Title from '../../molecule/Title';
import Section from '../../molecule/Section';
import Subheader from '../../molecule/Subheader';
import Paragraph from '../../molecule/Paragraph';
import Table from '../../molecule/Table';
import MorphingButton from '../../molecule/MorphingButton';

const StateTable = styled(Table)`
  & th:nth-child(2), & td:nth-child(2) {
    width: 280px;
  }
`;

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
      <StateTable>
        <tr>
          <th>State</th>
          <th>Delete</th>
        </tr>
        {pact?.activeStates.map((state) => (
          <tr>
            <td>{state}</td>
            <td><MorphingButton onClick={() => { console.log(state); }}>Delete</MorphingButton></td>
          </tr>
        ))}
      </StateTable>

      <Subheader>Interactions</Subheader>
      <Paragraph>
        {`${pact?.interactions.length} interactions:`}
      </Paragraph>

      <Table>
        <tr>
          <th>Description</th>
          <th>State</th>
          <th>Request</th>
          <th>Response</th>
        </tr>
        {pact?.interactions.map((index) => {
          const {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            description, provider_state, request, response,
          } = pact?.interactionMap[index];
          return (
            <tr>
              <td>{description}</td>
              <td>{provider_state}</td>
              <td>{JSON.stringify(request)}</td>
              <td>{JSON.stringify(response)}</td>
            </tr>
          );
        })}
      </Table>
    </Section>
  );
};

export default PactPage;

interface ParamTypes {
  route: string
}
