import React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import zIndex from '../components/utils/z-index';
import { connect } from 'react-redux';

// eslint-disable-next-line
import { TESTING_MODAL } from '../constants/ModalTypes';

const DropDownBox = styled.span`
  cursor:pointer;
  height:28px;
  padding:8px;
  border:1px solid #C6C6C6;
  background-color:#FFFFFF;
  border-radius:2px;
  display:inline-flex;
  justify-content:space-between;
  align-items:center;
  position:relative;
  transition:${props => props.open ? 'box-shadow 150ms ease, z-index 0ms 0ms ease' : 'box-shadow 150ms ease, z-index 0ms 300ms ease' };
  & + &{
    margin-left:8px;
  }
  &:hover,&:focus{
    box-shadow:0 0 2px 0 #00e7b2;
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
        <DropDownBox onClick={()=>{this.props.onClick();this.props.scrimToggle(this);}} {... this.state} open={this.props.open} style={{zIndex: this.props.open ? zIndex['low'] : '0'}}>
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
      if (ref.state.open === false) {
        ref.setState({open:true})
      } else {
        dispatch({type: 'HIDE_SCRIM'});
        ref.setState({open:false});
      }
    },
    onScrimClick: (ref) => {
      dispatch({type: 'HIDE_SCRIM'});
      ref.setState({open:false});
    }
  })
)(DropDown);
