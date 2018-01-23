import React from 'react';
import Styled from 'styled-components';

let buttonSize = '10px';
let checkSize = '8px';
let blueColor = '#4a90e2';

const CustomRadio = Styled.div`
  display:block;
  text-align:left;

  [type="radio"]:checked,
  [type="radio"]:not(:checked)
  {
    box-sizing:border-box;
    position:absolute;
    left:-9999px;
    width:0;
  }

  [type="radio"]:checked + label,
  [type="radio"]:not(:checked) + label,
  .custom-label
  {
    span{
    font-size:12px;
    line-height:12px;
    font-weight:500;
    position: relative;
    cursor: pointer;
    display: inline-block;
    vertical-align:middle;
    color: #000000;
    }
  }

  [type="radio"]:checked + label
  {
    span{
      position: relative;
      cursor: pointer;
      line-height: 12px;
      display: inline-block;
      color: ${blueColor};
    }
  }

  [type="radio"]:checked + label:before,
  [type="radio"]:not(:checked) + label:before
  {
    box-sizing:border-box;
    display:inline-block;
    content: '';
    width: ${buttonSize};
    height: ${buttonSize};
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
    margin-right: 6px;
  }

  [type="radio"]:checked + label:before
  {
    background: ${blueColor};
  }
`;

const Radio = ({name, option, partId, handleChange, checked}) => {
    //console.log("name:"+name+", option.value:"+option.value+", option.display:"+option.display+", partId:"+partId);
  let inputId = option.value + partId;
  return(
    <CustomRadio style={{fontFamily:"proxima nova"}}>
      <input type="radio" id={inputId} name={name} onChange={()=>{handleChange(option)}} checked={option === checked}/>
      <label for={inputId}>
        <span>{option.display}</span>
      </label>
    </CustomRadio>
  )
}

export default Radio;
