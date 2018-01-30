import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { store } from './firebase';
import { Provider } from 'react-redux';

import PartsLibrary from './pages/parts-library';
import PartDetail from './pages/part-detail';

import Testing from './pages/testing';

import styled from 'styled-components';

import ModalContainer from './components/modals/modal-root.js';
import Scrim from './components/scrim';
import { hotjar } from 'react-hotjar';

hotjar.initialize(762713, 6);

const Page = styled.div`
  overflow:hidden;
  height:100vh;
  font-family:'proxima nova';
  button{
    font-family:'proxima nova';
  }
`
/*ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Page>
      <Scrim/>
        <Switch>
          <Route exact path="/parts" component={PartsLibrary}/>
          <Route exact path="/parts/:id" component={PartDetail}/>
          <Route exact path="/testing" component={Testing}/>
          <Redirect exact from="/" to="/parts"/>
        </Switch>
      <ModalContainer/>
      </Page>
    </Router>
  </Provider>
), document.getElementById('root'));*/

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Page>
      <Scrim/>
        <Switch>
          <Route exact path="/" component={PartsLibrary}/>
          <Route exact path="/parts" component={PartsLibrary}/>
          <Route exact path="/parts/:id" component={PartDetail}/>
          <Route exact path="/testing" component={Testing}/>
        </Switch>
      <ModalContainer/>
      </Page>
    </Router>
  </Provider>
), document.getElementById('root'));
