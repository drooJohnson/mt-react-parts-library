import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {NavLink as RouterNavLink, Link as RouterLink} from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';

const UserDropdownWrapper = styled.a`
  display:flex;
  align-items:center;
`

const Avatar = styled.div`
  display:inline-flex;
  justify-content:center;
  align-items:center;
  vertical-align:middle;
  width:36px;
  height:36px;
  border-radius:100%;
  background:#464646;
  text-align:center;
  color:#fff;
  position:relative;
  font-weight:bold;
`

const UserName = styled.span`
  color:#bbbbbb;
  display:inline-block;
  vertical-align:middle;
  font-weight:bold;
  max-width:150px;
  margin-left:12px;
  margin-right:16px;
`

class UserDropdown extends React.Component {
  constructor(props){
    super(props);
  }
  nameToInitials = (name) => {
    return(
      name.split(" ").map((n)=>n[0]).join("")
    )
  }
  render(){
    return(
      <UserDropdownWrapper>
        <Avatar>{this.nameToInitials(this.props.name)}</Avatar>
        <UserName>{this.props.name}</UserName>
        <FontAwesomeIcon icon={faAngleDown}/>
      </UserDropdownWrapper>
    )
  }
}

export default UserDropdown;
