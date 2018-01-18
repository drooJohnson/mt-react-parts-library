import React from 'react';

import 'firebase/firestore'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux';
import { compose } from 'redux';

import Grid from '../layout/grid';

import Navigation from '../navigation.js';
import Header from '../part_details/part-detail-header';
import PartImage from '../part_details/part-image';
import {DetailHeaderPanel, PartDetailsPanel, PriceQuotesPanel, ModelsPanel, OtherFilesPanel} from '../part_details/detail-card';
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

class PartDetail extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor(props){
    super(props);
    this.partId = this.props.match.params.id
  }
  details = (part) => {

    var dimensions;

    if (part.dimensionFormat === "cubic"){
      let {length,width,thickness} = part.dimensions;
      dimensions = (length || "No Length Provided") + " × " + (width || "No Width Provided") + " × " + (thickness || "No Thickness Provided") + " " + (part.units || "No Units Provided");
    } else if (part.dimensionFormat === "cylindrical"){
      let {diameter,length} = part.dimensions;
      dimensions = (diameter || "No Diameter Provided") + " " + (part.units || "No Units Provided") + " ∅ x " + (length || "No Length Provided") + " " + (part.units || "No Units Provided");
    } else {
      dimensions = "No Format Data Provided";
    }

    var tolerance = "±" + (part.minimumTolerance || 'No Tolerance Value Provided') + " " + (part.units || 'Unknown Units');

    let {grade, type} = part.material;
    var material = (type||"No Type Provided") + " " + (grade||"No Grade Provided");

    var machineType = (part.machineTypes ? part.machineTypes.join(", ") : "No Machine Types Provided");

    return(
      [
        {
          name:'Description',
          value: part.description
        },{
          name:'Dimensions',
          value: dimensions
        },{
          name:'Tightest Tolerance',
          value: tolerance
        },{
          name:'Material',
          value: material
        },{
          name:'Machine Type',
          value: machineType
        }
      ]
    )
  }

  secondaryProcesses = (part) => {
    var i;
    var array = [];
    var origin = part.secondaryProcesses;
    console.log(part.secondaryProcesses);
    for(i = 0; i < origin.length; i++){
      let obj = {
        name:origin[i].name,
        value:origin[i].description
      };
        array.push(obj);
    }
    return(
      array
    )
  }

  customDetails = (part) => {
    return part.customDetails
  }

  pricing = (part) => {
    var i;
    var array = [];
    var origin = part.prices;
    console.log(part.prices);
    for(i = 0; i < origin.length; i++){
      let priceUSD = origin[i].price_in_cents * 0.01;
      let price = "$" + priceUSD.toFixed(2) + " per part";
      let obj = {
        name:origin[i].quantity,
        value:price
      };
      array.push(obj);
    }
    return(
      array
    )
  }

  render() {
    var part;
    if (this.props.parts) {
      part = this.props.parts[this.props.match.params.id];
      console.log(part);
    }
    return(
      <PartDetailBase>
        <Navigation gridarea="navigation"/>
        { this.props.parts ?
          <Header gridarea="header" partname={this.props.parts[this.props.match.params.id].partNumber}/>
        :
          <Header gridarea="header" partname="loading..."/>
        }
        <Grid
          gridrows='auto'
          gridcolumns='300px 1fr'
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
            position:'absolute',
            height:'100%',
            maxHeight:'100%',
          }}
        >
            { this.props.parts ?
              <React.Fragment>
                <div style={{gridArea:'image'}}>
                  <PartImage/>
                </div>
                <div style={{gridArea:'details'}}>
                  <DetailHeaderPanel name={this.props.parts[this.props.match.params.id].partNumber}/>
                  <PartDetailsPanel name="Part Details" details={this.details(part)}/>
                  <PartDetailsPanel name="Secondary Processes" details={this.secondaryProcesses(part)}/>
                  <PartDetailsPanel name="Custom Details" details={this.customDetails(part)}/>
                  <PriceQuotesPanel details={this.pricing(part)}/>
                  <ModelsPanel/>
                  <OtherFilesPanel/>
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
