import React from 'react';
import styled from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCaretLeft from '@fortawesome/fontawesome-free-solid/faCaretLeft';
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight';

const PaginationWrapper = styled.ul`
  background-color:#CCCCCC;
  list-style:none;
  display:flex;
  padding:0;
  margin-top:0;
  margin-bottom:0;
  border:1px solid #ddd;
  border-radius:3px;
`

const PageBlock = (props) => {
  return (
    <Block {...props}><Label>{props.children}</Label></Block>
  )
}

const LeftPageBlock = (props) => {
  return (
    <LeftBlock {...props}><Label>{props.children}</Label></LeftBlock>
  )
}

const RightPageBlock = (props) => {
  return (
    <RightBlock {...props}><Label>{props.children}</Label></RightBlock>
  )
}

const Block = styled.li`
  color: ${props => props.active ? '#efefef' : '#cccccc'};
  width:24px;
  height:24px;
  background-color:${props => props.active ? '#666666' : '#FFFFFF'};
  display:flex;
  justify-content:center;
  align-items:center;
`

const LeftBlock = Block.extend`
  color: ${props => props.disabled ? '#efefef' : '#cccccc'};
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border:none;
  border-right:1px solid #ddd;
`

const RightBlock = Block.extend`
  color: ${props => props.disabled ? '#efefef' : '#cccccc'};
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border:none;
  border-left:1px solid #ddd;
`

const Label = styled.a`
  color:inherit;
  font-size:12px;
  font-weight:bold;
`

class Pagination extends React.Component {
  render(){
    return (
      <PaginationWrapper style={this.props.style}>
        <LeftPageBlock disabled><FontAwesomeIcon icon={faCaretLeft} style={{fontSize:"20px",marginRight:'2px'}}/></LeftPageBlock>
        <PageBlock active>1</PageBlock>
        <RightPageBlock disabled><FontAwesomeIcon icon={faCaretRight} style={{fontSize:"20px",marginLeft:'2px'}}/></RightPageBlock>
      </PaginationWrapper>
    )
  }
}
export default Pagination
