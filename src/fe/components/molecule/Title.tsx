import styled from 'styled-components';
import getFromTheme from '../../utils/getFromTheme';

export default styled.h1`
  padding-bottom: 32px;
  font-size: 52px;
  ${getFromTheme('headerFont')}
`;
