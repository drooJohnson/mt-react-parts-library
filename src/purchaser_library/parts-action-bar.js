import React from 'react';
import styled from 'styled-components';
import VerticalRule from '../components/vertical-rule';
import ListGridSwitch from './list-grid-switch';
import Pagination from '../components/pagination';
import {InlineRadio} from '../components/radios/radio';

import { compose } from 'redux';
import { connect } from 'react-redux';

const ActionBarWrapper = styled.div`
  width:100%;
  min-height:50px;
  background-color:#ffffff;
  border-left: 8px solid #000000;
  padding:12px;
  position:relative;
  box-shadow:0 1px 2px rgba(0,0,0,0.1);
  grid-area: ${props => props.gridarea || ''};
`
const BarRow = styled.div`
  width:100%;
  display:flex;
  justify-content:flex-start;
  align-items:center;
`
const Title = styled.div`
  font-weight:600;
  letter-spacing:1px;
  align-self:center;
  padding-top:1px;
  text-transform:uppercase;
`

const HelperLink = styled.span`
  color:#4A90E2;
  font-size:12px;
  text-decoration:underline;
`
class PartsActionBar extends React.Component {
  render(){
    return (
      <ActionBarWrapper gridarea={this.props.gridarea}>
        <BarRow>
          <Title>{this.props.collectionName}</Title>
          <Pagination style={{marginLeft:'auto'}}/>
          <VerticalRule/>
          <ListGridSwitch active={this.props.libraryLayout}/>
        </BarRow>
        <BarRow>
          <p>Want to get a sense of what your part will cost? Explore network pricing by adjusting parameters below.</p>
        </BarRow>
        <BarRow style={{marginBottom:"4px"}}>
          <label style={{marginRight:"40px",lineHeight:"14px"}}>Display pricing by:</label>
          <InlineRadio name="pricescale" label="Per Piece Pricing" option={{value:"unit",display:"Per Piece Pricing"}} handleChange={()=>{this.props.onPriceScaleChange("unit")}} checked={this.props.priceDisplay === "unit"}/>
          <InlineRadio name="pricescale" label="Per Quantity Pricing" option={{value:"quantity",display:"Per Quantity Pricing"}} handleChange={()=>{this.props.onPriceScaleChange("quantity")}} checked={this.props.priceDisplay === "quantity"}/>
          <HelperLink style={{marginLeft:'40px'}}>What's This?</HelperLink>
        </BarRow>
      </ActionBarWrapper>
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
)(PartsActionBar)
