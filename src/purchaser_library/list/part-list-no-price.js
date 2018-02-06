import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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

const PartListNoPrice = ({ gridArea, hover, loading }) => {
	return(
		<Wrapper gridArea={gridArea} loading={loading} hover={hover}>
			<GreyText>PREDICTED PRICE<br/>NOT AVAILABLE</GreyText>
			<BlueLink>Why?</BlueLink>
			<Chart hover={hover}/>
		</Wrapper>
	)}

PartListNoPrice.propTypes = {
	gridArea: PropTypes.string,
	hover: PropTypes.bool,
	loading: PropTypes.bool,
}

export default PartListNoPrice
