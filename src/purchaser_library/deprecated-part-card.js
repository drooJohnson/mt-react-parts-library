import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  background-color: ${props => props.type ? badges[props.type].backgroundColor : null};
  border-color: ${props => props.type ? badges[props.type].borderColor : null};
  color: ${props => props.type ? badges[props.type].textColor : null};
`
PartBadge.propTypes = {
  type: PropTypes.oneOf(['primary','caution','error','info','success'])
}

const PartName = styled.h3`
  justify-self:flex-end;
  margin-top:auto;
  font-weight:100;
  margin-bottom:0;
`

const DetailLink = ({id}) => (
  <Link to={`/parts/${id}`}>View Part</Link>
)

let times = [
  { value: '2wks',  display: '2 Weeks'  },
  { value: '3wks',  display: '3 Weeks'  },
  { value: '4wks',  display: '4 Weeks'  },
  { value: '5wks',  display: '5+ Weeks' }
]

let quantities = [
  { value: 1,      display: '1'       },
  { value: 10,     display: '10'      },
  { value: 100,    display: '100'     },
  { value: 1000,   display: '1,000'   },
  { value: 10000,  display: '10,000'  },
  { value: 100000, display: '100,000' }
]

class PartCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      time: times[2],
      quantity: quantities[2]
    }
  }

  getPartPrice = (prices) => {
    let { value: timeKey, display: timeDisplay } = this.state.time;
    let { value: quantityKey, display: quantityDisplay } = this.state.quantity;
    let price = prices[timeKey][quantityKey][1];
    return price;
    // prices = { timeKey: { quantityKey: value } };
  }

  getPartRange = (prices) => {
    // prices = { timeKey: { quantityKey: [lowVal, highVal] } };
    let { value: timeKey, display: timeDisplay } = this.state.time;
    let { value: quantityKey, display: quantityDisplay } = this.state.quantity;
    let [lowVal,midVal,highVal] = prices[timeKey][quantityKey];
    console.log(lowVal+"—"+highVal);
    return lowVal+"—"+highVal;
  }
  
  render(){
    const part = this.props.part;
    return (
      <CardItem>
        <CardPart>
          <CardOverlay>
            <CardOverlayButton>{part.priced ? 'View Results' : 'Price Part'}</CardOverlayButton>
            <DetailLink id={part.id}/>
          </CardOverlay>
          {!part.priced ? <PartBadge type='caution'>NEEDS PRICING</PartBadge> : null }
          <PartName>{part.partNumber}</PartName>
        </CardPart>
      </CardItem>
    )
  }
}

export default PartCard;
