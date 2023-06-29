import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import { BackToTop } from './components';
import { Main, ProjectPage } from './pages';
import ScrollToTop from './utils/ScrollToTop';

import './App.css';

function App() {
  return (
    <div className="app">
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
  );
}

export default App;
