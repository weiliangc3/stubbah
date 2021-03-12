import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MultiSelect from 'react-multi-select-component';
import { Option } from 'react-multi-select-component/dist/lib/interfaces';
import PactProvider from '../../../../classes/PactProvider';
import getPact from '../../../apiCalls/getPact';
import deletePactState from '../../../apiCalls/deletePactState';
import Title from '../../molecule/Title';
import Main from '../../molecule/Main';
import Subheader from '../../molecule/Subheader';
import Paragraph from '../../molecule/Paragraph';
import Table from '../../molecule/Table';
import MorphingButton from '../../molecule/MorphingButton';
import getPotentialStatesForPact from '../../../apiCalls/getPotentialStatesForPact';
import addPactStates from '../../../apiCalls/addPactStates';
import getInteractionsForPactRoute from '../../../apiCalls/getInteractionsForPactRoute';
import PactInteraction from '../../../../classes/PactInteraction';
import AddPactStubForm from '../../organism/AddPactStubForm';
import Section from '../../molecule/Section';
import PactDropdown from '../../molecule/PactDropdown/PactDropdown';
import PactDropdownContainer from '../../molecule/PactDropdown/PactDropdownContainer';
import Clickable from '../../atom/Clickable';
import FullInteractionsTable from '../../molecule/FullInteractionsTable';
import deletePact from '../../../apiCalls/deletePact';

const StyledMultiSelect = styled(MultiSelect)`
  color: #000;
`;

const StateTable = styled(Table)`
  & th:nth-child(2), & td:nth-child(2) {
    width: 280px;
  }
`;

const PactPage: FunctionComponent = () => {
  const [pact, setPact] = useState<PactProvider | null>(null);
  const [interactions, setInteractions] = useState<PactInteraction[]>([]);
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [statesToAdd, setStatesToAdd] = useState<Option[]>([]);
  const [tableInteractionView, setTableInteractionView] = useState<boolean>(false);

  const { route } = useParams<ParamTypes>();

  // Lazy implementation: refactor
  const resetData = () => {
    getPact(route).then((data) => {
      setPact(data);
    });
    getInteractionsForPactRoute(route).then((data) => {
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
    <Main>
      <Title>{`${pact?.provider} Pact`}</Title>

      <Section>
        <Subheader>Route</Subheader>
        <Paragraph>
          {route}
        </Paragraph>
      </Section>

      <Section>
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
                  Delete
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
                Add state
              </MorphingButton>
            </td>
          </tr>
        </StateTable>
      </Section>

      <Section>
        <Subheader>Available interactions</Subheader>
        <Paragraph>
          {`${interactions.length} interactions:`}
        </Paragraph>

        { tableInteractionView ? (
          <FullInteractionsTable interactions={interactions} />
        ) : (
          <PactDropdownContainer>
            {interactions.map((interaction) => (
              <PactDropdown interaction={interaction} route={route} resetData={resetData} />
            ))}
          </PactDropdownContainer>
        ) }
        <Paragraph>
          *Count refers to the amount of times the interaction
          has been matched AND the response given.
        </Paragraph>
        <Clickable
          onClick={() => { setTableInteractionView(!tableInteractionView); }}
          onKeyPress={() => { setTableInteractionView(!tableInteractionView); }}
          role="button"
          tabIndex={0}
        >
          {tableInteractionView ? 'Change to normal view ▸' : 'Change to table view ▸'}
        </Clickable>
      </Section>

      <Section>
        <Subheader>Add pact</Subheader>
        <AddPactStubForm providerRoute={route} providerName={pact?.provider} onSubmit={resetData} />
      </Section>

      <Section>
        <Subheader>Delete Pact</Subheader>
        <Paragraph>Be careful with this one.</Paragraph>
        <MorphingButton
          onClick={() => { deletePact(route).then(resetData); }}
        >
          Delete Pact
        </MorphingButton>
      </Section>
    </Main>
  );
};

export default PactPage;

interface ParamTypes {
  route: string
}
