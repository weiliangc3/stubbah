import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import PactInteraction from '../../../../classes/PactInteraction';
import getFromTheme from '../../../utils/getFromTheme';
import Clickable from '../../atom/Clickable';
import Span from '../Span';
import ExpandedPactDetails from './ExpandedPactDetails';

const List = styled.li<ListProps>`
  ${getFromTheme('tableCellStyling')}
  ${(props) => (props.opened ? getFromTheme('selectedTableCellStyling') : '')}
`;
interface ListProps{
  opened: boolean;
}
const StyledClickable = styled(Clickable)`
  color: ${getFromTheme('selectedTableFontColour')};
  padding: 8px;
`;

const PactDropdown: FunctionComponent<Props> = ({ interaction, route, resetData }: Props) => {
  const [opened, setOpened] = useState(false);

  const {
    description, providerState, request, id,
  } = interaction;

  return (
    <List opened={opened}>
      <StyledClickable
        onClick={() => { setOpened(!opened); }}
        onKeyPress={() => { setOpened(!opened); }}
        role="button"
        tabIndex={0}
        as="div"
      >
        {`${id}. ("${request.path}") `}
        <Span bold>{description}</Span>
        {' when '}
        <Span bold>{providerState}</Span>
        {opened ? ' ▾' : ' ▸'}
      </StyledClickable>

      {opened && (
        <ExpandedPactDetails interaction={interaction} route={route} resetData={resetData} />
      )}
    </List>
  );
};

export default PactDropdown;

interface Props{
  interaction: PactInteraction;
  route: string;
  resetData: Function;
}

PactDropdown.defaultProps = {};
