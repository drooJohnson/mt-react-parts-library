import React from 'react';
import Styled from 'styled-components';

let blueColor = '#4a90e2';

const CustomRadio = Styled.div`
  margin-bottom:8px;
  &:last-of-type{
    margin-bottom:0;
  }
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
    color:#333333;
    font-size:12px;
    line-height:12px;
    font-weight:500;
    position: relative;
    cursor: pointer;
    display: inline-block;
    vertical-align:middle;
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
    width: 10px;
    height: 10px;
    border: ${props => props.original ? '1px solid #999' : '1px solid #ddd'};
    border-radius: 100%;
    background: #fff;
    margin-right: 8px;
  }

  [type="radio"]:checked + label:before
  {
    background: ${blueColor};
  }
`;


const Radio = ({name, option, label, handleChange, checked, original}) => {
    //console.log("name:"+name+", option.value:"+option.value+", option.display:"+option.display+", partId:"+partId);
  let inputId = option.value + name;
  return(
    <CustomRadio original={original} style={{fontFamily:"proxima nova"}}>
      <input type="radio" id={inputId} name={name} onChange={()=>{handleChange(option)}} checked={checked} original={original}/>
      <label for={inputId}>
        <span>{label}</span>
      </label>
    </CustomRadio>
  )
}

const CustomInlineRadio = Styled.div`
  display:inline-block;
  text-align:left;
  margin-right:24px;
  &:last-of-type{
    margin-right:0;
  }
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
    display:flex;
    align-items:center;
    span{
    color:#333333;
    font-size:14px;
    line-height:14px;
    font-weight:400;
    position: relative;
    cursor: pointer;
    display: inline-block;
    vertical-align:middle;
    }
  }

  [type="radio"]:checked + label
  {
    span{
      position: relative;
      cursor: pointer;
      line-height: 12px;
      display: inline-block;
      color: #333333;
    }
  }

  [type="radio"]:checked + label:before,
  [type="radio"]:not(:checked) + label:before
  {
    box-sizing:border-box;
    display:inline-block;
    content: '';
    width: 12px;
    height: 12px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
    margin-right: 8px;
  }

  [type="radio"]:checked + label:before
  {
    background: ${blueColor};
  }
`;

const InlineRadio = ({name, option, label, handleChange, checked}) => {
  let inputId = option.value + name;
  return(
    <CustomInlineRadio style={{fontFamily:"proxima nova",fontSize:"14px"}}>
      <input type="radio" id={inputId} name={name} onChange={()=>{handleChange(option)}} checked={checked}/>
      <label for={inputId}>
        <span>{label}</span>
      </label>
    </CustomInlineRadio>
  )
}

export {Radio,InlineRadio};
