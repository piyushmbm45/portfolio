import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import { BackToTop } from './components';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SpaceBackground from './components/SpaceBackground/SpaceBackground';
import { Main, ProjectPage } from './pages';
import ScrollToTop from './utils/ScrollToTop';

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <SpaceBackground />
        <HashRouter>
          <ScrollToTop />
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/projects" exact component={ProjectPage} />
            <Redirect to="/" />
          </Switch>
        </HashRouter>
        <BackToTop />
      </div>
    </ErrorBoundary>
  );
}

export default App;
