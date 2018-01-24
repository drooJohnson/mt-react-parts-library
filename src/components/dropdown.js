import React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import zIndex from '../utils/z-index.js';

import { connect } from 'react-redux';

// eslint-disable-next-line
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
        <DropDownBox onClick={()=>{this.props.onClick();this.props.scrimToggle(this);}} {... this.state} style={{zIndex: this.state.open ? zIndex['mid'] : '0'}}>
          <Value>{this.props.value}</Value>
          <FontAwesomeIcon icon={faAngleDown}/>
        </DropDownBox>
        { this.state.open ? <ScrimClone onClick={()=>{this.props.onClick();this.props.onScrimClick(this);}}{...this.state}/> : null }
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  (dispatch) => ({
    scrimToggle: (ref) => {
      console.log("onclick");
      console.log(ref);
      if (ref.state.open === false) {
        console.log(ref.state.open);
        dispatch({type: 'SHOW_SCRIM', scrim:{
          color:'light',
          opacity:0.7,
          zIndex:'low'
        }})
        ref.setState({open:true})
      } else {
        console.log(ref.state.open);
        dispatch({type: 'HIDE_SCRIM'})
        ref.setState({open:false});
      }
    },
    onScrimClick: (ref) => {
      dispatch({type: 'HIDE_SCRIM'})
      ref.setState({open:false});
    }
  })
)(DropDown);
