import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import PactInteraction from '../../../../classes/PactInteraction';
import deletePactInteraction from '../../../apiCalls/deletePactInteraction';
import getFromTheme from '../../../utils/getFromTheme';
import JsonDisplay from '../JsonDisplay';
import MorphingButton from '../MorphingButton';

const DetailContainer = styled.div`
  background-color: ${getFromTheme('bodyBackground')};
  padding: 4px 16px;
  border-left: 2px solid ${getFromTheme('selectedTableCellColour')};
  border-right: 2px solid ${getFromTheme('selectedTableCellColour')};
  border-bottom: 1px solid ${getFromTheme('selectedTableCellColour')};

  &:last-of-type{
    padding-bottom: 16px;
    border-bottom: 2px solid ${getFromTheme('selectedTableCellColour')};
  }
`;
const DetailName = styled.div`
  color: ${getFromTheme('subheadingFontColour')};
  padding: 8px 0;
`;
const Detail = styled.div`
  ${getFromTheme('mainFont')};
  padding-bottom: 8px;
`;

const ExpandedPactDetails: FunctionComponent<Props> = ({
  interaction, route, resetData,
}: Props) => (
  <>
    <DetailContainer>
      <DetailName>Description</DetailName>
      <Detail>{interaction.description}</Detail>
    </DetailContainer>

    <DetailContainer>
      <DetailName>Provider State</DetailName>
      <Detail>{interaction.providerState}</Detail>
    </DetailContainer>

    <DetailContainer>
      <DetailName>Request</DetailName>
      <Detail><JsonDisplay data={interaction.request} /></Detail>
    </DetailContainer>

    <DetailContainer>
      <DetailName>Response</DetailName>
      <Detail><JsonDisplay data={interaction.response} /></Detail>
    </DetailContainer>

    <DetailContainer>
      <DetailName>Interaction Count</DetailName>
      <Detail>{interaction.counter}</Detail>
    </DetailContainer>

    <DetailContainer>
      <DetailName>Delete Interaction</DetailName>
      <Detail>
        <MorphingButton
          onClick={() => {
            deletePactInteraction(route, interaction.id).then(() => { resetData(); });
          }}
        >
          Delete
        </MorphingButton>
      </Detail>
    </DetailContainer>
  </>
);

export default ExpandedPactDetails;

interface Props{
  interaction: PactInteraction;
  route: string;
  resetData: Function,
}

ExpandedPactDetails.defaultProps = {};
