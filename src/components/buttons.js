import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const nature = {
  default:{
    borderColor: 'rgba(0,0,0,0.15)',
    backgroundColor: '#F7F7F7',
    backgroundImage: 'linear-gradient(-180deg,#fdfdfd 2%,#f7f7f7 97%);',
    textColor: '#333333',
  },
  primary:{
    borderColor: 'rgba(0,0,0,0.15)',
    backgroundColor: '#4eeeb9',
    backgroundImage: 'linear-gradient(-180deg,#5df7c4 6%,#4eeeb9 96%);',
    textColor: '#000000',
  },
  caution:{
    borderColor: '#e69900',
    backgroundColor: '#FFAA00',
    backgroundImage: 'linear-gradient(-180deg,#5df7c4 6%,#4eeeb9 96%);',
    textColor: '#FFFFFF',
  },
  error:{
    borderColor: 'rgba(0,0,0,0.15)',
    backgroundColor: '#00AAFF',
    backgroundImage: 'linear-gradient(-180deg,#5df7c4 6%,#4eeeb9 96%);',
    textColor: '#FFFFFF',
  },
  info:{
    borderColor: 'rgba(0,0,0,0.15)',
    backgroundColor: '#2196f3',
    backgroundImage: 'linear-gradient(-180deg,#34a2f9 2%,#2196f3 96%);',
    textColor: '#FFFFFF',
  },
  success:{
    borderColor: 'rgba(0,0,0,0.15)',
    backgroundColor: '#4eeeb9',
    backgroundImage: 'linear-gradient(-180deg,#5df7c4 6%,#4eeeb9 96%);',
    textColor: '#000000',
  }
}

const width = {
  full:'100%',
  block:'100%',
  fullwidth:'100%',
  stretch:'100%',
}

const ButtonBase = styled.button.attrs({
  onClick: props => props.onClick,
  nature: props => props.nature,
  width: props => props.width,
})`
  font-family:proxima nova;
  font-weight:600;
  font-size:12px;
  -webkit-appearance:none;
  background-color:#00e7b2;
  padding:8px 12px;
  border:solid 1px #00e7b2;
  border-radius: 2px;
  width:${props => props.width ? width[props.width] : 'auto' };
  justify-content:center;
  /* Adapt Colors based on badge type prop */
  background-color: ${props => props.nature ? nature[props.nature].backgroundColor : '#FFFFFF'};
  background-image: ${props => props.nature ? nature[props.nature].backgroundImage : 'none'};
  border-color: ${props => props.nature ? nature[props.nature].borderColor : 'none'};
  color: ${props => props.nature ? nature[props.nature].textColor : '#000000'};
  display:inline-flex;
  &+&{
    margin-left:4px;
  }
`

const Button = ({nature, onClick, width, children}) => (
  <ButtonBase nature={nature} onClick={()=>{onClick()}} width={width}>{children}</ButtonBase>
)

Button.propTypes = {
  nature: PropTypes.oneOf(['default','primary','caution','error','info','success']),
  onClick: PropTypes.func,
}

export default Button
