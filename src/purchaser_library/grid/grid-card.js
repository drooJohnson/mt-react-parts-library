import React from 'react';
import PropTypes from 'prop-types';

import DropDown from '../../components/dropdown';

import styled from 'styled-components';
import Button from '../../components/buttons';
import RadioGroup from '../../components/radios/radio-group';
import PartGridCardPrice from './part-grid-card-price';
import PartPreview from './grid-part-preview';
import zIndex from '../../components/utils/z-index';

import Loader from './grid-card-loader';
import { Transition } from 'react-transition-group';

// Timing variables

let duration = 300;

// Transition Styles

let screenFillDefaultStyle = {
  opacity: 0.0,
  display: 'none',
}

let screenFillTransitionStyles = {
  entering: { opacity: 0.0, display: 'block' },
  entered:  { opacity: 0.7, display: 'block' },
  exiting:  { opacity: 0.0, display: 'block' },
  exited:   { opacity: 0.0, display: 'none'  },
}

let radioBlockDefaultStyle = {
  opacity: 0.0,
  transform: 'translateY(-10px) translateZ(0)',
  display: 'none',
}

let radioBlockTransitionStyles = {
  entering: { opacity: 0.0, display: 'block', transform: 'translateY(10px)  translateZ(0)' },
  entered:  { opacity: 1.0, display: 'block', transform: 'translateY(0px)   translateZ(0)' },
  exiting:  { opacity: 0.0, display: 'block', transform: 'translateY(-10px) translateZ(0)' },
  exited:   { opacity: 0.0, display: 'none',  transform: 'translateY(-10px) translateZ(0)' },
}

// Presentational Components

const GridCardItem = styled.div`
  width: 100%;
  position: relative;
  grid-column: auto;
`

const GridCard = styled.div`
  background-color: white;
  height: 100%;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  transition: box-shadow 300ms ease;
  &:hover{
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.1);
  }
`

const GridCardPart = GridCard.extend`
  position: relative;
  display: flex;
`


// Bluetext

const BlueLink = styled.a`
  font-size: 11px;
  color: #4a90e2;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 12px;
`

const PriceFeedback = styled.div`
  margin-bottom: 12px;
  display: block;
  visibility: ${props => props.hover ? 'visible' : 'hidden' };
  opacity: ${props => props.hover ? '1.0' : '0.0' };
  transition: ${props => props.hover ? 'opacity 300ms ease' : 'opacity 300ms ease, visibility 0ms 300ms ease' };
`

const IntercomIcon = styled.img`
  margin-left: 4px;
  color: #137DE5;
  width: 11px;
  height: 13px;
  vertical-align: bottom;
`
// CUSTOM CARD-BOUND SCRIM

const CardFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  transition: opacity ${duration}ms;
`

const GridCardBottom = styled.div`
  padding: 16px;
  position: relative;
`

const PartName = styled.h3`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
`

const GreyDetail = styled.p`
  font-size: 11px;
  line-height: 11px;
  color: #797979;
  margin-bottom: 4px;
  margin-top: 0;
  min-height: 11px;
  &:last-of-type{
    margin-bottom: 0;
  }
`

const GridCardFooter = styled.div`
  margin-top: 1px;
  width: 100%;
  position: relative;
`

// CUSTOM SELECT POPOVERS

const RadioBlock = styled.div`
  padding: 16px 12px;
  background-color: white;
  margin-bottom: 101px;
  z-index: ${zIndex['mid']};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: opacity ${duration}ms ease, transform ${duration}ms ease;
  border-radius: 2px;
  opacity: 0;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
  position:relative;
`

const Arrow = styled.div`
  content: '';
  display: block;
  border: 8px solid transparent;
  border-top: 8px solid white;
  position: absolute;
  left: ${props => props.fromLeft}px;
  bottom: -15px;
  height: 1px;
  width: 1px;
  z-index: ${zIndex['mid']+10};
`

const TimeInput = ({ times, inProp, partId, checked, submitRef, handleSubmit }) => (
  <CardFill key={partId + "time"}>
    <Transition appear={true} in={inProp} timeout={{ enter: 0, exit: duration }}>
      {( state ) => (
        <RadioBlock className={'gridRadioBlock'} style={{...radioBlockDefaultStyle, ...radioBlockTransitionStyles[state]}}>
          <RadioGroup options={times} name={"time"} partId={partId} checked={checked} submitRef={submitRef} handleSubmit={handleSubmit}/>
          <Arrow fromLeft={131}/>
        </RadioBlock>
      )}
    </Transition>
  </CardFill>
)

const QuantityInput = ({ quantities, inProp, partId, checked, submitRef, handleSubmit }) => (
  <CardFill key={partId + "quantity"}>
    <Transition appear={true} in={inProp} timeout={{ enter: 0, exit: duration }}>
      {( state ) => (
        <RadioBlock className={'gridRadioBlock'} style={{...radioBlockDefaultStyle, ...radioBlockTransitionStyles[state]}}>
          <RadioGroup options={quantities} name={"quantity"} partId={partId} checked={checked} submitRef={submitRef} handleSubmit={handleSubmit}/>
          <Arrow fromLeft={32}/>
        </RadioBlock>
      )}
    </Transition>
  </CardFill>
)

// CUSTOM SCREEN-BOUND SCRIM USED TO CATCH CLICK EVENTS OUTSIDE OF THE MODAL/INPUT BEING HOISTED BY THE SCRIM.

const ScreenFillScrim = styled.div`
  position: fixed;
  top: 0;left: 0;right: 0;bottom: 0;
  transition: opacity ${duration*0.8}ms ease;
  background-color: #f3f3f3;
  z-index: ${zIndex.low};
`

const ScreenFill = ({ inProp, partId, scrimOpacity, onClick }) => (
  <Transition appear={true} in={inProp} timeout={{ enter: 0, exit: duration }}>
    {( state ) => (
      <ScreenFillScrim style={{...screenFillDefaultStyle, ...screenFillTransitionStyles[state]}} key={partId} onClick={onClick}/>
    )}
  </Transition>
)

// CONTAINS THE DROPDOWNS

const ControlRow = styled.div`
  text-align: left;
  margin-bottom: 8px;
`

class PartGridCard extends React.Component {
    render(){
      const {
        part, image, displayLoader, handleMouseOver, handleMouseOut, timeOpen,
        quantityOpen, selectedTime, selectedQuantity, handleTimeChange,
        handleQuantityChange, handleTimeClick, handleQuantityClick,
        onScrimClick, scrimOpacity, hover, hoverOverlayEnabled,
        materialAndMachineTypes, secondaryProcesses, prices, loading,
        priceDisplay, times, quantities, submitRef
      } = this.props;

      const priceScale = ( priceDisplay === "quantity" ? selectedQuantity.value : 1 );
      const ref = this;
      return (
        <GridCardItem onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <React.Fragment>
            <ScreenFill inProp={quantityOpen||timeOpen} partId={part.id} scrimOpacity={scrimOpacity} onClick={()=>{onScrimClick(this)}}/>
            <QuantityInput inProp={quantityOpen} partId={part.id} checked={selectedQuantity} submitRef={submitRef} handleSubmit={handleQuantityChange} quantities={quantities}/>
            <TimeInput inProp={timeOpen} partId={part.id} checked={selectedTime} submitRef={submitRef} handleSubmit={handleTimeChange} times={times}/>
          </React.Fragment>
          { displayLoader && <CardFill><Loader></Loader></CardFill> }
          <GridCardPart ref={(ref)=>this.popoverBoundary = ref} id={part.partId+"bounds"}>
            <PartPreview hover={hover} image={image} hoverOverlayEnabled={hoverOverlayEnabled} part={part}/>
            <GridCardBottom>
              <PartName>{part.partNumber}</PartName>
              <GreyDetail>{materialAndMachineTypes}</GreyDetail>
              <GreyDetail>{secondaryProcesses}</GreyDetail>
              <GridCardFooter>
                <PartGridCardPrice prices={prices(part.prices,priceScale)} hover={hover} loading={loading} priceAffix={ (priceDisplay === "unit") ? "ea" : "/ "+selectedQuantity.display }/>
                <ControlRow>
                  <DropDown open={quantityOpen} onClick={handleQuantityClick} value={selectedQuantity.display} longestValue={quantities.slice(-1)[0].display}/>
                  <div style={{display: 'inline-block', width: '8px'}}/>
                  <DropDown open={timeOpen} onClick={handleTimeClick} value={selectedTime.display} longestValue={times.slice(-1)[0].display}/>
                </ControlRow>
                <PriceFeedback hover={hover}>
                  <BlueLink>Question about Predicted Price?</BlueLink><IntercomIcon src="../assets/icons/intercom.svg"/>
                </PriceFeedback>
                <Button type="default" width="stretch">Add to Estimate</Button>
              </GridCardFooter>
            </GridCardBottom>
          </GridCardPart>
        </GridCardItem>
    )
  }
}
PartGridCard.propTypes = {
  part: PropTypes.object,
  image: PropTypes.string,
  priceDisplay: PropTypes.oneOf(["unit", "quantity"])
}

export default PartGridCard;
