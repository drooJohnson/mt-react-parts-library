import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VerticalRule from '../components/vertical-rule';
import ListGridSwitch from './list-grid-switch';
import Pagination from '../components/pagination';

const ActionBarWrapper = styled.div`
  width:100%;
  min-height:50px;
  background-color:#ffffff;
  border-left: 8px solid #000000;
  padding:12px;
  position:relative;
  box-shadow:0 1px 2px rgba(0,0,0,0.1);
  grid-area: ${props => props.gridarea || ''};
  display:flex;
  justify-content:flex-start;
  align-items:stretch;
`

const Title = styled.div`
  font-weight:600;
  letter-spacing:1px;
  align-self:center;
  padding-top:1px;
`

class PartsActionBar extends React.Component {
  render(){
    return (
      <ActionBarWrapper gridarea={this.props.gridarea}>
        <Title>ALL PARTS</Title>
        <Pagination style={{marginLeft:'auto'}}/>
        <VerticalRule/>
        <ListGridSwitch active={this.props.active}/>
      </ActionBarWrapper>
    )
  }
}

export default PartsActionBar
