import Styled from 'styled-components';
import React from 'react';
import Radio from './radio';
import PropTypes from 'prop-types';

const RadioGroup = ({options,name,partId,handleChange,checked}) => {
    //console.log("options:"+options+", name:"+name+", partId:"+partId);
  return(
    <div style={{position:'relative',zIndex:'500'}}>
      {
        options.map(
          (option)=>(
            <Radio name={name+partId} option={option} partId={partId} handleChange={handleChange} checked={checked}/>
          )
        )
      }
    </div>
  )
}

RadioGroup.propTypes = {
  options: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  partId: PropTypes.string.isRequired,
}

export default RadioGroup;
