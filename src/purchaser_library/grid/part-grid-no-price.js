import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import zIndex from '../../components/utils/z-index'

const Wrapper = styled.div`
	width: 100%;
	filter: ${props => props.hover ? 'contrast(1.0) brightness(1.0)' : 'contrast(0.5) brightness(1.3)'};
	background-size: cover;
	background-position: top center;
	padding-top: 24px;
	margin-bottom: 32px;
	transform: ${props => props.loading ? 'translateZ(0) scale(0.8)' : 'translateZ(0) scale(1.0)'};
	opacity: ${props => props.loading ? 0 : 1.0};
	transition: transform 400ms ease, opacity 400ms ease, filter 400ms ease;
	backface-visibility: hidden;
	text-align:center;
`

const Chart = styled.div`
	width: 100%;
	background-image: url(../assets/chart_hover.svg);
	filter: ${props => !props.hover ? 'saturate(0.35) brightness(1.06)' : 'brightness(1.0) saturate(1)'};
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

const GreyText = styled.p`
	color:#999999;
	font-size:14px;
	line-height:17px;
	font-weight:600;
	margin-top:0;
`

const BlueLink = styled.a`
	color:#4A90E2;
	font-size:12px;
	line-height:12px;
	text-decoration:underline;
	margin-top:8px;
	cursor: pointer;
`

const ScrimClone = styled.span`
  position:fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  z-index: ${zIndex['low']+1};
`

class PartGridNoPrice extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			open: false,
		}
	}
	render(){
		let {open, hover, loading, handlePopoverClick} = this.props
		return(
			<React.Fragment>
				<Wrapper loading={loading} hover={hover}>
					<GreyText>REQUEST ESTIMATE<br/>FOR PRICING</GreyText>
					<BlueLink onClick={()=>{handlePopoverClick();this.props.scrimToggle(this)}}>Why?</BlueLink>
					<Chart hover={hover}/>
				</Wrapper>
				{ open && <ScrimClone id="scrimClone" onClick={()=>{handlePopoverClick();this.props.onScrimClick(this)}} {...this.state}/> }
			</React.Fragment>
		)
	}
}
PartGridNoPrice.propTypes = {
	open: PropTypes.bool,
	hover: PropTypes.bool,
	loading: PropTypes.bool,
	handlePopoverClick: PropTypes.func
}

export default connect(
	null,
	(dispatch) => ({
		scrimToggle: (ref) => {
			if (ref.state.open === false) {
				ref.setState({open:true})
			} else {
				dispatch({type: 'HIDE_SCRIM'})
				ref.setState({open:false})
			}
		},
		onScrimClick: (ref) => {
			dispatch({type: 'HIDE_SCRIM'})
			ref.setState({open:false})
		}
	})
)(PartGridNoPrice)
