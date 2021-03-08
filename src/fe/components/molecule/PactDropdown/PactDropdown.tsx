import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import PactInteraction from '../../../../classes/PactInteraction';

const List = styled.li`

`;

const PactDropdown: FunctionComponent<Props> = ({ interaction }: Props) => (
  <List>
    Do a drop down
    {JSON.stringify(interaction)}
  </List>
);

export default PactDropdown;

interface Props{
  interaction: PactInteraction;
}

PactDropdown.defaultProps = {};
