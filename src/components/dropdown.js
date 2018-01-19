import React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import zIndex from '../utils/z-index.js';

import { connect } from 'react-redux';

import { TESTING_MODAL } from '../constants/ModalTypes';

const DropDownBox = styled.span`
  height:28px;
  padding:8px;
  border:1px solid #C6C6C6;
  background-color:#FFFFFF;
  border-radius:2px;
  display:inline-flex;
  justify-content:space-between;
  align-items:center;
  position:relative;
  & + &{
    margin-left:8px;
  }
`

const Value = styled.span`
  font-size:12px;
  font-weight:500;
  margin-right:12px;
`

const ScrimClone = styled.span`
  position:fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  z-index: ${zIndex['low']+1};
`

class ScrimSurrogate extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return this.props.open ? <ScrimClone onClick/> : null
  }
}

class DropDown extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open:false
    };
  }
  render(){
    return(
      <React.Fragment>
        <DropDownBox onClick={()=>{this.props.onClick(this)}} {... this.state} style={{zIndex: this.state.open ? zIndex['mid'] : '0'}}>
          <Value>{this.props.value}</Value>
          <FontAwesomeIcon icon={faAngleDown}/>
        </DropDownBox>
        { this.state.open ? <ScrimClone onClick={()=>{this.props.onScrimClick(this)}}{...this.state}/> : null }
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  (dispatch) => ({
    onClick: (ref) => {
      dispatch({type: 'SHOW_SCRIM', scrim:{
        color:'dark',
        opacity:0.5,
        zIndex:'low'
      }})
      ref.setState({open:true})
    },
    onScrimClick: (ref) => {
      dispatch({type: 'HIDE_SCRIM'})
      ref.setState({open:false});
    }
  })
)(DropDown);
