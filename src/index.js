import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import { store } from './firebase';

import { Provider } from 'react-redux';

import Row from './layout/row';
import Col from './layout/col';
import Grid from './layout/grid';

import PartsLibrary from './pages/parts-library';
import PartDetail from './pages/part-detail';

/*import PartCard from './purchaser_library/part-card.js';
import PartsGrid from './purchaser_library/parts-grid.js';
import Collections from './purchaser_library/collections-panel.js';
import Navigation from './navigation.js';
import Header from './purchaser_library/header.js';
import PartsActionBar from './purchaser_library/parts-action-bar.js';
import PartsGridSelectionBar from './purchaser_library/parts-grid-selection-bar.js';*/

import styled from 'styled-components';

import PropTypes from 'prop-types';

const Page = styled.div`
  overflow:hidden;
  height:100vh;
  font-family:'proxima nova';
  button{
    font-family:'proxima nova';
  }
`
ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Page>
        <Switch>
          <Route exact path="/parts" component={PartsLibrary}/>
          <Route path="/parts/:id" component={PartDetail}/>
          <Redirect exact from="/" to="/parts"/>
        </Switch>
      </Page>
    </Router>
  </Provider>
), document.getElementById('root'));
