import styled from 'styled-components';
import getFromTheme from '../../utils/getFromTheme';

export default styled.h1`
  padding-bottom: 32px;
  font-size: 36px;
  color: ${getFromTheme('titleColour')};
  ${getFromTheme('headerFont')}
`;
