import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import defaultTheme from './themes/defaultTheme';

const Main = styled.main`
  color: ${(props) => props.theme.color};
  font-family: ${(props) => props.theme.font};
`;

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <Header />
        <Main>
          This is the UI, I guess?
        </Main>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
