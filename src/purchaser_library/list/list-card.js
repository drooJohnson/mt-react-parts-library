import React from 'react';
import PropTypes from 'prop-types';

import DropDown from '../../components/dropdown';

import styled from 'styled-components';
import Button from '../../components/buttons';
import RadioGroup from '../../components/radios/radio-group';
import PartListCardPrice from './part-list-card-price';
import PartPreview from './list-part-preview';
import zIndex from '../../components/utils/z-index';

import Loader from './list-card-loader';
import { Transition } from 'react-transition-group';
import TetherComponent from 'react-tether';

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

const ListCardItem = styled.div`
  width: 100%;
  position: relative;
  grid-column: span 3;
`

const ListCard = styled.div`
  background-color: white;
  max-height: 108px;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
  justify-content: stretch;
  align-items: stretch;
  transition: box-shadow 300ms ease;
  &:hover{
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.1);
  }
`

const ListCardPart = ListCard.extend`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr;
  grid-template-areas: 'image details pricing controls';
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
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-end;
  transition: opacity ${duration}ms;
`

const ListCardLeft = styled.div`
  padding: 16px;
  position: relative;
  flex-grow: 1;
  grid-area: details;
`

const ListCardRight = styled.div`
  padding: 16px;
  position: relative;
  flex-grow: 1;
  text-align: right;
  grid-area: controls;
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

// CUSTOM SELECT POPOVERS

const RadioBlock = styled.div`
  padding: 16px 12px;
  background-color: white;
  z-index: ${zIndex['mid']};
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: opacity ${duration}ms ease, transform ${duration}ms ease;
  border-radius: 2px;
  opacity: 0;
  max-width: 268px;
  margin: 12px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
`

const Arrow = styled.div`
  content: '';
  display: block;
  border: px solid transparent;
  border-top: 8px solid white;
  position: absolute;
  left: 50%;
  height: 1px;
  width: 1px;
  z-index: ${zIndex['mid']+10};
`

const TimeInput = ({ times, open, onClick, value, longestValue, inProp, partId, checked, submitRef, handleSubmit }) => (

  <TetherComponent
          style={{zIndex: 200}}
          attachment="top center"
          constraints={[{
            to: 'scrollParent',
            pin: true},{
            to: 'scrollParent',
            attachment: 'together'
          }]}>
          { /* First child: This is what the item will be tethered to */}
          <DropDown open={open} onClick={onClick} value={value} longestValue={longestValue}/>
          { /* Second child: If present, this item will be tethered to the the first child */}
          { open &&
            <Transition in={inProp} timeout={{enter: 0, exit: duration}}>
              {(state) => (
                <RadioBlock style={{...radioBlockDefaultStyle, ...radioBlockTransitionStyles[state]}}>
                  <Arrow className="popoverArrowTop" fromLeft={131}/>
                  <RadioGroup options={times} name={"time"} partId={partId} checked={checked} submitRef={submitRef} handleSubmit={handleSubmit}/>
                  <Arrow className="popoverArrowBottom" fromLeft={131}/>
                </RadioBlock>
              )}
            </Transition>
          }
        </TetherComponent>
)

const QuantityInput = ({ quantities, open, onClick, value, longestValue, inProp, partId, checked, submitRef, handleSubmit }) => (
  <TetherComponent
          style={{zIndex: 200}}
          attachment="top center"
          constraints={[{
            to: 'window',
            attachment: 'together'
          }]}>
          { /* First child: This is what the item will be tethered to */}
          <DropDown open={open} onClick={onClick} value={value} longestValue={longestValue}/>
          { /* Second child: If present, this item will be tethered to the the first child */}
          { open &&
            <Transition in={inProp} timeout={{enter: 0, exit: duration}}>
              {(state) => (
                <RadioBlock style={{...radioBlockDefaultStyle, ...radioBlockTransitionStyles[state]}}>
                  <Arrow className="popoverArrowTop" fromLeft={131}/>
<RadioGroup options={quantities} name={"quantity"} partId={partId} checked={checked} submitRef={submitRef} handleSubmit={handleSubmit}/>
                  <Arrow className="popoverArrowBottom" fromLeft={131}/>
                </RadioBlock>
              )}
            </Transition>
          }
        </TetherComponent>
)

// CUSTOM SCREEN-BOUND SCRIM USED TO CATCH CLICK EVENTS OUTSIDE OF THE MODAL/INPUT BEING HOISTED BY THE SCRIM.

const ScreenFillScrim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity ${duration*0.8}ms ease;
  background-color: #f3f3f3;
  z-index:  d${zIndex.low};
`;

const ScreenFill = ({ inProp, partId, scrimOpacity, onClick }) => (
  <Transition appear={true} in={inProp} timeout={{ enter: 0, exit: duration }}>
    {(state) => (
      <ScreenFillScrim style={{...screenFillDefaultStyle, ...screenFillTransitionStyles[state]}} key={partId} onClick={onClick}/>
    )}
  </Transition>
)

// CONTAINS THE DROPDOWNS

const ControlRow = styled.div`
  text-align: right;
  margin-bottom: 16px;
`

class PartListCard extends React.Component {
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
      <ListCardItem onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <React.Fragment>
            <ScreenFill inProp={ quantityOpen || timeOpen } partId={part.id} scrimOpacity={scrimOpacity} onClick={()=>{onScrimClick(this)}}/>
          </React.Fragment>
            { (displayLoader === true) ? <CardFill><Loader></Loader></CardFill> : null }
        <ListCardPart ref={(ref)=>this.popoverBoundary = ref} id={part.partId+"bounds"}>
          <PartPreview hover={hover} image={image} hoverOverlayEnabled={hoverOverlayEnabled} part={part}/>
          <ListCardLeft>
            <PartName>{part.partNumber}</PartName>
            <GreyDetail>{materialAndMachineTypes}</GreyDetail>
            <GreyDetail>{secondaryProcesses}</GreyDetail>
          </ListCardLeft>
          <PartListCardPrice gridArea={'pricing'} prices={prices(part.prices,priceScale)} hover={hover} loading={loading} priceAffix={ (this.props.priceDisplay === "unit") ? "ea" : "/ " + selectedQuantity.display }/>
          <ListCardRight>
            <ControlRow>
              <QuantityInput open={quantityOpen} onClick={handleQuantityClick} value={this.props.selectedQuantity.display} longestValue={quantities.slice(-1)[0].display} inProp={quantityOpen} partId={part.id} checked={this.props.selectedQuantity} submitRef={submitRef} handleSubmit={handleQuantityChange} quantities={quantities}/>
              <div style={{display: 'inline-block', width: '8px'}}/>
              <TimeInput open={timeOpen} onClick={handleTimeClick} value={this.props.selectedTime.display} longestValue={times.slice(-1)[0].display} inProp={timeOpen} partId={part.id} checked={this.props.selectedTime} submitRef={submitRef} handleSubmit={handleTimeChange} times={times}/>
            </ControlRow>
            <Button type="default">Add to Estimate</Button>
          </ListCardRight>
        </ListCardPart>
      </ListCardItem>
    )
  }
}
PartListCard.propTypes = {
  part: PropTypes.object,
  image: PropTypes.string,
  priceDisplay: PropTypes.oneOf(["unit", "quantity"])
}

export default PartListCard;
