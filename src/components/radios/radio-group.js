import Styled from 'styled-components';
import React from 'react';
import {Radio} from './radio';
import PropTypes from 'prop-types';
import Button from '../buttons';


const RadioGroupGrid = Styled.div`
  display:grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 16px;
  grid-template-rows: auto;
  grid-template-areas: 'left right';
  align-items:center;
  button{
    padding:8px 20px;
    line-height:10px;
  }
`
const RadioGroupLeft = Styled.div`
  grid-area:left;
`
const RadioGroupRight = Styled.div`
  grid-area:right;
  text-align:right;
  padding-right:12px;
`

class RadioGroup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value:this.props.checked
    }
    this.originalValue = this.props.checked;
  }
  handleChange = (option) => {
    this.setState({value:option});
  }
  render(){
    let {options,name,partId,handleSubmit,checked,submitRef} = this.props;
    return(
      <div style={{position:'relative',zIndex:'200'}}>
        <RadioGroupGrid>
          <RadioGroupLeft>
            { options.map(
              (option,index)=>(
                <Radio key={index} name={name+partId} option={option} label={option.display} partId={partId} handleChange={()=>{this.handleChange(option)}} checked={this.state.value === option} original={this.originalValue === option}/>
              )
            ) }
          </RadioGroupLeft>
          <RadioGroupRight>
            <Button style={{padding:'8px 20px'}} nature="info" onClick={()=>{handleSubmit(this.state.value,this.originalValue,submitRef)}}>Apply</Button>
          </RadioGroupRight>
        </RadioGroupGrid>
      </div>
    )
  }
}

RadioGroup.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  partId: PropTypes.string.isRequired,
}

export default RadioGroup;
