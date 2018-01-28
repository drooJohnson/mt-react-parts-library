import React from 'react';
import PropTypes from 'prop-types';

import DropDown from '../components/dropdown';
import Select from '../components/select';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/buttons';
import PopoverWrapper from '../components/popovers/popover-wrapper';
import RadioGroup from '../components/radios/radio-group';

const ControlBlock = styled.div`
  padding:16px 8px;
  background-color:white;
  margin-bottom:107px;
  z-index:500;
  box-shadow:0 2px 12px rgba(0,0,0,0.2);
  border-radius:2px;
`

class PartListCardControl extends React.Component{
  constructor(props){
    super(props);
  }
  controlContents = () => {
    let open = this.state.open;
    switch (open){
      case "quantity":

      case "time":

      default:
        return null
    }
  }
  render({open}){
    switch (open){
      case "quantity":
      case "time":
        return(<ControlBlock)
      default:
        return(<ControlBlock/>)
    }
    <ControlBlock>
      {this.controlContents()}
      <RadioGroup options={(this.state.open === "quantity") ? quantities : times } name={this.state.open} partId={part.id} checked={ (this.state.open === "quantity") ? this.state.quantity : this.state.time } handleChange={ (this.state.open === "quantity") ? this.handleQuantityChange : this.handleTimeChange }/>
    </ControlBlock>
  }
}

PartListCardControl.propTypes={
  open:PropTypes.string.isRequired;
}

export default PartListCardControl;
