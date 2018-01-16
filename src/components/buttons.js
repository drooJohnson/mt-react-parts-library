import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const buttons = {
  default:{
    borderColor: 'rgba(0,0,0,0.15)',
    backgroundColor: '#F7F7F7',
    backgroundImage: 'linear-gradient(-180deg,#fdfdfd 2%,#f7f7f7 97%);',
    textColor: '#000000',
  },
  primary:{
    borderColor: 'rgba(0,0,0,0.15)',
    backgroundColor: '#00AAFF',
    backgroundImage: 'linear-gradient(-180deg,#5df7c4 6%,#4eeeb9 96%);',
    textColor: '#FFFFFF',
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

const Button = styled.button`
  font-family:proxima nova;
  font-weight:600;
  font-size:12px;
  letter-spacing:0.5px;
  -webkit-appearance:none;
  background-color:#00e7b2;
  padding:8px 12px;
  border:solid 1px #00e7b2;
  border-radius: 2px;
  /* Adapt Colors based on badge type prop */
  background-color: ${props => props.nature ? buttons[props.nature].backgroundColor : '#FFFFFF'};
  background-image: ${props => props.nature ? buttons[props.nature].backgroundImage : 'none'};
  border-color: ${props => props.nature ? buttons[props.nature].borderColor : 'none'};
  color: ${props => props.nature ? buttons[props.nature].textColor : '#000000'};
  display:inline-flex;
  &+&{
    margin-left:4px;
  }
`

Button.propTypes = {
  nature: PropTypes.oneOf(['primary','caution','error','info','success'])
}

export default Button
