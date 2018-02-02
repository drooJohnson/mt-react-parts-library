import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { store, persistor } from './firebase';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'


import PartsLibrary from './pages/parts-library';
import PartDetail from './pages/part-detail';

import Testing from './pages/testing';

import styled from 'styled-components';

import ModalContainer from './components/modals/modal-root.js';
import Scrim from './components/scrim';

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
let libraryLayout = store.getState().store.libraryLayout;
console.log(libraryLayout);
ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Router>
      <Page>
      <Scrim/>
        <Switch>
          <Route exact path="/parts/:id" render={routeProps => <PartDetail {...routeProps}/>}/>
          <Route exact path="/library#list" render={routeProps => <PartsLibrary {...routeProps}/>}/>
          <Route exact path="/library#grid" render={routeProps => <PartsLibrary {...routeProps}/>}/>
          <Route exact path="/library" render={routeProps => <PartsLibrary {...routeProps}/>}/>
          <Redirect to={{
            pathname: "/library#"+libraryLayout,
          }}/>
        </Switch>
      <ModalContainer/>
      </Page>
    </Router>
    </PersistGate>
  </Provider>
), document.getElementById('root'));
