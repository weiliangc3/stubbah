import React from 'react';
import styled from 'styled-components';
import getFromTheme from '../utils/getFromTheme';

const StyledHeader = styled.header`
  color: ${getFromTheme('headerFontColour')};
  background-color: ${getFromTheme('headerBackground')};
  ${getFromTheme('headerFont')}
`;

const Header = () => (
  <StyledHeader>
    <h1>
      Stubbah
    </h1>
  </StyledHeader>
);

export default Header;
