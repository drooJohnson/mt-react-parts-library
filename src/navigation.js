import React from 'react';
import styled from 'styled-components';
import VerticalRule from './components/vertical-rule';
import { NavLink as RouterNavLink, Link as RouterLink } from 'react-router-dom';
import UserDropdown from './components/navigation/user-dropdown';
import { connect } from 'react-redux';
import { compose } from 'redux';
import zIndex from './utils/z-index';
import Row from './layout/row';

// COMPONENTS ASSUME THEIR OWN NAME AS THEIR GRID-AREA VALUE UNLESS EXPLICITLY ASSIGNED OTHERWISE!

const Nav = styled.nav.attrs({
  gridarea: props => props.gridarea || 'navigation',
})`
  background-color: #313236;
  height: 70px;
  width: 100%;
  display:flex;
  justify-content:space-between;
  align-items:stretch;
  color: white;
  position:relative;
  z-index:${zIndex['mid']};
  grid-area: ${props => props.gridarea || 'navigation'};
  ul{
    margin:0 0 0 0;
    display: flex;
    padding:0;
  }
`

const Link = styled(RouterNavLink)`
  transition: all 300ms ease;
  display:inline-block;
  min-width:100px;
  height:100%;
  line-height:70px;
  text-align:center;
  padding:0 24px;
  font-weight:bold;
  text-decoration:none;
  &:hover{
    background-color: #3d3d3d;
  }
  background-color:none;
  color:#bbbbbb;
  &.active{
    background-color:#3d3d3d;
    color:#00e7b2;
  }
`

const DisabledLink = styled.li`
  transition: all 300ms ease;
  display:inline-block;
  min-width:100px;
  height:100%;
  line-height:70px;
  text-align:center;
  padding:0 24px;
  font-weight:bold;
  text-decoration:none;
  &:hover{
    background-color: #3d3d3d;
  }
  background-color:none;
  color:#bbbbbb;
`

const LinkList = styled.ul`
  list-style:none;
  margin:0;
  padding:0;
`

const LogoLink = styled(RouterLink)`
  display:block;
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

const Logo = () => (
  <LogoLink to={{pathname:'/'}}>
    <LogoImg src="../logo.png"/>
  </LogoLink>
)

class Navigation extends React.Component {
  render(){
    return (
      <Nav gridArea={this.props.gridArea}>
        <Row>
          <Logo/>
          <LinkList style={{marginLeft:0,marginRight:'auto'}}>
            <Link to="/parts">Parts</Link>
            <DisabledLink>Estimates</DisabledLink>
            <DisabledLink>Orders</DisabledLink>
          </LinkList>
          <LinkList>
            <UserDropdown name={this.props.store.username}/>
            <VerticalRule verticalMargin="10px" color="#4a4a4a" style={{marginRight:0}}/>
            <DisabledLink>Estimate</DisabledLink>
          </LinkList>
        </Row>
      </Nav>
    )
  }
}

Navigation.defaultProps = {
  gridArea:'navigation'
}

export default compose(
  connect(
    (state, props) =>
      ({
        store: state.store
      })
  )
)(Navigation)
