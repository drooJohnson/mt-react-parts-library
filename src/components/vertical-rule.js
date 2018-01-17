import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const VerticalRule = styled.div`
  content: "";
  background-color: ${props => props.color || '#cccccc'};
  width: 1px;
  right: -15px;
  bottom: 4px;
  top: 4px;
  margin-left: 16px;
  margin-right: 16px;
  margin-top:${props => props.verticalMargin || '0'};
  margin-bottom:${props => props.verticalMargin || '0'};
`

export default VerticalRule;
