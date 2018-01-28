import React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import zIndex from '../utils/z-index.js';
import { CSSTransitionGroup } from 'react-transition-group'
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
  position:absolute;
  font-size:12px;
  font-weight:500;
  margin-right:12px;
`

const BoxSizer = Value.extend`
  position:relative;
  visibility:hidden;
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
        <DropDownBox onClick={()=>{this.props.onClick();this.props.scrimToggle(this);}} {... this.state} open={this.props.open} style={{zIndex: this.props.open ? zIndex['mid'] : '0'}}>
          <Value>{this.props.value}</Value>
          <BoxSizer>{this.props.longestValue}</BoxSizer>
          <FontAwesomeIcon icon={faAngleDown}/>
        </DropDownBox>
        { this.props.open && <ScrimClone id="scrimClone" onClick={()=>{this.props.onClick();this.props.onScrimClick(this);}} {...this.state}/> }
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
        //dispatch({type: 'SHOW_SCRIM', scrim:{
        //  color:'light',
        //  opacity:0.7,
        //  zIndex:'low'
        //}});
        ref.setState({open:true})
        console.log(ref.state.open);
      } else {
        dispatch({type: 'HIDE_SCRIM'});
        ref.setState({open:false});
        console.log(ref.state.open);
      }
    },
    onScrimClick: (ref) => {
      dispatch({type: 'HIDE_SCRIM'});
      ref.setState({open:false});
    }
  })
)(DropDown);
