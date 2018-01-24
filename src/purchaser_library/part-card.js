import React from 'react';
import PropTypes from 'prop-types';

import DropDown from '../components/dropdown';
import Select from '../components/select';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/buttons';
import RadioGroup from '../components/radios/radio-group';
import PartCardPrice from './part-card-price';

const CardItem = styled.div`
  width: 100%;
  position:relative;
`

const Card = styled.div`
  background-color:white;
  height:100%;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`

const CardPart = Card.extend`
  position:relative;
  display: flex;
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
  padding:6px 10px;
  border-radius:2px;
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
PartBadge.propTypes = {
  nature: PropTypes.oneOf(['primary','caution','error','info','success','default'])
}

const PartName = styled.h3`
  font-weight:bold;
  font-size:18px;
  margin-bottom:8px;
`

const GreyDetail = styled.p`
  font-size:11px;
  line-height:11px;
  color:#797979;
  margin-bottom:4px;
  margin-top:0;
  min-height:11px;
  &:last-of-type{
    margin-bottom:0;
  }
`

const CardTop = styled.div`
  width:100%;
  height:264px;
  background-color:#fafafa;
  border-bottom:1px solid #ededed;
  background-image:${props => props.image ? "url(" + props.image + ")" : "none"};
  background-position: center center;
  background-size: contain;
  position:relative;
`

const CardBottom = styled.div`
  padding:16px;
  position:relative;
`

const CardFooter = styled.div`
  margin-top:1px;
  width:100%;
  position:relative;
`

const PriceRow = styled.div`
  width:100%;
  margin-bottom:16px;
`

const ControlRow = styled.div`
  width:100%;
  margin-bottom:32px;
`

const Price = styled.div`
  font-size:18px;
  color:#2196F3;
  display:inline-block;
`

const Each = styled.div`
  font-size:14px;
  color:#797979;
  display:inline-block;
  margin-left:6px;
`
const CardFill = styled.div`
  position:absolute;
  top:0;left:0;right:0;bottom:0;
  background-color:rgba(0,0,0,0.5);
  padding:16px;
  display:flex;
  flex-direction:column;
  align-items:stretch;
  justify-content:flex-end;
`

const RadioBlock = styled.div`
  padding:16px;
  background-color:white;
  margin-bottom:99px;
  z-index:500;
  box-shadow:0 4px 8px rgba(0,0,0,0.1);
  border-radius:2px;
`

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

class BobbyPartCard extends React.Component {
  constructor(props){
    super(props);
    this.extractProcesses = () => {
      var i;
      var array = [];
      var origin = this.props.part.secondaryProcesses;
      for(i = 0; i < origin.length; i++){
        array.push(origin[i].name);
      }
      return(
        array.join(", ")
      )
    }
    this.secondaryProcesses = ( this.props.part.secondaryProcesses ? this.extractProcesses() : "" );
    this.material = (( this.props.part.material.type || null ) + ( this.props.part.material.grade ? ( " " + this.props.part.material.grade ) : null ));
    this.machineTypes = (this.props.part.machineTypes && this.props.part.machineTypes.length > 0) ? this.props.part.machineTypes.join(", ") : undefined;
    this.materialAndMachineTypes = (this.material && this.machineTypes) ? [this.material,this.machineTypes].join(", ") : (this.material||this.machineTypes);
    this.state = {
      time: times[2],
      quantity: quantities[2],
      open: "",
      hover: false,
    }
  }
  handleMouseOver = () => {
    console.log("MOUSE OVER");
    this.setState({hover:true});
  }

  handleMouseOut = () => {
    console.log("MOUSE OUT");
    this.setState({hover:false});
  }

  handleTimeClick = () => {
    if (this.state.open === "time") {
      this.setState({open:""});
    } else {
      this.setState({open:"time"});
    }
  }

  handleQuantityClick = () => {
    if (this.state.open === "quantity") {
      this.setState({open:""});
    } else {
      this.setState({open:"quantity"});
    }
  }

  getPartPrices = (prices, priceScale) => {
    let { value: timeKey, display: timeDisplay } = this.state.time;
    let { value: quantityKey, display: quantityDisplay } = this.state.quantity;
    return {
      low: (prices[timeKey][quantityKey][0] * priceScale).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
      median: (prices[timeKey][quantityKey][1] * priceScale).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
      high: (prices[timeKey][quantityKey][2] * priceScale).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
    }
  }

  handleTimeChange = (option) => {
    this.setState({ time: option })
  }

  handleQuantityChange = (option) => {
    this.setState({ quantity: option })
  }

  render(){
    const part = this.props.part;
    const boundaryId = part.id+"bounds";
    const priceScale = ( this.props.priceDisplay === "quantity" ? this.state.quantity.value : 1 );
    return (
      <CardItem onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        <CardFill>
            { (this.state.open !== "") ?

              <RadioBlock><RadioGroup options={(this.state.open === "quantity") ? quantities : times } name={this.state.open} partId={part.id} checked={ (this.state.open === "quantity") ? this.state.quantity : this.state.time } handleChange={ (this.state.open === "quantity") ? this.handleQuantityChange : this.handleTimeChange }/></RadioBlock>
          : null }

        </CardFill>
        <CardPart ref={(ref)=>this.popoverBoundary = ref} id={part.partId+"bounds"}>
          <CardTop image={this.props.image}/>
          <CardBottom>
            <PartName>{part.partNumber}</PartName>
            <GreyDetail>{this.materialAndMachineTypes}</GreyDetail>
            <GreyDetail>{this.secondaryProcesses}</GreyDetail>
            <CardFooter>
              <PartCardPrice prices={this.getPartPrices(part.prices,priceScale)} hover={this.state.hover} priceAffix={ (this.props.priceDisplay === "unit") ? "ea" : "/ "+this.state.quantity.display }/>
              { true ? <ControlRow><DropDown onClick={this.handleQuantityClick} value={this.state.quantity.display}/><div style={{content:'',display:'inline-block',width:'8px'}}/><DropDown onClick={this.handleTimeClick} value={this.state.time.display}/></ControlRow> : null }
              <Button nature="default" width="stretch">Add to Estimate</Button>
            </CardFooter>
          </CardBottom>
        </CardPart>
      </CardItem>
    )
  }
}
BobbyPartCard.propTypes = {
  part:PropTypes.object,
  image:PropTypes.string,
  priceDisplay:PropTypes.oneOf(["unit","quantity"])
}
export default BobbyPartCard;
