import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import colors from '../utils/colors';
import gradients from '../utils/gradients';


const brandColor = {colors.teal};
const successColor = {colors.green};
const darkColor = {colors.greyDarkest};
const lightColor = {colors.greyLightest};
const infoColor = {colors.blue};
const warningColor = {colors.yellow};
const errorColor = {colors.red};

const type = {
  brand:{
    ghostBorderColor: '#3ed1a7',
    backgroundColor: brandColor,
    backgroundImage: gradients.brand,
    textColor: '#FFFFFF',
    fontSmoothing: 'subpixel-antialiased',
  },
  dark:{
    ghostBorderColor: '#3ed1a7',
    backgroundColor: darkColor,
    backgroundImage: gradients.dark,
    textColor: '#FFFFFF',
    fontSmoothing: 'subpixel-antialiased',
  },
  primary:{
    ghostBorderColor: '#3ed1a7',
    backgroundColor: infoColor,
    backgroundImage: gradients.info,
    textColor: '#FFFFFF',
    fontSmoothing: 'subpixel-antialiased',
  },
  info:{
    ghostBorderColor: '#3ed1a7',
    backgroundColor: infoColor,
    backgroundImage: gradients.info,
    textColor: '#FFFFFF',
    fontSmoothing: 'subpixel-antialiased',
  },
  default:{
    ghostBorderColor: '#3ed1a7',
    backgroundColor: lightColor,
    backgroundImage: gradients.light,
    textColor: '#333333',
    fontSmoothing: 'antialiased',
  },
  warning:{
    ghostBorderColor: '#3ed1a7',
    backgroundColor: warningColor,
    backgroundImage: gradients.warning,
    textColor: '#333333',
    fontSmoothing: 'antialiased',
  },
  error:{
    ghostBorderColor: '#3ed1a7',
    backgroundColor: errorColor,
    backgroundImage: gradients.error,
    textColor: '#FFFFFF',
    fontSmoothing: 'subpixel-antialiased',
  },
  success:{
    ghostBorderColor: '#3ed1a7',
    backgroundColor: successColor,
    backgroundImage: gradients.success,
    textColor: '#333333',
    fontSmoothing: 'antialiased',
  },
}

const width = {
  full:'100%',
  block:'100%',
  fullwidth:'100%',
  stretch:'100%',
}

const size = {
  micro:{
    height:'28px',
    letterSpacing:'0',
    fontSize:'12px',
    padding:'6px 8px'
  },
  small:{
    height:'32px',
    letterSpacing:'-0.1px',
    fontSize:'12px',
    padding:'8px 12px'
  },
  medium:{
    height:'36px',
    letterSpacing:'-0.2px',
    fontSize:'16px',
    padding:'8px 14px'
  },
  large:{
    height:'46px',
    letterSpacing:'-0.3px',
    fontSize:'18px',
    padding:'12px 18px'
  }
}

const ButtonBase = styled.button.attrs({
  onClick: props => props.onClick,
  type: props => props.type,
  width: props => props.width,
  size: props => props.size,
})`
  cursor:pointer;
  font-family:proxima nova;
  font-weight:600;
  -webkit-appearance:none;
  border:solid 1px rgba(0,0,0,0.15);
  border-radius: 2px;
  display:inline-flex;
  justify-content:center;
  /* Adapt width based on width prop */
  width:${props => props.width ? width[props.width] : 'auto' };
  /* Adapt Colors based on badge type prop */
  background-color: ${props => props.type ? type[props.type].backgroundColor.base : '#FFFFFF'};
  background-image: ${props => props.type ? type[props.type].backgroundImage : 'none'};
  color: ${props => props.type ? type[props.type].textColor : '#000000'};
  font-smoothing: ${props => props.type ? type[props.type].fontSmoothing : 'antialiased' };
  /* Adapt Sizing based on size prop */
  height: ${props => props.size ? size[props.size].height : size.small.height };
  padding: ${props => props.size ? size[props.size].padding : size.small.padding };
  letter-spacing: ${props => props.size ? size[props.size].letterSpacing : size.small.letterSpacing };
  font-size: ${props => props.size ? size[props.size].fontSize : size.small.fontSize };
  &+&{
    margin-left:4px;
  }
  &:focus{
    background-image:none;
    background-color: ${props => props.type ? type[props.type].backgroundColor.active : '#FFFFFF'};
    outline:none;
  }
  &:hover{
    background-image:none;
    background-color: ${props => props.type ? type[props.type].backgroundColor.hover : '#FFFFFF'};
  }
  &:active{
    background-image:none;
    background-color: ${props => props.type ? type[props.type].backgroundColor.active : '#FFFFFF'};
  }
`

const GhostButtonBase = styled.button.attrs({
  onClick: props => props.onClick,
  type: props => props.type,
  width: props => props.width,
  size: props => props.size,
})`
  cursor:pointer;
  font-family:proxima nova;
  font-weight:600;
  -webkit-appearance:none;
  border:solid 1px ${props => props.type ? type[props.type].ghostBorderColor : 'rgba(0,0,0,0.15)'};
  border-radius: 2px;
  display:inline-flex;
  justify-content:center;

  /* Adapt width based on width prop */
  width:${props => props.width ? width[props.width] : 'auto' };

  /* Adapt Colors based on badge type prop */
  background-color: transparent;
  background-image: none;
  color: #333333;
  font-smoothing: antialiased;

  /* Adapt Sizing based on size prop */
  height: ${props => props.size ? size[props.size].height : size.small.height };
  padding: ${props => props.size ? size[props.size].padding : size.small.padding };
  letter-spacing: ${props => props.size ? size[props.size].letterSpacing : size.small.letterSpacing };
  font-size: ${props => props.size ? size[props.size].fontSize : size.small.fontSize };
  &+&{
    margin-left:4px;
  }
  &:focus{
    background-image:none;
    background-color: ${props => props.type ? type[props.type].backgroundColor.active : '#FFFFFF'};
    outline:none;
  }
  &:hover{
    background-image:none;
    background-color: ${props => props.type ? type[props.type].backgroundColor.hover : '#FFFFFF'};
  }
  &:active{
    background-image:none;
    background-color: ${props => props.type ? type[props.type].backgroundColor.active : '#FFFFFF'};
  }
`

const Button = ({type, onClick, width, size, style, children}) => (
  { (style === 'ghost') ?
    <GhostButtonBase type={type} onClick={()=>{onClick()}} width={width} size={size}>{children}</GhostButtonBase>
    :
    <ButtonBase type={type} onClick={()=>{onClick()}} width={width} size={size}>{children}</ButtonBase>
  }
)

Button.propTypes = {
  type: PropTypes.oneOf(['brand','dark','primary','info','default','warning','error','success']),
  width: PropTypes.oneOf(['full','block','fullwidth','stretch'])
  size: PropTypes.oneOf(['micro','small','medium','large']),
  style: PropTypes.oneOf(['ghost']),
  onClick: PropTypes.func,
}

export default Button
