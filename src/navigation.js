import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {NavLink as RouterNavLink, Link as RouterLink} from 'react-router-dom';

import Row from './layout/row';
import Col from './layout/col';

// COMPONENTS ASSUME THEIR OWN NAME AS THEIR GRID-AREA VALUE UNLESS EXPLICITLY ASSIGNED OTHERWISE!

const Nav = styled.nav.attrs({
  gridarea: props => props.gridarea || 'navigation',
})`
  background-color: #333333;
  height: 70px;
  width: 100%;
  display:flex;
  justify-content:space-between;
  align-items:stretch;
  color: white;
  grid-area: ${props => props.gridarea || 'navigation'};
  ul{
    margin:0 0 0 0;
    display: flex;
    padding:0;
  }
`

const Link = styled(RouterNavLink)`
  display:inline-block;
  min-width:100px;
  height:100%;
  line-height:70px;
  text-align:center;
  padding:0 24px;
  font-weight:bold;
  text-decoration:none;
  &:hover{
    background-color: #666666;
    color: #00e7b2;
  }
  background-color: ${props => props.active ? '#666666' : 'none' };
  color: ${props => props.active ? '#00e7b2' : '#bbbbbb' };
  &.active{
    background-color:#00FFAA;
  }
`

const LinkList = styled.ul`
  list-style:none;
  margin:0;
  padding:0;
`

const LogoLink = styled.div`
  margin: 12px 20px 12px 0;
  width: 46px;
`

const LogoImg = styled.img`
  width:100%;
  border-style:none;
  vertical-align:top;
  outline:none;
  height:auto;
`

const Logo = () => <LogoLink><LogoImg src="logo.png"/></LogoLink>;

class Navigation extends React.Component {
  constructor(){
    super();
  }
  render(){
    return (
      <Nav gridArea={this.props.gridArea}>
        <Row>
          <Logo/>
          <LinkList style={{marginLeft:0,marginRight:'auto'}}>
            <Link to="/parts">Parts</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/machines">Machines</Link>
          </LinkList>
          <LinkList>
            <Link to="/profile">Shop</Link>
            <Link to="/estimate">Estimate</Link>
          </LinkList>
        </Row>
      </Nav>
    )
  }
}

Navigation.defaultProps = {
  gridArea:'navigation'
}

export default Navigation
