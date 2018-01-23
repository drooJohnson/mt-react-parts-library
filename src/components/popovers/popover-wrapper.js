import React from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
import { Manager, Target, Popper, Arrow } from 'react-popper';
import DropDown from '../dropdown';
import zIndex from '../../utils/z-index';

const Wrapper = (props) => (
  <div>{props.children}</div>
)

class PopoverWrapper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open:false
    };
    this.modifiers = {
      preventOverflow:{
        enabled:true,
        padding:32,
        priority:['left','right','top','bottom'],
        order:300,
        boundariesElement: document.getElementById(props.boundaryId)
      },
      offset:{
        enabled:true,
        offset:'16, 0',
      }
    }
  }
  handleClick = (e) => {
    console.log(e);
    console.log(this);
    if (this.state.open) {
      console.log("STATE IS OPEN");
      this.setState({open:false});
      console.log("NOW CLOSED");
    } else {
      console.log("STATE IS CLOSED");
      this.setState({open:true});
      console.log("NOW OPEN");
    }
  };

  render(){
    return(
      <Manager style={{display:"inline-block"}}>
      <Target style={{display:"inline-block"}}>
        <DropDown value={this.props.value} onClick={()=>{this.handleClick()}}/>
      </Target>
      {(()=>{
        if (this.state.open === true) {
          return(
            <Popper placement="top" className="popper" modifiers={this.modifiers} style={{zIndex:zIndex['mid']+1}}>
            {this.props.children}<Arrow className="popper__arrow"/>
            </Popper>
          )
        }
      })()}
    </Manager>
    )
  }
}

export default PopoverWrapper;
