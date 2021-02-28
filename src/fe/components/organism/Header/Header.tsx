import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import getFromTheme from '../../../utils/getFromTheme';

const StyledHeader = styled.header`
  padding: 16px;
  background-color: ${getFromTheme('headerBackground')};
  ${getFromTheme('headerFont')}
`;

const Title = styled(Link)`
  color: ${getFromTheme('headerFontColour')};
  font-size: 24px;
`;

const Header: FunctionComponent = () => (
  <StyledHeader>
    <Title to="/">
      Stubbah
    </Title>
  </StyledHeader>
);

export default Header;
