import React from 'react'
import PropTypes from 'prop-types'
import {keyframes} from 'styled-components'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'
import TetherComponent from 'react-tether'
import zIndex from '../../components/utils/z-index'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

let duration = 300;

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
	align-items: center;
`

const Chart = styled.div`
	background-image: url(../assets/chart_hover.svg);
	filter: ${props => !props.hover ? 'saturate(0.35) brightness(1.06)' : 'saturate(1) brightness(1.0)'};
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

const GreyText = styled.p`
	color:#999999;
	font-size:14px;
	line-height:17px;
	font-weight:600;
	margin-top:0;
	margin-bottom:0;
	text-align:center;
`

const BlueLink = styled.a`
	color:#4A90E2;
	font-size:12px;
	line-height:12px;
	text-decoration:underline;
	margin-top:8px;
	cursor: pointer;
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

let popoverBlockWrapperDefaultStyle = {
	opacity: 0.0,
	display: 'block',
}

let popoverBlockWrapperEntrance = keyframes`
	0%{
		display:flex;
		transform:translateY(10px)  translateZ(0) scale(0.95);
		opacity:0.0;
	}
	100%{
		display:flex;
		transform:translateY(0px)  translateZ(0);
		opacity:1.0;
	}
`

let popoverBlockWrapperExit = keyframes`
	0%{
		display:flex;
		transform:translateY(0px)  translateZ(0);
		opacity:1.0;
	}
	100%{
		display:flex;
		transform:translateY(10px)  translateZ(0) scale(0.95);
		opacity:0.0;
	}
`

let popoverBlockWrapperTransitionStyles = {
	entering: { animation:`${popoverBlockWrapperEntrance} ${duration}ms ease 0s 1 normal both`, display:'flex' },
	entered:  { display: 'flex', opacity:'1.0' },
	exiting:  { animation:`${popoverBlockWrapperExit} ${duration}ms ease 0s 1 normal both`, display:'flex' },
	exited:   { display:'none' },
}

const PopoverBlock = styled.div`
	padding: 8px;
	padding-left: 16px;
	background-color: white;
	z-index: ${zIndex['mid']};
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: opacity ${duration}ms ease, transform ${duration}ms ease;
	border-radius: 2px;
	opacity: 1.0;
	position: relative;
`

const PopoverBlockWrapper = styled.div`
	display:flex;
	flex-direction:column;
	align-items:center;
	justify-content:center;
	font-family:"Proxima Nova";
	max-width:240px;
	filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
`

const PopoverText = styled.p`
	color: #666666;
	font-size: 12px;
	line-height: 16px;
	margin-top:10px;
	margin-bottom:10px;
	margin-right:8px;
`

const CenterArrow = styled.div`
	content: '';
	display: block;
	border: 8px solid transparent;
	border-top: 8px solid white;
	height: 1px;
	width: 1px;
	z-index: ${zIndex['mid']+10};
`

const PopoverTrigger = ({ open, handlePopoverClick, handlePopoverClose, partId, children }) => (
	<TetherComponent
		style={{zIndex: 200}}
		attachment="bottom center"
		targetAttachment="top center"
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
		<BlueLink onClick={()=>{handlePopoverClick();}}>{children}</BlueLink>
		{ /* Second child: If present, this item will be tethered to the the first child */ }
		<Transition mountOnEnter={true} unmountOnExit={true} appear={true} in={open} timeout={{enter: 300, exit: duration}}>
			{(state) => (
				<PopoverBlockWrapper className='popoverBlockWrapper' style={{...popoverBlockWrapperDefaultStyle, ...popoverBlockWrapperTransitionStyles[state]}}>
					<CenterArrow className="popoverArrowTop"/>
					<PopoverBlock className={'listPopoverBlock'}>
						<CloseSVG style={{display:'block',marginLeft:'auto',marginRight:'0',cursor:'pointer'}} onClick={handlePopoverClose}/>
						<PopoverText>Predicted prices are not yet available for all parts. If you have completed your <Link style={{color:'#4a90e2',fontSize:'12px',lineHeight:'16px'}} to={`/parts/${partId}`}>part details</Link> and are still not able to see a predicted price, request an estimate and we'll send pricing as quickly as we can, typically under 24 hours.</PopoverText>
						<PriceFeedback hover={true}>
							<BlueLink style={{fontSize:'12px',textDecoration:'none'}}>Feel free to chat with us</BlueLink> <IntercomIcon src="../assets/icons/intercom.svg"/>
						</PriceFeedback>
					</PopoverBlock>
					<CenterArrow className="popoverArrowBottom"/>
				</PopoverBlockWrapper>
			)}
		</Transition>
	</TetherComponent>
)

const CloseSVG = ({style, onClick}) => (
<svg width="11px" height="12px" viewBox="0 0 11 12" style={style} onClick={onClick}>
    <g id="error" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="mt-part-index-LIST-ERROR-Copy" transform="translate(-1045.000000, -287.000000)" fill="#999999">
            <g id="Group-3" transform="translate(830.000000, 278.000000)">
                <g id="Group-6" transform="translate(215.000000, 9.000000)">
                    <rect id="Rectangle-4" transform="translate(5.500000, 6.000000) rotate(45.000000) translate(-5.500000, -6.000000) " x="5" y="-1" width="1" height="14"></rect>
                    <rect id="Rectangle-4-Copy" transform="translate(5.500000, 6.000000) rotate(-45.000000) translate(-5.500000, -6.000000) " x="5" y="-1" width="1" height="14"></rect>
                </g>
            </g>
        </g>
    </g>
</svg>
)

const ScrimClone = styled.span`
  position:fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  z-index: ${zIndex['low']+1};
`

class PartListNoPrice extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			open: false,
		}
	}
	render(){
		let {open, hover, loading, handlePopoverClick, handlePopoverClose} = this.props;
		return(
			<React.Fragment>
			<Wrapper loading={loading} hover={hover}>
				<GreyText>REQUEST ESTIMATE<br/>FOR PRICING</GreyText>
				<PopoverTrigger open={open} handlePopoverClose={handlePopoverClose} handlePopoverClick={()=>{handlePopoverClick();this.props.scrimToggle(this);}}>Why?</PopoverTrigger>
				<Chart hover={hover}/>
			</Wrapper>
			{ open && <ScrimClone id="scrimClone" onClick={()=>{handlePopoverClick();this.props.onScrimClick(this);}} {...this.state}/> }
			</React.Fragment>
	)
}
}
PartListNoPrice.propTypes = {
	hover: PropTypes.bool,
	loading: PropTypes.bool,
	open: PropTypes.bool,
	handlePopoverClick: PropTypes.func,
	handPopoverClose: PropTypes.func
}

export default connect(
  null,
  (dispatch) => ({
    scrimToggle: (ref) => {
      if (ref.state.open === false) {
        ref.setState({open:true})
      } else {
        dispatch({type: 'HIDE_SCRIM'});
        ref.setState({open:false});
      }
    },
    onScrimClick: (ref) => {
      dispatch({type: 'HIDE_SCRIM'});
      ref.setState({open:false});
    }
  })
)(PartListNoPrice);
