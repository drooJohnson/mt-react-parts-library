import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { withContext, getContext, withHandlers, lifecycle } from 'recompose'

import 'firebase/firestore'
import { isLoaded, isEmpty, firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux';
import { compose } from 'redux';

import Grid from '../layout/grid';

import PartsGrid from '../purchaser_library/parts-grid.js';
import Collections from '../purchaser_library/collections-panel.js';
import Navigation from '../navigation.js';
import Header from '../purchaser_library/header.js';
import PartsActionBar from '../purchaser_library/parts-action-bar.js';
import {DetailHeaderPanel, DetailsPanel, PartDetailsPanel} from '../part_details/detail-card';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const PartDetailBase = styled.div`
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


let details = [
  {
    name:'Description',
    value:'None'
  },{
    name:'Dimensions',
    value:'0.001 inches ∅ x 0.003 inches'
  },{
    name:'Tightest Tolerance',
    value:'±0.005 inches'
  },{
    name:'Material',
    value:'Aluminum 6061'
  },{
    name:'Machine Type',
    value:'CNC Router'
  }
]

class PartDetail extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor(props){
    super(props);
    this.partId = this.props.match.params.id
  }
  render() {
    console.log(this);
    return(
      <PartDetailBase>
        <Navigation gridarea="navigation"/>
        <Header gridarea="header"/>
        <Grid
          gridrows='auto'
          gridcolumns='1fr 2fr'
          gridareas="
            'image details'
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
            { this.props.parts ?
              <React.Fragment>
                <div style={{gridArea:'image'}}>

                </div>
                <div style={{gridArea:'details'}}>
                  <DetailHeaderPanel name={this.props.parts[this.props.match.params.id].partNumber}/>
                  <PartDetailsPanel name="Secondary Processes" details={details}/>
                </div>
              </React.Fragment>
            :
              <span> LOADING... </span>
            }
        </Grid>
      </PartDetailBase>
    )
  }
}

export default compose(
  firestoreConnect(['parts','collections']),
  connect(
    (state, props) =>
      ({
        collections: state.firestore.ordered.collections,
        parts: state.firestore.data.parts,
        store: state.store
      })
  )
)(PartDetail)
