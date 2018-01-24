import React from 'react';
import PropTypes from 'prop-types';

import DropDown from '../components/dropdown';
import Select from '../components/select';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/buttons';
import PopoverWrapper from '../components/popovers/popover-wrapper';
import RadioGroup from '../components/radios/radio-group';

const Wrapper = styled.div`
  width:100%;
  background-image:${props => props.hover ? 'url(assets/chart_hover.svg)' : 'url(assets/chart.svg)'};
  background-size:cover;
  background-position:top center;
  padding-top:24px;
  margin-bottom:16px;
`

const MedianPrice = styled.div`
  margin-left:auto;
  margin-right:auto;
  color:#4A90E2;
  font-size:20px;
  margin-bottom:8px;
  text-align:center;
`

const MedianPer = styled.span`
  margin-left:6px;
  font-size:12px;
  color:#333333;
`

const MedianLabel = styled.div`
  text-transform:uppercase;
  font-size:10px;
  color:#333333;
  text-align:center;
  margin-bottom:8px;
`

const RangeWrapper = styled.div`
  display:flex;
  justify-content:stretch;
  align-items:center;
`

const RangePrice = styled.div`
  flex-grow:0;
  color:#797979;
  font-size:14px;
`

const LineWrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:stretch;
  margin-left:12px;
  margin-right:12px;
  flex-grow:1;
  &:before,&:after{
    content:"";
    display:block;
    flex-grow:0;
    width:0;
    height:0;
    border-top:4px solid transparent;
    border-bottom:4px solid transparent;
  }
  &:before{
    border-right:4px solid #D6D6D6;
  }
  &:after{
    border-left:4px solid #D6D6D6;
  }
`

const Line = styled.div`
  height:1px;
  flex-grow:1;
  background-color: #D6D6D6;
`

const PartCardPrice = ({prices,hover,priceAffix}) => {
  console.log(prices);
  console.log(hover);
  console.log(priceAffix);
  return(
  <Wrapper hover={hover}>
    <MedianPrice>
      ${prices.median}
      <MedianPer>{priceAffix}</MedianPer>
    </MedianPrice>
    <MedianLabel>MEDIAN<br/>PREDICTED PRICE</MedianLabel>
    <RangeWrapper>
      <RangePrice>${prices.low}</RangePrice>
      <LineWrapper><Line /></LineWrapper>
      <RangePrice>${prices.high}</RangePrice>
    </RangeWrapper>
  </Wrapper>
)}

export default PartCardPrice;
