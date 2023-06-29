import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';

import { Main, BlogPage, ProjectPage } from './pages';
import { BackToTop } from './components';
import ScrollToTop from './utils/ScrollToTop';

import './App.css';

function App() {
  return (
    <div className="app">
      <HashRouter>
        <ScrollToTop />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/blog" exact component={BlogPage} />
          <Route path="/projects" exact component={ProjectPage} />

          <Redirect to="/" />
        </Switch>
      </HashRouter>
      <BackToTop />
    </div>
  );
}

export default App;
