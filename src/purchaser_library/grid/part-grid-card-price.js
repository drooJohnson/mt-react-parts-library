import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  filter: ${props => props.hover ? 'contrast(1.0) brightness(1.0)' : 'contrast(0.5) brightness(1.3)'};
  background-size: cover;
  background-position: top center;
  padding-top: 24px;
  margin-bottom: 16px;
  transform: ${props => props.loading ? 'translateZ(0) scale(0.8)' : 'translateZ(0) scale(1.0)'};
  opacity: ${props => props.loading ? 0 : 1.0};
  transition: transform 400ms ease, opacity 400ms ease, filter 400ms ease;
  backface-visibility: hidden;
`
const Chart = styled.div`
  width: 100%;
  background-image: url(../assets/chart_hover.svg);
	filter: ${props => !props.hover ? 'saturate(0.35) brightness(1.06)' : 'saturate(1) brightness(1.0)'};
  background-size: cover;
  background-position: top center;
  transition: filter 300ms ease;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -10;
`
const MedianPrice = styled.div`
  margin-left: auto;
  margin-right: auto;
  color: #4A90E2;
  font-size: 20px;
  margin-bottom: 8px;
  text-align: center;
`

const MedianPer = styled.span`
  margin-left: 6px;
  font-size: 12px;
  color: #333333;
`

const MedianLabel = styled.div`
  text-transform: uppercase;
  font-size: 10px;
  color: #333333;
  text-align: center;
  margin-bottom: 8px;
`

const RangeWrapper = styled.div`
  margin-left:8px;
  margin-right:8px;
  display: flex;
  justify-content: stretch;
  align-items: center;
`

const RangePrice = styled.div`
  flex-grow: 0;
  color: #797979;
  font-size: 14px;
`

const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: stretch;
  margin-left: 12px;
  margin-right: 12px;
  flex-grow: 1;
  &:before, &:after{
    content: "";
    display: block;
    flex-grow: 0;
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
  }
  &:before{
    border-right: 4px solid #D6D6D6;
  }
  &:after{
    border-left: 4px solid #D6D6D6;
  }
`

const Line = styled.div`
  height: 1px;
  flex-grow: 1;
  background-color: #D6D6D6;
`

const PartGridCardPrice = ({ prices, hover, priceAffix, loading }) => {
  return(
  <Wrapper loading={loading} hover={hover}>
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
    <Chart hover={hover}/>
  </Wrapper>
)}

export default PartGridCardPrice;
