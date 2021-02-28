import styled from 'styled-components';
import { Link } from 'react-router-dom';
import getFromTheme from '../../utils/getFromTheme';

export default styled.table`
  margin-bottom: 32px;
  ${getFromTheme('tableStyling')}
`;

export const TableLink = styled(Link)`
  display: block;
  width: 100%;
`;

export const TableButton = styled.a`
  display: block;
  width: 100%;
  cursor: pointer;
`;
