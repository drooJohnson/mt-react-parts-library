import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PartsGridSelectionBar from './parts-grid-selection-bar';
// CardGrid > CardItem > CardPart > [CardOverlay > CardOverlayButton], PartBadge, PartName
let partsArr = [
  {id:1,name:"MT0001",priced:true},
  {id:2,name:"MT0002",priced:false},
  {id:3,name:"MT0003",priced:true},
  {id:4,name:"MT0004",priced:true},
  {id:5,name:"MT0005",priced:true},
  {id:6,name:"MT0006",priced:true},
  {id:7,name:"MT0007",priced:true},
  {id:8,name:"MT0008",priced:true},
  {id:9,name:"MT0009",priced:true},
  {id:10,name:"MT00010",priced:true},
  {id:11,name:"MT00011",priced:true},
  {id:12,name:"MT00012",priced:true},
  {id:13,name:"MT00013",priced:true},
  {id:14,name:"MT00014",priced:true},
  {id:15,name:"MT00015",priced:true},
  {id:16,name:"MT00016",priced:true},
]

const CardGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns:1fr 1fr 1fr;
  grid-row-gap:8px;
  grid-column-gap:8px;
  grid-auto-flow:row;
  position:relative;
  overflow-y:scroll;
`

const CardOverlay = styled.div`
  display:none;
  justify-content:center;
  align-items:center;
  position: absolute;
  top: 0;bottom: 0;left: 0;right: 0;
  height:100%;
  width:100%;
  background-color:rgba(0,0,0,0.3);
`

const CardItem = styled.div`
  width: 100%;
  height: 320px;
  &:hover{
    ${CardOverlay} {
      display: flex;
    }
  }
`

const Card = styled.div`
  background-color:white;
  height:100%;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const CardPart = Card.extend`
  position:relative;
  padding:16px;
  display: flex;
`

const CardOverlayButton = styled.button`
  font-family:proxima nova;
  font-weight:600;
  font-size:12px;
  letter-spacing:0.5px;
  -webkit-appearance:none;
  background-color:#00e7b2;
  padding:8px 12px;
  border:solid 1px #00e7b2;
  border-radius:3px;
  box-shadow:0 0 24px rgba(0,0,0,0.35);
`

const badges = {
  primary:{
    borderColor:'#000000',
    backgroundColor:'#00AAFF',
    textColor:'#FFFFFF',
  },
  caution:{
    borderColor:'#e69900',
    backgroundColor:'#FFAA00',
    textColor:'#FFFFFF',
  },
  error:{
    borderColor:'#000000',
    backgroundColor:'#00AAFF',
    textColor:'#FFFFFF',
  },
  info:{
    borderColor:'#000000',
    backgroundColor:'#00AAFF',
    textColor:'#FFFFFF',
  },
  success:{
    borderColor:'#000000',
    backgroundColor:'#00AAFF',
    textColor:'#FFFFFF',
  }
}

const PartBadge = styled.div`
  justify-self:flex-start;
  padding:6px 10px;
  border-radius:14px;
  line-height:11px;
  font-size:11px;
  display:inline-block;
  letter-spacing:1px;
  border:solid 1px black;
  flex-grow:0;
  /* Adapt Colors based on badge type prop */
  background-color: ${props => props.nature ? badges[props.nature].backgroundColor : null};
  border-color: ${props => props.nature ? badges[props.nature].borderColor : null};
  color: ${props => props.nature ? badges[props.nature].textColor : null};
`

const PartsGridWrapper = styled.div`
  position:absolute;
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:stretch;
  align-items:start;
  grid-area:${props => props.gridarea};
`

PartBadge.propTypes = {
  nature: PropTypes.oneOf(['primary','caution','error','info','success'])
}

const PartName = styled.h3`
  justify-self:flex-end;
  margin-top:auto;
  font-weight:100;
  margin-bottom:0;
`

class ComposedCard extends React.Component {
  constructor(props){
    super(props);
    console.log("ComposedCard Const");
    console.log(this);
  }
  render(){
    const part = this.props.part;
    return (
      <CardItem>
        <CardPart>
          <CardOverlay>
            <CardOverlayButton>{part.priced ? 'View Results' : 'Price Part'}</CardOverlayButton>
          </CardOverlay>
          {!part.priced ? <PartBadge nature='caution'>NEEDS PRICING</PartBadge> : null }
          <PartName>{part.partNumber}</PartName>
        </CardPart>
      </CardItem>
    )
  }
}

class PartsGrid extends React.Component {
  constructor(props){
    super(props);
  }
  renderCards = (parts) => {
    if (parts) {
      var markup = parts.map(part => <ComposedCard key={part.key} part={part} />);
      return (
        markup
      )
    } else {
      return (
        <span>NOPE</span>
      )
    }
  }
 render(){
   let parts = this.props.parts;
   return (
     <PartsGridWrapper gridarea={this.props.gridarea}>
       <PartsGridSelectionBar/>
       <CardGrid>
         {this.renderCards(this.props.parts)}
       </CardGrid>
     </PartsGridWrapper>
   )
 }
}

export default PartsGrid
