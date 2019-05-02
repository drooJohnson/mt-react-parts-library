import React from 'react'
import PropTypes from 'prop-types'

import DropDown from '../../components/dropdown'

import {keyframes} from 'styled-components'
import styled from 'styled-components'
import Button from '../../components/buttons'
import RadioGroup from '../../components/radios/radio-group'
import PartListCardPrice from './part-list-card-price'
import PartListNoPrice from './part-list-no-price'
import PartPreview from './list-part-preview'
import zIndex from '../../components/utils/z-index'
import { Link } from 'react-router-dom'

import Loader from './list-card-loader'
import { Transition } from 'react-transition-group'
import TetherComponent from 'react-tether'

// Timing variables

let duration = 300

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
	display: 'block',
}

let radioBlockEntrance = keyframes`
	0%{
		display:flex;
		transform:translateY(-10px)  translateZ(0) scale(0.95);
		opacity:0.0;
	}
	100%{
		display:flex;
		transform:translateY(0px)  translateZ(0);
		opacity:1.0;
	}
`

let radioBlockExit = keyframes`
	0%{
		display:flex;
		transform:translateY(0px)  translateZ(0);
		opacity:1.0;
	}
	100%{
		display:flex;
		transform:translateY(-10px)  translateZ(0) scale(0.95);
		opacity:0.0;
	}
`

let radioBlockTransitionStyles = {
	entering: { animation:`${radioBlockEntrance} ${duration}ms ease 0s 1 normal both`, display:'flex' },
	entered:  { display: 'flex', opacity:'1.0' },
	exiting:  { animation:`${radioBlockExit} ${duration}ms ease 0s 1 normal both`, display:'flex' },
	exited:   { display:'none' },
}

let listCardEnter = keyframes`
	0%{
		transform:scale(0.95);
		opacity:0.0;
	}
	99%{
		transform:scale(1.0);
		opacity:1.0;
	}
	100%{
		transform:none;
	}
`
// Presentational Components

const listCardItemTransitionStyles = (state) => {
	switch(state){
		case 'entering':
			return { opacity: 0.0 }
		case 'entered':
			return { animation: `${listCardEnter} 300ms ease 0ms 1 normal backwards` }
		default:
			return
	}
}

const ListCardItem = styled.div`
	width: 100%;
	position: relative;
	grid-column: span 3;
	transform: none;
`

const ListCard = styled.div`
	background-color: white;
	max-height: 108px;
	box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
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
	display: flex;
	flex-direction: column;
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

// Price Feedback Link

const BlueLink = styled.a`
	font-size: 11px;
	color: #4a90e2;
	text-decoration: underline;
	cursor: pointer;
`

const GreyText = styled.span`
	font-size: 12px;
	color: #333333;
`

const PriceFeedback = styled.div`
	display: block;
	margin-top: auto;
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

// CUSTOM SELECT POPOVERS

const RadioBlock = styled.div`
	padding: 16px 12px;
	background-color: white;
	z-index: ${zIndex['mid']};
	border-radius: 2px;
	opacity: 1.0;
	max-width: 268px;
	filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
	animation-fill-mode:both;
	position:relative;
`

const RadioBlockWrapper = styled.div`
	display:flex;
	flex-direction:column;
	align-items:center;
	justify-content:center;
`

const Arrow = styled.div`
	content: '';
	display: block;
	border: 8px solid transparent;
	left: 50%;
	z-index: ${zIndex['mid']+10};
`

const TimeInput = ({ times, open, onClick, value, longestValue, partId, checked, submitRef, handleSubmit }) => (

	<TetherComponent
		style={{zIndex: 200}}
		attachment="top center"
		targetAttachment="bottom center"
		constraints={[
			{
				to: 'scrollParent',
				pin: ['right','left']
			},
			{
				to: 'scrollParent',
				attachment: 'together'
			}
		]}>
		{ /* First child: This is what the item will be tethered to */}
		<DropDown open={open} onClick={onClick} value={value} longestValue={longestValue}/>
		{ /* Second child: If present, this item will be tethered to the the first child */}
		<Transition mountOnEnter={true} unmountOnExit={true} appear={false} in={open} timeout={{enter: 300, exit: duration}}>
			{(state) => (
				<RadioBlockWrapper className={'listRadioBlockWrapper'} style={{...radioBlockDefaultStyle, ...radioBlockTransitionStyles[state]}}>
					<Arrow className="popoverArrowTop"/>
					<RadioBlock className={'listRadioBlock'}>
						<RadioGroup options={times} name={'time'} partId={partId} checked={checked} submitRef={submitRef} handleSubmit={handleSubmit}/>
					</RadioBlock>
					<Arrow className="popoverArrowBottom"/>
				</RadioBlockWrapper>
			)}
		</Transition>
	</TetherComponent>
)

const QuantityInput = ({ quantities, open, onClick, value, longestValue, partId, checked, submitRef, handleSubmit }) => (
	<TetherComponent
		style={{zIndex: 200}}
		attachment="top center"
		targetAttachment="bottom center"
		constraints={[
			{
				to: 'scrollParent',
				pin: ['right','left']
			},
			{
				to: 'scrollParent',
				attachment: 'together'
			}
		]}>
		{ /* First child: This is what the item will be tethered to */}
		<DropDown open={open} onClick={onClick} value={value} longestValue={longestValue}/>
		{ /* Second child: If present, this item will be tethered to the the first child */ }
		<Transition mountOnEnter={true} unmountOnExit={true} appear={true} in={open} timeout={{enter: 300, exit: duration}}>
			{(state) => (
				<RadioBlockWrapper className={'listRadioBlockWrapper'} style={{...radioBlockDefaultStyle, ...radioBlockTransitionStyles[state]}}>
					<Arrow className="popoverArrowTop"/>
					<RadioBlock className={'listRadioBlock'}>
						<RadioGroup options={quantities} name={'quantity'} partId={partId} checked={checked} submitRef={submitRef} handleSubmit={handleSubmit}/>
					</RadioBlock>
					<Arrow className="popoverArrowBottom"/>
				</RadioBlockWrapper>
			)}
		</Transition>
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
	z-index: ${zIndex.low};
`

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
			quantityOpen, priceUnavailableOpen, selectedTime, selectedQuantity, handleTimeChange,
			handleQuantityChange, handleTimeClick, handleQuantityClick, handlePopoverClick, handlePopoverClose,
			onScrimClick, scrimOpacity, hover, hoverOverlayEnabled,
			materialAndMachineTypes, secondaryProcesses, prices, loading,
			priceDisplay, times, quantities, submitRef, staggerDelay
		} = this.props

		const priceScale = ( priceDisplay === 'quantity' ? selectedQuantity.value : 1 )
		return (
			<Transition appear={true} in={true} exit={false} timeout={{ enter: staggerDelay, exit: duration }}>
			{(state) => (
			<ListCardItem onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
				<React.Fragment>
					<ScreenFill inProp={ quantityOpen || timeOpen || priceUnavailableOpen } partId={part.id} scrimOpacity={scrimOpacity} onClick={()=>{onScrimClick(this)}}/>
				</React.Fragment>
				{ (displayLoader === true) ? <CardFill><Loader></Loader></CardFill> : null }
				<ListCardPart style={listCardItemTransitionStyles(state)} ref={(ref)=>this.popoverBoundary = ref} id={part.partId+'bounds'}>
					<PartPreview hover={hover} image={image} hoverOverlayEnabled={hoverOverlayEnabled} part={part}/>
					<ListCardLeft>
						<PartName>{part.partNumber}</PartName>
						<GreyDetail>{materialAndMachineTypes}</GreyDetail>
						<GreyDetail>{secondaryProcesses}</GreyDetail>
						{ part.pricingAvailable && <PriceFeedback hover={hover}>
							<BlueLink>Question about Predicted Price?</BlueLink><IntercomIcon src="../assets/icons/intercom.svg"/>
						</PriceFeedback> }
					</ListCardLeft>
					{
						part.pricingAvailable ?
							<PartListCardPrice gridArea={'pricing'} prices={prices(priceScale)} hover={hover} loading={loading} priceAffix={ (this.props.priceDisplay === 'unit') ? 'ea' : '/ ' + selectedQuantity.display }/>
							:
							<PartListNoPrice gridArea={'pricing'} open={priceUnavailableOpen} hover={hover} loading={loading} handlePopoverClose={handlePopoverClose} handlePopoverClick={handlePopoverClick}/>
					}
					<ListCardRight>
						{ part.pricingAvailable ?
							<ControlRow>
								<QuantityInput open={quantityOpen} onClick={handleQuantityClick} value={selectedQuantity.display} longestValue={quantities.slice(-1)[0].display} partId={part.id} checked={selectedQuantity} submitRef={submitRef} handleSubmit={handleQuantityChange} quantities={quantities}/>
								<div style={{display: 'inline-block', width: '8px'}}/>
								<TimeInput open={timeOpen} onClick={handleTimeClick} value={selectedTime.display} longestValue={times.slice(-1)[0].display} partId={part.id} checked={selectedTime} submitRef={submitRef} handleSubmit={handleTimeChange} times={times}/>
							</ControlRow>
							:
							<ControlRow style={{height:'28px',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
								<Link to={`/parts/${part.id}`}><BlueLink style={{fontSize:'12px'}}>Edit Part Details</BlueLink></Link><GreyText style={{marginLeft:'4px'}}>to get a price.</GreyText>
							</ControlRow>
						}
						<Button type="default">Add to Estimate</Button>
					</ListCardRight>
				</ListCardPart>
			</ListCardItem>
		)}
	</Transition>
		)
	}
}
PartListCard.propTypes = {
	part: PropTypes.object,
	image: PropTypes.string,
	priceDisplay: PropTypes.oneOf(['unit', 'quantity']),
	displayLoader: PropTypes.bool,
	handleMouseOver: PropTypes.func,
	handleMouseOut: PropTypes.func,
	timeOpen: PropTypes.bool,
	quantityOpen: PropTypes.bool,
	priceUnavailableOpen: PropTypes.bool,
	selectedTime: PropTypes.object,
	selectedQuantity: PropTypes.object,
	handleTimeChange: PropTypes.func,
	handleQuantityChange: PropTypes.func,
	handleTimeClick: PropTypes.func,
	handleQuantityClick: PropTypes.func,
	handlePopoverClick: PropTypes.func,
	handlePopoverClose: PropTypes.func,
	onScrimClick: PropTypes.func,
	scrimOpacity: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
	hover: PropTypes.bool,
	hoverOverlayEnabled: PropTypes.bool,
	materialAndMachineTypes: PropTypes.string,
	secondaryProcesses: PropTypes.string,
	prices: PropTypes.oneOfType([PropTypes.array,PropTypes.func]),
	loading: PropTypes.bool,
	times: PropTypes.array,
	quantities: PropTypes.array,
	submitRef: PropTypes.object,
}

export default PartListCard
