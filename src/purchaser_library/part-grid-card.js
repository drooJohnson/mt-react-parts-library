import React from 'react';
import PropTypes from 'prop-types';

import DropDown from '../components/dropdown';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/buttons';
import RadioGroup from '../components/radios/radio-group';
import PartGridCardPrice from './part-grid-card-price';
import zIndex from '../utils/z-index';

import Loader from './grid-card-loader';
import { Transition } from 'react-transition-group';

const GridCardItem = styled.div`
  width: 100%;
  position:relative;
`;

const GridCard = styled.div`
  background-color:white;
  height:100%;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  transition:box-shadow 300ms ease;
  &:hover{
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.1);
  }
`;

const GridCardPart = GridCard.extend`
  position:relative;
  display: flex;
`;

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
  background-color: ${props => props.type ? badges[props.type].backgroundColor : null};
  border-color: ${props => props.type ? badges[props.type].borderColor : null};
  color: ${props => props.type ? badges[props.type].textColor : null};
`;

PartBadge.propTypes = {
  type: PropTypes.oneOf(['primary','caution','error','info','success','default'])
};

const PartName = styled.h3`
  font-weight:bold;
  font-size:18px;
  margin-bottom:8px;
`;

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
`;

const GridCardTop = styled.div`
  width:100%;
  height:204px;
  background-color:#fafafa;
  border-bottom:1px solid #ededed;
  background-image:${props => props.image ? "url(" + props.image + ")" : "none"};
  filter:${props => props.hover ? 'contrast(1.0) brightness(1.0)' : 'contrast(0.5) brightness(1.3)'};
  background-position: center center;
  background-repeat:no-repeat;
  background-size: contain;
  position:relative;
  transition:filter 300ms ease;
`;

const PartPreview = styled.div`
  width:100%;
  height:204px;
  background-color:#fafafa;
  border-bottom:1px solid #ededed;
  filter:${props => props.hover ? 'contrast(1.0) brightness(1.0)' : 'contrast(0.5) brightness(1.3)'};
  position:relative;
  transition:filter 300ms ease;
`

const GridCardImage = styled.img`

  display:block;
  height:100%;
  width:100%;
  object-fit: contain;
`

const GridCardBottom = styled.div`
  padding:16px;
  position:relative;
`;

const GridCardFooter = styled.div`
  margin-top:1px;
  width:100%;
  position:relative;
`;

const ControlRow = styled.div`
  width:100%;
  margin-bottom:32px;
`;

let duration = 300;

const CardFill = styled.div`
  position:absolute;
  top:0;left:0;right:0;bottom:0;
  padding:16px;
  display:flex;
  flex-direction:column;
  align-items:stretch;
  justify-content:flex-end;
  transition: opacity ${duration}ms;
`;

const RadioBlock = styled.div`
  padding:16px 12px;
  background-color:white;
  margin-bottom:101px;
  z-index:${zIndex['mid']};
  box-shadow:0 4px 8px rgba(0,0,0,0.1);
  transition: opacity ${duration}ms ease, transform ${duration}ms ease;
  border-radius:2px;
  opacity: 0;
`;

let times = [
  { value: '2wks',  display: '2 Weeks'  },
  { value: '3wks',  display: '3 Weeks'  },
  { value: '4wks',  display: '4 Weeks'  },
  { value: '5wks',  display: '5+ Weeks' }
];

let quantities = [
  { value: 1,      display: '1'       },
  { value: 10,     display: '10'      },
  { value: 100,    display: '100'     },
  { value: 1000,   display: '1,000'   },
  { value: 10000,  display: '10,000'  },
  { value: 100000, display: '100,000' }
];

let screenFillDefaultStyle = {
  opacity: 0.0,
  display: 'none',
}

let screenFillTransitionStyles = {
  entering: { opacity: 0.0, display: 'block' },
  entered:  { opacity: 0.7, display: 'block' },
  exiting: { opacity: 0.0, display: 'block'},
  exited: { opacity: 0.0, display: 'none'},
}

let radioBlockDefaultStyle = {
  opacity: 0.0,
  transform:'translateY(-10px) translateZ(0)',
  display:'none',
}

let loadTimeMin = 1000;
let loadTimeMax = 3000;

const Arrow = styled.div`
  content:'';
  display:block;
  border:8px solid transparent;
  border-top:8px solid white;
  position:absolute;
  left:${props => props.fromLeft}px;
  bottom:-15px;
  height:1px;
  width:1px;
  z-index:${zIndex['mid']+10};
  filter:drop-shadow(0 1px 1px rgba(0,0,0,0.1));
`

let radioBlockTransitionStyles = {
  entering: { opacity: 0.0, display:'block', transform:'translateY(10px) translateZ(0)' },
  entered:  { opacity: 1.0, display:'block', transform:'translateY(0px) translateZ(0)' },
  exiting: { opacity: 0.0, display:'block', transform:'translateY(-10px) translateZ(0)' },
  exited: { opacity: 0.0, display:'none', transform:'translateY(-10px) translateZ(0)' },
}

const ScreenFillScrim = styled.div`
  position:fixed;
  top:0;left:0;right:0;bottom:0;
  transition: opacity ${duration*0.8}ms ease;
  background-color:#f3f3f3;
  z-index:${zIndex.low};
`;

const ScreenFill = ({inProp,partId,scrimOpacity,onClick}) => (
  <Transition appear={true} in={inProp} timeout={{enter:0,exit:duration}}>
    {(state) => (
      <ScreenFillScrim style={{...screenFillDefaultStyle,...screenFillTransitionStyles[state]}} key={partId} onClick={onClick}/>
    )}
  </Transition>
)

const TimeInput = ({inProp,partId,checked,submitRef,handleSubmit}) => (
  <CardFill /*style={{...cardFillDefaultStyle,...cardFillTransitionStyles[state]}}*/ key={partId + "time"}>
    <Transition appear={true} in={inProp} timeout={{enter:0,exit:duration}}>
      {(state) => (
        <RadioBlock style={{...radioBlockDefaultStyle,...radioBlockTransitionStyles[state]}}>
          <RadioGroup options={times} name={"time"} partId={partId} checked={checked} submitRef={submitRef} handleSubmit={handleSubmit}/>
          <Arrow fromLeft={131}/>
        </RadioBlock>
      )}
    </Transition>
  </CardFill>
)

const QuantityInput = ({inProp,partId,checked,submitRef,handleSubmit}) => (
  //<Transition appear={true} in={inProp} timeout={duration}>
    //{(state) => (
      <CardFill /*style={{...cardFillDefaultStyle,...cardFillTransitionStyles[state]}}*/ key={partId + "quantity"}>
        <Transition appear={true} in={inProp} timeout={{enter:0,exit:duration}}>
          {(state) => (
            <RadioBlock style={{...radioBlockDefaultStyle,...radioBlockTransitionStyles[state]}}>
              <RadioGroup options={quantities} name={"quantity"} partId={partId} checked={checked} submitRef={submitRef} handleSubmit={handleSubmit}/>
              <Arrow fromLeft={32}/>
            </RadioBlock>
          )}
        </Transition>
      </CardFill>
    //)}
  //</Transition>
)

const CardOverlay = styled.div`
  display: flex;
  opacity: 0.0;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.4);
  transition:opacity 300ms ease;
  &:hover,&:focus{
    opacity:1.0;
  }
`

const CardOverlaySelectionButton = styled.div`
  width:22px;
  height:22px;
  background-color:transparent;
  position:absolute;
  top:16px;
  left:16px;
  border:1px solid #ffffff;
  border-radius:100%;
  cursor:pointer;
  transition:background-color 150ms ease;
  &:hover{
    background-color:rgba(255,255,255,0.2);
  }
`

const OverlayLink = styled(Link)`
  text-decoration:none;
`

const PartOverlayDetailsButton = ({id,children}) => (
  <OverlayLink to={`/parts/${id}`}><Button type="success" size="small" style={{fontSize:'12px'}}>{children}</Button></OverlayLink>
)

class PartGridCard extends React.Component {
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
      timeOpen: false,
      quantity: quantities[3],
      quantityOpen: false,
      hover: false,
      loading: false,
      displayLoader: false,
      scrimOpacity:0
    }
  }
  handleMouseOver = () => {
    this.setState({hover:true});
  }

  handleMouseOut = () => {
    this.setState({hover:false});
  }

  handleTimeClick = () => {
    if (this.state.timeOpen) {
      this.setState({timeOpen:false,quantityOpen:false, scrimOpacity: '0.7'});
    } else {
      this.setState({timeOpen:true,quantityOpen:false, scrimOpacity: '0.7'});
    }
  }

  handleQuantityClick = () => {
    if (this.state.quantityOpen) {
      this.setState({quantityOpen:false,timeOpen:false, scrimOpacity: '0.7'});
    } else {
      this.setState({quantityOpen:true,timeOpen:false, scrimOpacity: '0.7'});
    }
  }

  getPartPrices = (prices, priceScale) => {
    let { value: timeKey} = this.state.time;
    let { value: quantityKey} = this.state.quantity;
    return {
      low: (prices[timeKey][quantityKey][0] * priceScale).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
      median: (prices[timeKey][quantityKey][1] * priceScale).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
      high: (prices[timeKey][quantityKey][2] * priceScale).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
    }
  }

  triggerFauxLoader = (value,min,max) => {
    let timeout = Math.random() * (max - min) + min;
    if (value.time){
      this.setState({loading:true,displayLoader:true});
      setTimeout(()=> {
        this.setState({displayLoader:false})
      }, timeout);
      setTimeout(()=> {
        this.setState({time:value.time,loading:false})
      }, timeout);
    } else if (value.quantity){
      this.setState({loading:true,displayLoader:true});
      setTimeout(()=> {
        this.setState({displayLoader:false})
      }, timeout);
      setTimeout(()=> {
        this.setState({quantity:value.quantity,loading:false})
      }, timeout);
    }
  }

  render(){
    const part = this.props.part;
    const priceScale = ( this.props.priceDisplay === "quantity" ? this.state.quantity.value : 1 );
    const ref = this;
    return (
      <GridCardItem onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <React.Fragment>
            <ScreenFill inProp={this.state.quantityOpen||this.state.timeOpen} partId={part.id} scrimOpacity={this.state.scrimOpacity} onClick={()=>{this.props.onScrimClick(this)}}/>
            <QuantityInput inProp={this.state.quantityOpen} partId={part.id} checked={this.state.quantity} submitRef={ref} handleSubmit={this.props.handleQuantityChange}/>
            <TimeInput inProp={this.state.timeOpen} partId={part.id} checked={this.state.time} submitRef={ref} handleSubmit={this.props.handleTimeChange}/>
          </React.Fragment>
            { (this.state.displayLoader === true) ? <CardFill><Loader></Loader></CardFill> : null }
        <GridCardPart ref={(ref)=>this.popoverBoundary = ref} id={part.partId+"bounds"}>
          <PartPreview hover={this.state.hover}>
            <GridCardImage src={this.props.image}/>
            { this.props.hoverOverlayEnabled &&
                <CardOverlay hover={this.state.hover}>
                  <PartOverlayDetailsButton id={part.id}>Edit Part</PartOverlayDetailsButton>
                  <CardOverlaySelectionButton/>
                </CardOverlay>
            }
          </PartPreview>
          <GridCardBottom>
            <PartName>{part.partNumber}</PartName>
            <GreyDetail>{this.materialAndMachineTypes}</GreyDetail>
            <GreyDetail>{this.secondaryProcesses}</GreyDetail>
            <GridCardFooter>
              <PartGridCardPrice prices={this.getPartPrices(part.prices,priceScale)} hover={this.state.hover} loading={this.state.loading} priceAffix={ (this.props.priceDisplay === "unit") ? "ea" : "/ "+this.state.quantity.display }/>
              <ControlRow>
                <DropDown open={this.state.quantityOpen} onClick={this.handleQuantityClick} value={this.state.quantity.display} longestValue={quantities.slice(-1)[0].display}/>
                <div style={{display:'inline-block',width:'8px'}}/>
                <DropDown open={this.state.timeOpen} onClick={this.handleTimeClick} value={this.state.time.display} longestValue={times.slice(-1)[0].display}/>
              </ControlRow>
              <Button type="default" width="stretch">Add to Estimate</Button>
            </GridCardFooter>
          </GridCardBottom>
        </GridCardPart>
      </GridCardItem>
    )
  }
}
PartGridCard.propTypes = {
  part:PropTypes.object,
  image:PropTypes.string,
  priceDisplay:PropTypes.oneOf(["unit","quantity"])
}

export default connect(
  null,
  (dispatch) => ({
    handleTimeChange: (newValue,originalValue,ref) => {
      if (originalValue !== newValue){
        ref.triggerFauxLoader({time: newValue},loadTimeMin,loadTimeMax);
        ref.setState({timeOpen: false, quantityOpen: false, scrimOpacity: '0.0' })
        dispatch({type: 'HIDE_SCRIM'})
      } else {
        ref.setState({ time: newValue, timeOpen: false, quantityOpen: false, scrimOpacity: '0.0' })
        dispatch({type: 'HIDE_SCRIM'})
      }
    },
    handleQuantityChange: (newValue,originalValue,ref) => {
      if (originalValue !== newValue){
        ref.triggerFauxLoader({quantity: newValue},loadTimeMin,loadTimeMax);
        ref.setState({quantityOpen: false, timeOpen: false, scrimOpacity: '0.0' })
        dispatch({type: 'HIDE_SCRIM'})
      } else {
        ref.setState({ quantity: newValue, quantityOpen: false, timeOpen: false, scrimOpacity: '0.0' })
        dispatch({type: 'HIDE_SCRIM'})
      }
    },
    onScrimClick: (ref) => {
      dispatch({type: 'HIDE_SCRIM'})
      ref.setState({quantityOpen: false, timeOpen: false, scrimOpacity: '0.0'});
    }
  })
)(PartGridCard);
