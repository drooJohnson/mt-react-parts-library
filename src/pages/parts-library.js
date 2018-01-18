import React from 'react';

import 'firebase/firestore'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux';
import { compose } from 'redux';

import Grid from '../layout/grid';

import PartsGrid from '../purchaser_library/parts-grid.js';
import Collections from '../purchaser_library/collections-panel.js';
import Navigation from '../navigation.js';
import Header from '../purchaser_library/header.js';
import PartsActionBar from '../purchaser_library/parts-action-bar.js';
import styled from 'styled-components';

const PartsLibraryBase = styled.div`
  width:100%;
  height:100vh;
  max-height:100vh;
  position:absolute;
  top:0; bottom:0; left:0; right:0;
  display: grid;
  grid-template-rows: auto auto 16px 1fr 24px;
  grid-template-columns: 1fr 1170px 1fr;
  grid-template-areas:
    "navigation navigation navigation"
    "header header header"
    ". . ."
    ". body .";
`

const PartsLibrary = ({collections,parts,store}) => (
  <PartsLibraryBase>
      <Navigation gridarea="navigation"/>
      <Header gridarea="header"/>
      <Grid
        gridrows='auto 1fr'
        gridcolumns='1fr 3fr'
        gridareas="
          'collections actions'
          'collections parts'
        "
        gridrowgap='8px'
        gridcolumngap='16px'
        style={{
          gridArea:'body',
          maxWidth:'1170px',
          width:'100%',
          margin:'0 auto',
          overflow:'hidden',
          position:'absolute',
          height:'100%',
          maxHeight:'100%',
        }}
      >
        <Collections gridarea="collections"/>
        <PartsActionBar gridarea="actions" active="grid"/>
        <PartsGrid gridarea="parts" style={{overflowY:'scroll'}}/>
      </Grid>
  </PartsLibraryBase>
)

export default compose(
  firestoreConnect(['parts','collections']),
  connect(
    (state, props) =>
      ({
        collections: state.firestore.ordered.collections,
        parts: state.firestore.ordered.parts,
        store: state.store
      })
  )
)(PartsLibrary)
