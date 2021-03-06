import styled from 'styled-components';
import getFromTheme from '../../utils/getFromTheme';

export default styled.h2`
  padding-bottom: 24px;
  font-size: 24px;
  color: ${getFromTheme('subheadingColour')};
  ${getFromTheme('subheadingFont')}
`;
