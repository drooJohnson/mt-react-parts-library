import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {
  db,
  partsRef,
  collectionsRef
} from './firebase';

import Row from './layout/row';
import Col from './layout/col';
import Grid from './layout/grid';

import PartCard from './purchaser_library/part-card.js';
import PartsGrid from './purchaser_library/parts-grid.js';
import Collections from './purchaser_library/collections-panel.js';
import Navigation from './navigation.js';
import Header from './purchaser_library/header.js';
import PartsActionBar from './purchaser_library/parts-action-bar.js';
import PartsGridSelectionBar from './purchaser_library/parts-grid-selection-bar.js';
import styled from 'styled-components';

const Page = styled.div`
  overflow:hidden;
  height:100vh;
  font-family:'proxima nova';
  button{
    font-family:'proxima nova';
  }
`

const PartsLibraryBase = styled.div`
  width:100%;
  height:100vh;
  max-height:100vh;
  position:absolute;
  top:0; bottom:0; left:0; right:0;
  display: grid;
  grid-template-rows: auto auto 16px 1fr 24px;
  grid-template-columns: 1fr 1440px 1fr;
  grid-template-areas:
    "navigation navigation navigation"
    "header header header"
    ". . ."
    ". body .";
`

class PartsLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.partsRef = db.collection('parts');
    this.state = {
      collectionSelected: '',
      selectionMode: false,
      selectionCount: 0,
      selection: [],
      parts: [],
      loading: true,
    }
    this.unsubscribe = null;
    this.handleCollectionChange = this.handleCollectionChange.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.deselectAll = this.deselectAll.bind(this);
  }
  componentWillMount() {
    this.unsubscribe = this.partsRef.onSnapshot(this.onPartsUpdate)
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onPartsUpdate = (querySnapshot) => {
    const parts = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
            data.key = doc.id; // ADD KEY FOR ITERATING IN REACT
      parts.push(
        data,
      );
    });
    console.log(parts);
    this.setState({
      parts,
      loading: false,
    });
    console.log(this.state);
  }
  handleCollectionChange(collection) {
    this.setState({
      collectionSelected:collection
    })
  }
  handleSelectionChange(partId) {
    if (this.state.selection.includes(partId)){
      let indexOf = this.state.selection.indexOf(partId)
      indexOf == -1 ?
        console.log("Error, selection includes part, but index cannot be found") :
        this.state.selection.splice(indexOf,1)
    } else {
      this.state.selection.push(partId);
    }
  }
  selectAll() {
    console.log("selectAll");
  }
  deselectAll() {
    console.log("deselectAll");
  }
  getParts() {
    if (this.state.loading) {
      return null;
    } else {
      return this.state.parts;
    }
  }
  render() {
    return (
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
              maxWidth:'1440px',
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
            <PartsGrid parts={this.state.parts} gridarea="parts" style={{overflowY:'scroll'}}/>
          </Grid>
      </PartsLibraryBase>
    )
  }
}

ReactDOM.render((
  <Router>
    <Page>
      <PartsLibrary/>
    </Page>
  </Router>
), document.getElementById('root'));
