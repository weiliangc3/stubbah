import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MultiSelect from 'react-multi-select-component';
import { Option } from 'react-multi-select-component/dist/lib/interfaces';
import StoredProviderStub from '../../../../classes/StoredProviderStub';
import getPact from '../../../apiCalls/getPact';
import deletePactState from '../../../apiCalls/deletePactState';
import Title from '../../molecule/Title';
import Section from '../../molecule/Section';
import Subheader from '../../molecule/Subheader';
import Paragraph from '../../molecule/Paragraph';
import Table from '../../molecule/Table';
import MorphingButton from '../../molecule/MorphingButton';
import getPotentialStatesForPact from '../../../apiCalls/getPotentialStatesForPact';
import addPactStates from '../../../apiCalls/addPactStates';
import getInteractionsForPactRoute from '../../../apiCalls/getInteractionsForPactRoute';
import PactInteraction from '../../../../classes/PactInteraction';

const StyledMultiSelect = styled(MultiSelect)`
  color: #000;
`;

const StateTable = styled(Table)`
  & th:nth-child(2), & td:nth-child(2) {
    width: 280px;
  }
`;

const PactPage: FunctionComponent = () => {
  const [pact, setPact] = useState<StoredProviderStub | null>(null);
  const [interactions, setInteractions] = useState<PactInteraction[]>([]);
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [statesToAdd, setStatesToAdd] = useState<Option[]>([]);

  const { route } = useParams<ParamTypes>();

  // Lazy implementation: refactor
  const resetData = () => {
    getPact(route).then((data) => {
      setPact(data);
    });
    getInteractionsForPactRoute(route).then((data)=> {
      setInteractions(data);
    });
    getPotentialStatesForPact(route).then((data) => {
      setAvailableStates(data);
    });
    setStatesToAdd([]);
  };

  const confirmAddState = () => {
    if (statesToAdd.length > 0) {
      const statesToAddStrings: string[] = statesToAdd.map((stateToAdd) => stateToAdd.value);
      addPactStates(route, statesToAddStrings).then(resetData);
    }
  };

  const confirmDeleteState = (state: string) => () => {
    deletePactState(route, state).then(resetData);
  };

  useEffect(resetData, []);

  const availableStateOptions: Option[] = availableStates.map((state) => ({
    label: state,
    value: state,
  }));

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
          <th>Delete/Add</th>
        </tr>
        {pact?.activeStates.map((state) => (
          <tr>
            <td>{state}</td>
            <td>
              <MorphingButton onClick={confirmDeleteState(state)}>
                Delete &#x25B8;
              </MorphingButton>
            </td>
          </tr>
        ))}
        <tr>
          <td>
            <StyledMultiSelect
              options={availableStateOptions}
              value={statesToAdd}
              onChange={setStatesToAdd}
              labelledBy="State(s) to add"
            />
          </td>
          <td>
            <MorphingButton onClick={confirmAddState}>
              Add state  &#x25B8;
            </MorphingButton>
          </td>
        </tr>
      </StateTable>

      <Subheader>Available interactions</Subheader>
      <Paragraph>
        {`${interactions.length} interactions:`}
      </Paragraph>

      <Table>
        <tr>
          <th>Description</th>
          <th>State</th>
          <th>Request</th>
          <th>Response</th>
        </tr>
        {interactions.map((interaction) => {
          const {
            description, providerState, request, response,
          } = interaction;
          return (
            <tr>
              <td>{description}</td>
              <td>{providerState}</td>
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
