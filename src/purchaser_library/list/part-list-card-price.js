import React from 'react';

import styled from 'styled-components';

//  background-image: ${props => props.hover ? 'url(assets/chart_hover.svg)' : 'url(assets/chart.svg)'};

const Wrapper = styled.div`
  flex-grow: 1;
  filter: ${props => props.hover ? 'contrast(1.0) brightness(1.0)' : 'contrast(0.5) brightness(1.3)'};
  transform: ${props => props.loading ? 'translateZ(0) scale(0.8)' : 'translateZ(0) scale(1.0)'};
  opacity: ${props => props.loading ? 0 : 1.0};
  transition: transform 300ms ease, opacity 300ms ease, filter 300ms ease;
  backface-visibility: hidden;
  grid-area: ${props => props.gridArea};
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: stretch;
`
const Chart = styled.div`
  background-image: url(./assets/chart_hover.svg);
  filter: ${props => !props.hover ? 'saturate(0.35)' : 'saturate(1)'};
  background-size: cover;
  background-position: top center;
  transition: filter 300ms ease;
  backface-visibility: hidden;
  position: absolute;
  top: 4px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index:-10;
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
  &:before,&:after{
    content:"";
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

const PartListCardPrice = ({ gridArea, prices, hover, priceAffix, loading }) => {
  return(
  <Wrapper gridArea={gridArea} loading={loading} hover={hover}>
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

export default PartListCardPrice;
