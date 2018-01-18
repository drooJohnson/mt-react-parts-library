import React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';

const DropDownBox = styled.span`
  height:28px;
  padding:8px;
  border:1px solid #C6C6C6;
  border-radius:2px;
  display:inline-flex;
  justify-content:space-between;
  align-items:center;
  &+&{
    margin-left:8px;
  }
`

const Value = styled.span`
  font-size:12px;
  font-weight:500;
  margin-right:12px;
`

const DropDown = (props) => (
  <DropDownBox>
    <Value>{props.value}</Value>
    <FontAwesomeIcon icon={faAngleDown}/>
  </DropDownBox>
)

export default DropDown;
