import React, { FunctionComponent } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Header from './components/organism/Header';
import Nav from './components/organism/Nav';
import GenericPage from './components/pages/GenericPage';
import HomePage from './components/pages/HomePage';
import NotFoundPage from './components/pages/NotFoundPage';
import PactsRoutes from './components/pages/pacts/PactsRoutes';
import RequestsPage from './components/pages/RequestsPage';
import defaultTheme from './themes/defaultTheme';
import getFromTheme from './utils/getFromTheme';

const MainContainer = styled.div`
  max-width: 1280px;
  padding: 16px 64px;
  margin: 0 auto;
  display: flex;
  
  @media screen and (max-width: 1366px) {
    flex-direction: column;
    padding: 8px
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${getFromTheme('bodyBackground')};
    ${getFromTheme('mainFont')};
  }
  a {
    color: inherit;
  }
`;

const App: FunctionComponent = () => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <BrowserRouter basename="/manage">
      <Header />
      <MainContainer>
        <Nav />
        <Switch>
          <Route path="/requests">
            <RequestsPage />
          </Route>
          <Route path="/pact">
            <PactsRoutes />
          </Route>
          <Route path="/generic">
            <GenericPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/not-found">
            <NotFoundPage />
          </Route>
          <Redirect to="/not-found" />
        </Switch>
      </MainContainer>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
