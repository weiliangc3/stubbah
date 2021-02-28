import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import getFromTheme from '../../../utils/getFromTheme';

const StyledLink = styled(Link)`
  color: ${getFromTheme('navFontColour')};
`;
const LinkElement = styled.li`
  padding: 8px 0;
`;

const StyledNav = styled.nav`
  background-color: ${getFromTheme('navBackground')};
  min-width: 160px;
  padding: 32px 8px;
  ${getFromTheme('navFont')}
`;

const Nav: FunctionComponent = () => (
  <StyledNav>
    <ul>
      <StyledLink to="/requests">
        <LinkElement>
          List of requests
        </LinkElement>
      </StyledLink>

      <StyledLink to="/pact">
        <LinkElement>
          Pact stubs
        </LinkElement>
      </StyledLink>

      <StyledLink to="/generic">
        <LinkElement>
          Generic stubs
        </LinkElement>
      </StyledLink>
    </ul>
  </StyledNav>
);

export default Nav;
