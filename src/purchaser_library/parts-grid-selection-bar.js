import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../components/buttons.js';
import { connect } from 'react-redux';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const SelectionBar = styled.div`
  background-color:#ffffff;
  min-height:50px;
  width:100%;
  padding:12px;
  grid-area:${props => props.gridarea};
  margin-bottom:8px;
  box-shadow:0 1px 2px rgba(0,0,0,0.1);
  display:flex;
  justify-content:flex-start;
  align-items:center;
`

const BlueLink = styled.a`
  text-transform:uppercase;
  color:#76abe9;
  font-size:12px;
  font-weight:600;
  margin-left:12px;
  margin-right:12px;
`

const Count = styled.span`
  width:24px;
  text-align:center;
`

const BarButton = Button.extend`
  &+&{
    margin-left:4px;
  }
`

class PartsGridSelectionBar extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor(){
    super();
    this.selectNum = 1;
  }

  render(){
    console.log(this);
   return (

       <SelectionBar gridarea={this.props.gridarea}>
        <Count>{this.selectNum}</Count><span>{this.selectNum > 1 ? `Parts Selected` : `Part Selected`}</span>
        <BlueLink>Select All</BlueLink>
          <BarButton nature="info">Duplicate</BarButton>
          <BarButton nature="info">Archive</BarButton>
          { (this.props.store.collectionSelected != 'All Parts') ? <BarButton nature="info">Remove From Collection</BarButton> : null }
          <BarButton nature="info">Add To Collection</BarButton>
          <BarButton nature="info">Add To Estimate</BarButton>
        <FontAwesomeIcon icon={faTimes} style={{marginLeft:'auto',fontSize:'18px',marginRight:'6px'}}/>
       </SelectionBar>
   )
 }
}

export default compose(
  connect(
    (state, props) =>
      ({
        store: state.store
      })
  )
)(PartsGridSelectionBar)
