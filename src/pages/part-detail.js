import React from 'react';

import 'firebase/firestore'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux';
import { compose } from 'redux';

import Grid from '../components/layout/grid';

import Navigation from '../components/navigation/navigation';
import Header from '../part_details/part-detail-header';
import {PartImage} from '../part_details/part-image';
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

const NoData = styled.span`
  color:#999999;
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

    var description, dimensions, tolerance, material, machineTypes;

    description = [( part.description !== "" ? part.description : <NoData>No Description</NoData> )];

    dimensions = part.dimensions;

    tolerance = [( part.minimumTolerance !== "" ? "±" + part.minimumTolerance : <NoData>No Tolerance Value Provided</NoData> )," ",( part.minimumToleranceUnits !== "" ? part.minimumToleranceUnits : <NoData>Unknown Units</NoData> )];

    let {grade, type} = part.material;
    material = [( type !== "" ? type : [<NoData>No Type Provided</NoData>] )," ",( grade !== "" ? grade : <NoData>No Grade Provided</NoData> )];

    machineTypes = [( part.machineTypes[0] !== "" ? part.machineTypes.join(", ") : <NoData>No Machine Types Provided</NoData> )];

    return(
      [
        {
          name:'Description',
          value: description
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
          value: machineTypes
        }
      ]
    )
  }

  secondaryProcesses = (part) => {
    var i;
    var array = [];
    var origin = part.secondaryProcesses;
    for(i = 0; i < origin.length; i++){
      if (origin[i].name === "" && origin[i].description === ""){
        continue
      } else {
        let obj = {
          name:origin[i].name,
          value:(origin[i].description || <NoData>No Description Provided</NoData>)
        };
        array.push(obj);
      }
    }
    if (array[0]){
      return array
    } else {
      return [{name:<NoData style={{fontWeight:'normal'}}>No Secondary Processes Provided</NoData>,description:null}]
    }
  }

  customDetails = (part) => {
    var i;
    var array = [];
    var origin = part.customDetails;
    for(i = 0; i < origin.length; i++){
      if (origin[i].name === "" && origin[i].description === ""){
        continue
      } else {
        let obj = {
          name:origin[i].name,
          value:(origin[i].description || <NoData>No Description Provided</NoData>)
        };
        array.push(obj);
      }
    }
    if (array[0]){
      return array
    } else {
      return null
    }
  }

  pricing = (part) => {
    var i;
    var array = [];
    var origin = part.prices;
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

  models = (part) => {
    let output = {
      model: part.assetId+'_model.stp',
      print: part.assetId+'_print.pdf'
    }
    return output;
  }

  render() {
    var part;
    if (this.props.parts) {
      part = this.props.parts[this.props.match.params.id];
    }
    return(
      <PartDetailBase>
        <Navigation gridarea="navigation"/>
        { this.props.parts ?
          <Header gridarea="header" libraryLayout={this.props.store.libraryLayout} partname={this.props.parts[this.props.match.params.id].partNumber}/>
        :
          <Header gridarea="header" libraryLayout={this.props.store.libraryLayout} partname="loading..."/>
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
                  <PartImage image={`../assets/${this.props.parts[this.props.match.params.id].assets.thumbnail}`}/>
                </div>
                <div style={{gridArea:'details'}}>
                  <DetailHeaderPanel name={this.props.parts[this.props.match.params.id].partNumber}/>
                  <PartDetailsPanel name="Part Details" details={this.details(part)}/>
                  <PartDetailsPanel name="Secondary Processes" details={this.secondaryProcesses(part)}/>
                  <PartDetailsPanel name="Custom Details" details={this.customDetails(part)}/>
                  <PriceQuotesPanel details={this.pricing(part)}/>
                  <ModelsPanel data={this.models(part)}/>
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
